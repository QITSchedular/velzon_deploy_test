const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const imageToBase64 = require('image-to-base64');
const { get } = require('request');
const { query, response } = require('express');
const { encode } = require('punycode');
const { setTimeout } = require('timers/promises');

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const requ = require('request').defaults({ rejectUnauthorized: false }); //for passing headers  
const { json } = require('express/lib/response');

const fs = require('fs');
const http = require('http');
const crypto = require('crypto');
const { Client } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const util = require('util');
const errors = require('./error');
var obj = [];
const error = new errors();

var arr = [];
class clients {
    client;
    display() {
        console.log("Display method");
    }
    // static cnt = 1;
    constructor() {
        this.client = new Client();
        this.client.initialize();

    }

    generateqr(iid, ind, res) {
        const options = {
            hostname: 'localhost',
            port: '8081',
            path: '/createqr/' + iid + '/' + ind + '',
            method: 'GET'
        };

        // const getPosts = () => {
        let data = '';

        const request = http.request(options, (response) => {
            // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
            // response.setEncoding('utf8');

            // As data starts streaming in, add each chunk to "data"
            response.on('data', (chunk) => {
                data += chunk;
                // console.log(chunk);
            });

            // The whole response has been received. Print out the result.
            response.on('end', () => {
                console.log(data);
                res.send(data);
            });
        });

        // Log errors if any occur
        request.on('error', (err) => {
            console.error(err);
        });

        // End the request
        request.end();

    }

    sendmsg(iid, apikey, rectoken, number, text, index) {
        console.log(index);
        var url = 'http://localhost:8081/sendmsg/' + iid + '/' + index + '';
        console.log(url);
        requ.post({
            url: url,
            headers: {
                "apikey": apikey,
                "token": rectoken,
            },
            json: true,
            method: "post",
            body: {
                "to": number,
                "type": "text",
                "template": {
                    "msg": text,
                    "language": {
                        "code": "en_US"
                    }
                }
            },
            function(err, response, body) {
                if (err) return res.send("Error occured");
                if (response.statusCode == 200) {
                    console.log("success");
                    ans = body;
                }
                else {
                    console.log("error");
                }
            }
        })
    }

    sendimg() {

    }
}

const conn = mysql.createConnection({
    host: 'localhost',
    user: "root",
    pwd: "",
    database: "qrdb"
});

// express.static("assets");
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/assets", express.static("assets"));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
// var session;

app.use(sessions({
    secret: "thisismysecret",
    saveUninitialized: true,
    resave: true
}));

const port = 8081;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

require('./assets/js/route')(app, conn);

app.get("/createqr/:iid/:ind", async (req, res) => {
    var iid = req.params.iid;
    var ind = req.params.ind;
    console.log("Generating QR image...");
    // console.log(ind);

    await obj[ind].client.on('qr', (qr) => {
        // if (obj.cnt <= 2) {
        // var qrrandom = qrcode.toDataURL(qr);
        // var qrrandom = qrcode.toString(qr);
        // qrrandom = qrcode.toCanvas("<div></div>", qr);
        // console.log(qrrandom);

        // console.log(qr);
        // res.send(qr);
        console.log(qr.toString());
        res.send(qr.toString());
    });
    // res.send("done");
})

app.post("/adduser", (req, res) => {
    const id = crypto.randomBytes(16).toString("hex");
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    conn.query(
        "SELECT * FROM users WHERE email='" + email + "'",
        function (err, result) {
            if (err) return res.send(error.internalservererror());
            if (result.length > 0) return res.send(error.duplicateRecord());
            conn.query(
                "INSERT INTO users VALUES('" + id + "','" + name + "','" + email + "','" + password + "'," + phone + ")",
                function (err, result) {
                    if (err) return res.send(error.internalservererror());
                    if (result.affectedRows == 0) return res.send(error.internalservererror());
                    return res.send(error.ok());
                })
        });
});

app.post('/signin', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    conn.query(
        "select * from users where email='" + email + "' and password='" + password + "'",
        function (err, result) {
            if (err) return res.send(error.internalservererror());
            if (result.length <= 0) return res.send(error.unauthorized());
            res.cookie('apikey', result[0].id);
            res.send(error.ok());
        });
})

app.get("/checkauth", (req, res) => {
    // while (1) {
    var flag = 0;
    obj.client.on('ready', (req, resp) => {

        console.log('Client is ready!');
        flag = 1;

        // return;
        // res.send({ "success": "User Authenticated!!" });
    });
    // if (flag == 1) {
    //     break;
    // }

    // }
    res.send("Authentication successful!!");
})

app.post('/sendmsg/:iid/:index', function (req, res) {

    var iid = req.params.iid;
    var indx = req.params.index;
    const apikey = req.headers.apikey;
    const token = req.headers.token;
    let message = req.body.template.msg;
    let prefix = "+91";
    var phone = req.body.to;
    phone = prefix.concat(phone);
    const chatId = phone.substring(1) + "@c.us";
    var query = "select * from instance where `instance_id`='" + iid + "' and `apikey`='" + apikey + "' and `token`='" + token + "'";
    conn.query(query, function (err, result, field) {
        if (err) return error.forbidden();
        if (result.length > 0) {
            obj[indx].client.on('ready', (req, resp) => {
                console.log('Client is ready!');
                if (obj[indx].client.sendMessage(chatId, message)) {
                    console.log(error.ok());
                    res.send(error.ok());
                }
                else {
                    console.log(error.expectationFailed());
                    console.log(error.userNotValid());
                    res.send(error.userNotValid());
                }
            });
        }
    })
})

app.get('/qr/:iid', async (req, res) => {
    var iid = req.params.iid;
    let f = 0, index = 0;
    console.log("Array length " + arr.length + arr.values());
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            console.log(arr[i].client);
            if (arr[i].client == iid) {
                f = 1;
            }
        }
    }
    // if (f == 0) {
    console.log("new client created");
    index = (arr.length);
    console.log(index);
    var temp = { "client": iid };
    arr.push(temp);
    obj[index] = new clients();

    res.cookie("index", index);
    obj[index].generateqr(iid, index, res);

    // }
    // res.send("image created");
});

app.post('/example', function (request, res, next) {
    let index = request.body.index;
    let instanceid = request.body.instanceid;
    let apikey = request.body.apikey;
    let token = request.body.token;
    let msg = request.body.msg;
    let phone = request.body.phone;

    var obj = {
        "index": index,
        "instanceid": instanceid,
        "apikey": apikey,
        "token": token,
        "msg": msg,
        "phone": phone,
    }
    res.send(obj);
});

app.post("/addinstance", (req, res) => {
    var token = crypto.randomBytes(10).toString("hex");
    var instanceid = crypto.randomBytes(6).toString("hex");
    var instance_name = req.body.instance_name;
    var apikey = req.cookies.apikey;
    conn.query(
        "select * from instance where i_name='" + instance_name + "' and apikey='" + apikey + "'",
        function (err, result) {
            if (err) return res.send(error.internalservererror());
            if (result.length > 0) return res.send(error.duplicateRecord());
            conn.query(
                `INSERT INTO instance values('` + instanceid + `','` + instance_name + `','` + apikey + `',
                    '` + token + `', CURRENT_DATE, DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY))`,
                function (err, result) {
                    if (err) return res.send(error.internalservererror());
                    if (result.affectedRows == 0) return res.send(error.internalservererror());
                    return res.send(error.ok());
                });
        });
})

app.get("/instance_data", (req, res) => {
    var apikey = req.cookies.apikey;
    conn.query(
        "SELECT * FROM `instance` WHERE apikey = '" + apikey + "'  order by `i_name`",
        function (err, result) {
            if (err) return res.send("Unable to create instance");
            res.send(result);
        });
})

app.post('/sendimage', async function (req, res) {
    const { fileupload } = req.files;

    await fileupload.mv(__dirname + '/assets/upload/' + fileupload.name);
    var iid = req.body.instanceid;
    var indx = req.cookies.index;
    const apikey = req.body.apikey;
    const token = req.body.token;
    let prefix = "+91";
    var phone = req.body.phone;

    phone = prefix.concat(phone);
    const chatId = phone.substring(1) + "@c.us";
    conn.query("select * from instance where instance_id = '" + iid + "' and apikey = '" + apikey + "' and token = '" + token + "'",
        function (err, result, field) {
            if (err) return error.forbidden();
            if (result.length > 0) {

                conn.query(
                    "select * from activeinstances where instance_id='" + iid + "' and indx=" + indx + "",
                    (err, result, fields) => {
                        if (err) return res.send(error.forbidden());
                        if (result.length > 0) {
                            const media = MessageMedia.fromFilePath(__dirname + '/assets/upload/' + fileupload.name);
                            if (obj[indx].client.sendMessage(chatId, media, { caption: 'this is my caption' })) {
                                res.send(error.ok());

                            } else {
                                res.send("Message is not sent");
                            }
                        } else {
                            res.send(error.forbidden());
                        }
                    })
            }
        }
    )
})





