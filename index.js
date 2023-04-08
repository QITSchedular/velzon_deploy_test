require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const { MessageMedia } = require("whatsapp-web.js");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const app = express();
const csvtojson = require("csvtojson");
const mysql = require("mysql");
const path = require("path");
const requ = require("request").defaults({ rejectUnauthorized: false }); //for passing headers
const { json } = require("express/lib/response");
const router = require("./assets/js/route");

const fs = require("fs");
const http = require("http");
const crypto = require("crypto");
const { Client } = require("whatsapp-web.js");
var nodemailer = require("nodemailer");
var passport = require("passport");
const jwt = require("jsonwebtoken");
var obj = [];
const status = require("./assets/js/status");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { GoogleSpreadsheet } = require("google-spreadsheet");
const Razorpay = require("razorpay");
const country = require("country-list-with-dial-code-and-flag");

app.use(fileUpload());

app.use(
    sessions({
        resave: false,
        saveUninitialized: true,
        secret: "SECRET",
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

var instance = new Razorpay({
    key_id: "rzp_test_HTTzrcP3gKLLEv",
    key_secret: "CGgkDqWQn8f2Sp6vNwqftaXO",
});

var arr = [];

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sakshiiit232@gmail.com",
        pass: "pzpjmrggsmvmdmym",
    },
});

class clients {
    client;
    display() {
        console.log("Display method");
    }
    constructor() {
        this.client = new Client({
            puppeteer: {
                args: ['--no-sandbox', '--disable-setuid-sandbox'],

            }
        });
        // {
        // puppeteer: {
        //   executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        // },
        // }
        this.client.initialize();
    }

    disconnect() {
        this.client.destroy();
        this.client.initialize();
    }

    async generateqr(ind, res) {
        // var ind = req.params.ind;
        console.log("Generating QR image...");
        console.log(ind);

        await obj[ind].client.on("qr", (qr) => {
            console.log(qr);
            res.send(qr);
        });
        // const options = {
        //   hostname: "http://localhost:8081",
        //   path: "/createqr/" + ind + "",
        //   method: "GET",
        // };

        // let data = "";

        // const request = http.request(options, (response) => {
        //   response.on("data", (chunk) => {
        //     data += chunk;
        //   });
        //   response.on("end", () => {
        //     console.log(data);
        //     return res.send(data);
        //     // console.log(data);
        //   });
        // });
        // // Log errors if any occur
        // request.on("error", (err) => {
        //   console.error(err);
        // });
        // // End the request
        // request.end();
    }

    // generateQR(callback) {
    //     this.client.on("qr", function (qrCodeData) {
    //         callback(qrCodeData);
    //     });
    // }

    sendmsg(iid, apikey, rectoken, number, text, index) {
        var url = "http://localhost:8081/sendmsg/" + iid + "/" + index + "";
        requ.post({
            url: url,
            headers: {
                apikey: apikey,
                token: rectoken,
            },
            json: true,
            method: "post",
            body: {
                to: number,
                type: "text",
                template: {
                    msg: text,
                    language: {
                        code: "en_US",
                    },
                },
            },
            function(err, response, body) {
                if (err) return res.send("Error occured");
                if (response.statusCode == 200) {
                    console.log("success");
                    ans = body;
                } else {
                    console.log("error");
                }
            },
        });
    }
}

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

express.static("assets");
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/assets", express.static("assets"));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
// var session;

app.use(
    sessions({
        secret: "thisismysecret",
        saveUninitialized: true,
        resave: true,
    })
);

const port = process.env.PORT;
let apikey;

async function checkAPIKey(apikey) {
    try {
        return await new Promise((resolve, reject) => {
            conn.query(
                `SELECT * FROM users WHERE apikey = '${apikey}'`,
                (error, results) => {
                    if (error) return reject(status.internalservererror());
                    if (results.length <= 0) resolve(false);
                    resolve(true);
                }
            );
        });
    } catch (e) {
        console.log(e);
    }
}

function createfolder(foldername) {
    try {
        if (!fs.existsSync(`${__dirname}\\assets\\upload\\${foldername}`)) {
            if (fs.mkdirSync(`${__dirname}\\assets\\upload\\${foldername}`)) {
                return status.ok().status_code;
            } else {
                return status.nodatafound().status_code;
            }
        } else {
            return status.duplicateRecord().status_code;
        }
    } catch (err) {
        console.log(err);
    }
}

const tableData = (data, callback) => {
    try {
        conn.query(
            `SELECT * FROM ${data.table} WHERE (${data.paramstr}) AND apikey = '${data.apikey}'`,
            (err, result) => {
                if (err) return callback(status.internalservererror());
                if (result.length == 0) return callback(status.nodatafound());
                return callback(result);
            }
        );
    } catch (e) {
        console.log(e);
    }
};



var cnt;

const GOOGLE_CLIENT_ID =
    "998325770347-9s0fe9oph1a8blesbtl7hkccgs69fc1h.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
    new GoogleStrategy(
        {
            clientID:
                "998325770347-9s0fe9oph1a8blesbtl7hkccgs69fc1h.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: `http://localhost:8081/auth/google/callback`,
        },
        function (accessToken, refreshToken, profile, done) {
            userProfile = profile;
            return done(null, userProfile);
        }
    )
);

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/error" }),
    function (req, res) {
        const id = crypto.randomBytes(16).toString("hex");
        var Ac_name = userProfile.displayName;
        var Ac_mail = userProfile.emails[0].value;
        conn.query(
            "select * from users where email='" + Ac_mail + "'",
            function (err, result) {
                if (err) return console.log(err);
                if (result.length > 0) {
                    res.cookie("apikey", result[0].apikey, {
                        maxAge: 1000 * 24 * 60 * 60 * 7,
                    });
                    res.redirect("/dashboard");
                } else {
                    conn.query(
                        "INSERT INTO users(`apikey`, `uname`, `email`,`password`) VALUES('" +
                        id +
                        "','" +
                        Ac_name +
                        "','" +
                        Ac_mail +
                        "','')",
                        function (err, result) {
                            if (err) return console.log(err);
                            if (result) {
                                res.cookie("apikey", id, { maxAge: 1000 * 24 * 60 * 60 * 7 });
                                res.redirect("/dashboard");
                            }
                        }
                    );
                }
            }
        );
    }
);

const CREDENTIALS = JSON.parse(
    fs.readFileSync("studied-theater-374912-20d31d5fcc83.json")
);

app.post("/sheetdata", async (req, res) => {
    var ssid = req.body.ssid;
    var sheetindex = req.body.sheetindex;

    const doc = new GoogleSpreadsheet(ssid);

    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key,
    });

    await doc.loadInfo();
    var phones = new Array();
    var object = new Object();
    var data = new Array();
    var colnames = new Array();
    let sheet = doc.sheetsByIndex[sheetindex];
    try {
        let rows = await sheet.getRows();
        colnames.push(rows[0]._sheet.headerValues);

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            console.log(row._rawData);
            data.push(row._rawData);
            phones.push(row.phone);
        }
        object["colnames"] = colnames;
        object["values"] = data;
        res.send(object);
    } catch (e) {
        console.log(e);
    }
});

app.post("/sendtoall", async (req, res) => {
    var indx = req.cookies.index;

    const apikey = req.body.apikey;
    const token = req.body.token;
    var iid = req.body.instanceid;
    var data = req.body.data;

    var date_ob = new Date();

    var object,
        flag = 0;

    conn.query(
        `select * from instance where instance_id = '` +
        iid +
        `' and apikey = '` +
        apikey +
        `' and token = '` +
        token +
        `'`,
        async function (err, result) {
            if (err) return res.send(status.forbidden());
            if (result.length > 0) {
                try {
                    for (let i = 0; i < data.names.length; i++) {
                        let prefix = "+91";
                        let phone = data.phones[i];
                        phone = prefix.concat(phone);
                        let chatId = phone.substring(1) + "@c.us";
                        if (
                            await obj[indx].client.sendMessage(
                                chatId,
                                `Hello ${data.names[i]
                                } how are you ? it's ${date_ob.getHours()} : ${date_ob.getMinutes()} : ${date_ob.getSeconds()}`
                            )
                        ) {
                            console.log("message sent to " + data.names[i]);
                        }
                        flag = 1;
                    }
                } catch (e) {
                    console.log(e);
                    object = {
                        error: "client is not initialized",
                    };
                }
            }
        }
    );
    if (flag == 1) {
        object = {
            error: null,
        };
    }
    res.send(object);
});

app.get("/msg_record/:apikey", async (req, res) => {
    var apikey = req.params.apikey;
    var data = new Array();
    var abc = new Array();
    var countobj;

    try {
        conn.query(
            "select m.instance_id,i.i_name,count(msg) as cnt from message m,instance i WHERE i.apikey='" +
            apikey +
            "' and m.instance_id = i.instance_id group by instance_id",
            function (err, rslt) {
                if (err) return console.log(err);
                // console.log(rslt);
                if (rslt.length > 0) {
                    for (let i = 0; i < rslt.length; i++) {
                        let a = rslt[i].cnt;
                        data.push(a);
                        countobj = {
                            iname: rslt[i].i_name,
                            iid: rslt[i].instance_id,
                            total: a,
                        };
                        abc.push(countobj);
                    }
                }
                res.send(abc);
            }
        );
    } catch (e) {
        console.log(e);
    }
});
let msgcount = 0,
    imgcount = 0,
    bulkcount = 0;

app.get("/getmsgtypes/:iid", (req, res) => {
    let iid = req.params.iid;
    console.log(iid);
    (msgcount = 0), (imgcount = 0), (bulkcount = 0);
    conn.query(
        "SELECT msg_type,msgid FROM message WHERE instance_id='" + iid + "'",
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].msg_type == "msg") {
                        msgcount++;
                    } else if (result[i].msg_type == "img") {
                        imgcount++;
                    } else if (result[i].msg_type == "bulk") {
                        bulkcount++;
                    }
                    // console.log(msgcount + " " + imgcount + " " + bulkcount);
                }
                var obj = { msg: msgcount, img: imgcount, bulk: bulkcount };
                // console.log(obj);
                res.send(obj);
            }
        }
    );
});

app.post("/sendNotification/:mail/:phone", async (req, res) => {
    var email = req.params.mail;
    var phone = req.params.phone;
    console.log(email + " " + phone);
    var mailOptions = {
        from: "sakshiiit232@gmail.com",
        to: email,
        subject: "Message sent",
        text: "Whatsapp message was sent to " + phone,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send("email not sent");
        } else {
            console.log("Email sent: " + info.response);
            res.send("email sent");
        }
    });
});

app.get("/createqr/:ind", async (req, res) => {
    //
    var ind = req.params.ind;
    console.log("Generating QR image...");
    console.log(ind);

    await obj[ind].client.on("qr", (qr) => {
        console.log(qr);
        res.send(qr);
    });
});

app.get("/disconnected/:index/:iid", async (req, res) => {
    let ind = req.params.index;
    let iid = req.params.iid;
    if (ind && iid) {
        try {
            var qury =
                "update activeinstances set status=1, disconnectTime=CURRENT_TIMESTAMP() where instance_id='" +
                iid +
                "' and indx=" +
                ind +
                "";
            conn.query(qury, (err, result, fields) => {
                if (err) return res.send(console.log(err));
                // console.log(result);
                obj[ind].disconnect();
                console.log("client is destroyed");
            });
            res.send(status.ok());
            console.log("Record updated successfully.");
        } catch (error) {
            console.log(error);
        }
    } else {
        res.send(status.badRequest());
    }
});

app.post("/adduser", (req, res) => {
    const id = crypto.randomBytes(16).toString("hex");
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const country = req.body.country;
    const state = req.body.state;
    const city = req.body.city;

    if (
        name &&
        phone &&
        email &&
        password &&
        country &&
        state &&
        name != undefined &&
        phone != undefined &&
        email != undefined &&
        password != undefined &&
        country != undefined &&
        state != undefined
    ) {
        conn.query(
            "SELECT * FROM users WHERE email='" + email + "'",
            function (err, result) {
                if (err) return res.send(status.internalservererror());
                if (result.length > 0) return res.send(status.duplicateRecord());
                conn.query(
                    "INSERT INTO users VALUES('" +
                    id +
                    "','" +
                    name +
                    "','" +
                    email +
                    "','" +
                    password +
                    "'," +
                    phone +
                    ",0,'" +
                    country +
                    "','" +
                    state +
                    "','" +
                    city +
                    "',CURRENT_DATE,null)",
                    function (err, result) {
                        // res.clearCookie("everify");
                        if (err) return res.send(status.internalservererror());
                        if (result.affectedRows == 0)
                            return res.send(status.internalservererror());
                        return res.send(status.ok());
                    }
                );
            }
        );
    } else {
        res.send(status.badRequest());
    }
});

app.post("/signin", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (email && password && email != undefined && password != undefined) {
        conn.query(
            "select * from users where email='" +
            email +
            "' and password='" +
            password +
            "'",
            function (err, result) {
                if (err) return res.send(status.internalservererror());
                if (result.length <= 0) return res.send(status.unauthorized());
                res.cookie("apikey", result[0].apikey, {
                    maxAge: 1000 * 24 * 60 * 60 * 7,
                });
                res.send(status.ok());
            }
        );
    } else {
        res.send(status.badRequest());
    }
});

app.get("/refreshtoken/:iid/:apikey", function (req, res) {
    let token = crypto.randomBytes(10).toString("hex");
    let iid = req.params.iid;
    let apikey = req.params.apikey;

    conn.query(
        "update instance set token='" +
        token +
        "' where apikey='" +
        apikey +
        "' and instance_id='" +
        iid +
        "'",
        function (err, result, field) {
            if (err) console.log(err);
            // console.log(result);
            // if (result.length > 0) {
            // }
        }
    );
    res.send(token);
});

app.get("/checkauth", (req, res) => {
    var flag = 0;
    obj.client.on("ready", (req, resp) => {
        console.log("Client is ready!");
        flag = 1;
    });
    res.send("Authentication successful!!");
});

app.post("/sendimage", async function (req, res) {
    const { fileupload2 } = req.files;
    console.log(req.cookies.index);
    var iid = req.body.instanceid;
    var indx = req.cookies.index;
    var caption = req.body.caption;
    const apikey = req.body.apikey;
    const token = req.body.token;

    let prefix = "+91";
    var phone = req.body.phone;
    phone = prefix.concat(phone);
    let request;
    const options = {
        hostname: "localhost",
        port: "8081",
        path: "/createfolder/" + iid + "", // we changed the path to only grab one post
        method: "GET",
    };

    let data = "";
    console.log(fileupload2);
    console.log(iid);
    console.log(indx);
    console.log(apikey);
    console.log(token);
    console.log(fileupload2.name);

    if (fileupload2 && iid && indx && apikey && token && phone) {
        console.log(fileupload2);
        console.log(iid);
        console.log(indx);
        console.log(apikey);
        console.log(token);
        request = http.request(options, (response) => {
            // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
            //response.setEncoding('utf8');

            // As data starts streaming in, add each chunk to "data"
            response.on("data", (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            response.on("end", async () => {
                console.log(data);
                await fileupload2.mv(
                    __dirname + "/assets/upload/" + iid + "/" + fileupload2.name
                );
                const chatId = phone.substring(1) + "@c.us";

                conn.query(
                    `select * from instance where instance_id = '` +
                    iid +
                    `' and apikey = '` +
                    apikey +
                    `' and token = '` +
                    token +
                    `'`,
                    function (err, result) {
                        console.log("query1");
                        if (err) return status.forbidden();
                        if (result.length > 0) {
                            conn.query(
                                "select * from activeinstances where instance_id='" +
                                iid +
                                "' and indx=" +
                                indx +
                                "",
                                function (err, result) {
                                    if (err) return res.send(status.forbidden());
                                    if (result.length > 0) {
                                        const media = MessageMedia.fromFilePath(
                                            __dirname +
                                            "/assets/upload/" +
                                            iid +
                                            "/" +
                                            fileupload2.name
                                        );
                                        if (
                                            obj[indx].client.sendMessage(chatId, media, {
                                                caption: caption,
                                            })
                                        ) {
                                            conn.query(
                                                "select * from users where apikey='" + apikey + "'",
                                                (err, result2, fields) => {
                                                    // console.log(result2[0]);
                                                    if (result2.length > 0) {
                                                        console.log(result2);
                                                        var email = result2[0].email;

                                                        const options2 = {
                                                            hostname: "localhost",
                                                            port: "8081",
                                                            path:
                                                                "/sendNotification/" + email + "/" + phone + "", // we changed the path to only grab one post
                                                            method: "POST",
                                                        };
                                                        var data2 = "";
                                                        var request2 = http.request(
                                                            options2,
                                                            (response2) => {
                                                                response2.on("data", (chunk) => {
                                                                    data2 += chunk;
                                                                });

                                                                response2.on("end", () => {
                                                                    console.log(data2);
                                                                    if (data2 == "email sent") {
                                                                        res.send(status.ok());
                                                                    } else {
                                                                        res.send(status.expectationFailed());
                                                                    }
                                                                });
                                                            }
                                                        );
                                                        request2.end();
                                                    }
                                                }
                                            );
                                            // res.send(status.ok());
                                        } else {
                                            res.send(status.expectationFailed());
                                        }
                                    } else {
                                        res.send(status.forbidden());
                                    }
                                }
                            );
                        }
                    }
                );
            });
        });
    } else {
        res.send(status.badRequest());
    }
    request.end();
});

app.put("/updateData", async (req, res) => {
    try {
        conn.query(`UPDATE ${req.body.table} SET ${req.body.paramstr} WHERE ${req.body.condition}`, (err, result) => {
            console.log(result);
            if (err) return res.send(status.internalservererror());
            res.send(status.ok());
        })
    }
    catch (e) {
        console.log(e);
    }
});

app.post("/sendmsg", function (req, res) {
    const apikey = req.headers.apikey;
    const token = req.headers.token;
    var iid = req.body.iid;
    var indx = req.body.index;
    let message = req.body.template.msg;
    let prefix = "+91";
    var phone = req.body.to;
    phone = prefix.concat(phone);
    const chatId = phone.substring(1) + "@c.us";

    console.log("inside sendmsg api");

    if (apikey && token && iid && indx && message && phone) {
        conn.query(
            `select * from instance where instance_id = '` +
            iid +
            `' and  apikey = '` +
            apikey +
            `' and token = '` +
            token +
            `'`,
            function (err, result) {
                if (err) return res.send(status.forbidden());
                if (result.length <= 0) return res.send(status.forbidden());
                conn.query(
                    "select * from activeinstances where instance_id='" +
                    iid +
                    "' and indx=" +
                    indx +
                    "",
                    function (err, result) {
                        if (err) return res.send(status.forbidden());
                        if (result.length <= 0) return res.send(status.forbidden());
                        if (obj[indx].client.sendMessage(chatId, message)) {
                            var msgid = crypto.randomBytes(8).toString("hex");
                            var msgtype = "msg";
                            conn.query(
                                "insert into message(`msgid`,`msg`,`msg_type`,`receiver`,`instance_id`,`apikey`,`token`)        values('" +
                                msgid +
                                "','" +
                                message +
                                "','" +
                                msgtype +
                                "','" +
                                chatId +
                                "','" +
                                iid +
                                "','" +
                                apikey +
                                "','" +
                                token +
                                "')",
                                function (err, result, fields) {
                                    if (err) return res.send(status.forbidden());
                                    if (result.affectedRows == 1) {
                                        res.send(status.ok());
                                    }
                                    else {
                                        res.send(status.internalservererror());
                                    }
                                }
                            );
                        } else {
                            console.log(status.expectationFailed());
                            console.log(status.userNotValid());
                            res.send(status.userNotValid());
                        }
                    }
                );
            }
        );
    } else {
        res.send(status.badRequest());
    }
});

app.get("/qr/:iid", async (req, res) => {
    var iid = req.params.iid;
    let f = 0,
        ind = 0;

    // console.log("Array length " + arr.length + arr.values());
    // console.log("new client created");
    ind = arr.length;
    // console.log(ind);
    res.cookie("index", ind);
    var temp = { client: iid };
    arr.push(temp);
    obj[ind] = new clients();
    await obj[ind].generateqr(ind, res);
});


app.get("/createfolder/:iid", (req, res) => {
    var iid = req.params.iid;
    try {
        if (!fs.existsSync(__dirname + "/assets/upload/" + iid)) {
            if (fs.mkdirSync(__dirname + "/assets/upload/" + iid)) {
                res.send("Folder Created");
            } else {
                res.send("Folder is not created.");
            }
        } else {
            res.send("Folder already exists.");
        }
    } catch (err) {
        console.error(err);
        res.send(err);
    }
});

var a;

app.get("/authenticated/:index/:iid/:apikey", async function (req, res) {
    let indx = req.params.index;
    let iid = req.params.iid;
    let apikey = req.params.apikey;
    console.log(indx);
    console.log("inside authenticated");

    await obj[indx].client.on("ready", (req, resp) => {
        // a = 1;
        // if (a == 1) {
        //   a++;
        console.log("Client is ready!");
        conn.query(
            "INSERT INTO `activeinstances`(`instance_id`, `indx`, `apikey`, `status`) VALUES ('" +
            iid +
            "'," +
            indx +
            ",'" +
            apikey +
            "',0)",
            (err, result) => {
                if (err) {
                    return res.send(err);
                }
                console.log(result);
            }
        );
        res.send("ready");
        // }
    });
});

app.post("/addinstance", async (req, res) => {
    var token = crypto.randomBytes(10).toString("hex");
    var instanceid = crypto.randomBytes(6).toString("hex");
    var instance_name = req.body.instance_name;
    apikey = req.cookies.apikey;
    var flag = 0;

    function create(id, name, apikey, token) {
        console.log("data", id, name, apikey, token);
        tableData({
            table: "instance",
            paramstr: `(i_name = '${name}')`,
            apikey: apikey,
        }, (result) => {
            if (result.status_code == 404) {
                conn.query(`INSERT INTO instance values('${id}','${name}','${apikey}','${token}',CURRENT_DATE, DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY),1)`,
                    function (error, result) {
                        if (error) return res.send(status.internalservererror());
                        return res.send(status.created());
                    });
            }
            else {
                res.send(status.duplicateRecord());
            }
        })
    }


    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            tableData({
                table: "subscription",
                paramstr: true,
                apikey: apikey,
            }, (result) => {
                if (result.status_code == 404) {
                    tableData({
                        table: "instance",
                        paramstr: true,
                        apikey: apikey,
                    }, (result) => {
                        if (result.status_code == 404) {
                            create(instanceid, instance_name, apikey, token);
                        }
                        else {
                            res.send(status.forbidden());
                        }
                    })
                }
                else {
                    var latest = new Date(result[0].end_date).toLocaleDateString();
                    for (var i in result) {
                        if (latest < new Date(result[i].end_date).toLocaleDateString()) {
                            latest = new Date(result[i].end_date).toLocaleDateString();
                        }
                    }
                    console.log(latest);
                }
            });
        } else res.send(status.unauthorized());
    } catch (error) {
        console.log(error);
        res.send(status.unauthorized(), error);
    }

    // conn.query(`select * from instance where i_name = '${instance_name}' and apikey='${apikey}'`,
    //     function (err, r) {
    //         if (err) return res.send(status.internalservererror());
    //         if (r.length > 0) return res.send(status.duplicateRecord());

    //         conn.query(`select * from users where apikey='${apikey}'`,
    //             (err, rslt) => {
    //                 if (err) return res.send(status.internalservererror());
    //                 if (rslt.length > 0) {
    //                     var rdate = new Date(rslt[0].registrationDate);
    //                     var today = new Date();
    //                     let diffTime = Math.abs(today - rdate - 19800000);
    //                     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    //                     console.log(diffDays + " days");
    //                     if (diffDays > 7) {
    //                         conn.query(
    //                             `select * from subscription where apikey='${apikey}'`,
    //                             (err, result) => {
    //                                 if (err) return res.send(status.internalservererror());
    //                                 if (result.length > 0) {
    //                                     for (let j = 0; j < result.length; j++) {
    //                                         var enddate = new Date(result[j].end_date);
    //                                         console.log(enddate);
    //                                         let diffTime2 = enddate - today - 19800000;
    //                                         const diff = Math.floor(
    //                                             diffTime2 / (1000 * 60 * 60 * 24)
    //                                         );
    //                                         console.log("difference is " + diff);
    //                                         if (diff < 0) {
    //                                             flag = 1;
    //                                             console.log("You cannot create an instance");
    //                                             if (j == result.length - 1) {
    //                                                 res.send(status.badRequest());
    //                                             }
    //                                         } else {
    //                                             console.log(result);
    //                                             conn.query(
    //                                                 "select * from plans where planid=" +
    //                                                 result[j].planID +
    //                                                 "",
    //                                                 (err, rs) => {
    //                                                     if (err)
    //                                                         return res.send(status.internalservererror());
    //                                                     if (rs.length > 0) {
    //                                                         conn.query("select count(*) as cnt from instance where apikey='" +
    //                                                             apikey +
    //                                                             "'",
    //                                                             (err, rs1) => {
    //                                                                 if (err)
    //                                                                     return res.send(
    //                                                                         status.internalservererror()
    //                                                                     );
    //                                                                 console.log(rs1[0].cnt);
    //                                                                 console.log(rs[0].totalInstance);
    //                                                                 if (rs1[0].cnt < rs[0].totalInstance) {
    //                                                                     console.log("can create instance!!");
    //                                                                     conn.query(
    //                                                                         `INSERT INTO instance values('` +
    //                                                                         instanceid +
    //                                                                         `','` +
    //                                                                         instance_name +
    //                                                                         `','` +
    //                                                                         apikey +
    //                                                                         `',
    //                                 '` +
    //                                                                         token +
    //                                                                         `', CURRENT_DATE, DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY))`,
    //                                                                         function (err, rt) {
    //                                                                             if (err)
    //                                                                                 return res.send(
    //                                                                                     status.internalservererror()
    //                                                                                 );
    //                                                                             if (rt.affectedRows == 0)
    //                                                                                 return res.send(
    //                                                                                     status.internalservererror()
    //                                                                                 );
    //                                                                             return res.send(status.ok());
    //                                                                         }
    //                                                                     );
    //                                                                 } else {
    //                                                                     console.log("cannot create instance!!");
    //                                                                     res.send(status.badRequest());
    //                                                                 }
    //                                                             }
    //                                                         );
    //                                                     }
    //                                                 }
    //                                             );
    //                                         }
    //                                     }
    //                                 } else {
    //                                     console.log("cannot create instance!!");
    //                                     res.send(status.badRequest());
    //                                 }
    //                             }
    //                         );
    //                     } else {
    //                         conn.query(
    //                             "select * from instance where apikey='" + apikey + "'",
    //                             (err, results) => {
    //                                 if (err) return res.send(status.internalservererror());
    //                                 if (results.length > 0) {
    //                                     // console.log("You cannot create instance more than 1");
    //                                     // console.log(status.badRequest());
    //                                     conn.query(
    //                                         "select * from subscription where apikey='" +
    //                                         apikey +
    //                                         "'",
    //                                         (err, result) => {
    //                                             if (err) return res.send(status.internalservererror());
    //                                             if (result.length > 0) {
    //                                                 for (let j = 0; j < result.length; j++) {
    //                                                     var enddate = new Date(result[j].end_date);
    //                                                     console.log(enddate);
    //                                                     // var today = new Date();
    //                                                     // today = today.toLocaleDateString();
    //                                                     let diffTime2 = enddate - today - 19800000;
    //                                                     const diff = Math.floor(
    //                                                         diffTime2 / (1000 * 60 * 60 * 24)
    //                                                     );
    //                                                     // const diff =
    //                                                     //   Date.parse(enddate.toLocaleDateString()) -
    //                                                     //   Date.parse(today.toLocaleDateString());
    //                                                     console.log("difference is " + diff);
    //                                                     if (diff < 0) {
    //                                                         flag = 1;
    //                                                         console.log("You cannot create an instance");
    //                                                         if (j == result.length - 1) {
    //                                                             res.send(status.badRequest());
    //                                                         }
    //                                                     } else {
    //                                                         // flag = 0;
    //                                                         console.log(result);
    //                                                         conn.query(
    //                                                             "select * from plans where planid=" +
    //                                                             result[j].planID +
    //                                                             "",
    //                                                             (err, rs) => {
    //                                                                 if (err)
    //                                                                     return res.send(
    //                                                                         status.internalservererror()
    //                                                                     );
    //                                                                 if (rs.length > 0) {
    //                                                                     conn.query(
    //                                                                         "select count(*) as cnt from instance where apikey='" +
    //                                                                         apikey +
    //                                                                         "'",
    //                                                                         (err, rs1) => {
    //                                                                             if (err)
    //                                                                                 return res.send(
    //                                                                                     status.internalservererror()
    //                                                                                 );
    //                                                                             console.log(rs1[0].cnt);
    //                                                                             console.log(rs[0].totalInstance);
    //                                                                             if (rs1[0].cnt < rs[0].totalInstance) {
    //                                                                                 console.log("can create instance!!");
    //                                                                                 conn.query(
    //                                                                                     `INSERT INTO instance values('` +
    //                                                                                     instanceid +
    //                                                                                     `','` +
    //                                                                                     instance_name +
    //                                                                                     `','` +
    //                                                                                     apikey +
    //                                                                                     `',
    //                                       '` +
    //                                                                                     token +
    //                                                                                     `', CURRENT_DATE, DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY))`,
    //                                                                                     function (err, rt) {
    //                                                                                         if (err)
    //                                                                                             return res.send(
    //                                                                                                 status.internalservererror()
    //                                                                                             );
    //                                                                                         if (rt.affectedRows == 0)
    //                                                                                             return res.send(
    //                                                                                                 status.internalservererror()
    //                                                                                             );
    //                                                                                         return res.send(status.ok());
    //                                                                                     }
    //                                                                                 );
    //                                                                             } else {
    //                                                                                 console.log(
    //                                                                                     "cannot create instance!!"
    //                                                                                 );
    //                                                                                 res.send(status.badRequest());
    //                                                                             }
    //                                                                         }
    //                                                                     );
    //                                                                 }
    //                                                             }
    //                                                         );
    //                                                     }
    //                                                 }
    //                                             } else {
    //                                                 console.log("cannot create instance!!");
    //                                                 res.send(status.badRequest());
    //                                             }
    //                                         }
    //                                     );
    //                                 } else {
    //                                     console.log("can create intstance!!");
    //                                     conn.query(
    //                                         `INSERT INTO instance values('` +
    //                                         instanceid +
    //                                         `','` +
    //                                         instance_name +
    //                                         `','` +
    //                                         apikey +
    //                                         `',
    //                                       '` +
    //                                         token +
    //                                         `', CURRENT_DATE, DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY))`,
    //                                         function (err, rt) {
    //                                             if (err) return res.send(status.internalservererror());
    //                                             if (rt.affectedRows == 0)
    //                                                 return res.send(status.internalservererror());
    //                                             return res.send(status.ok());
    //                                         }
    //                                     );
    //                                 }
    //                             }
    //                         );
    //                     }
    //                 } else {
    //                     res.send(status.internalservererror());
    //                 }
    //             }
    //         );
    //     }
    // );
});


app.get("/instance_data", (req, res) => {
    var apikey = req.cookies.apikey;
    conn.query(
        "SELECT * FROM `instance` WHERE apikey = '" +
        apikey +
        "'  order by `i_name`",
        function (err, result) {
            if (err) return res.send("Unable to create instance");
            res.send(result);
        }
    );
});

app.get("/getColumnOfUsers", (req, res) => {
    conn.query(
        "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='qrdb' AND `TABLE_NAME`='instance'",
        (err, result) => {
            console.log(result);
            if (err) return res.send(err);
            if (result.length > 0) {
                console.log(result);
                res.send(result);
            }
        }
    );
});

app.get("/getDataOfUsers", (req, res) => {
    conn.query(
        "select instance_id,i_name,uname,email,create_date,expire_date from instance,users where instance.apikey=users.apikey",
        (err, result) => {
            if (err) return res.send(err);
            if (result.length > 0) {
                res.send(result);
            }
        }
    );
});

app.get("/chart", (req, res) => {
    res.sendFile(__dirname + "/chart.html");
});

app.get("/getTotalUsers", (req, res) => {
    conn.query("select count(*) as totalUsers from users", (err, result) => {
        if (err) return res.send(err);
        if (result.length > 0) {
            console.log(result);
            res.send(result);
        }
    });
});

app.get("/getTotalInstances", (req, res) => {
    conn.query(
        "select count(*) as totalInstances from instance",
        (err, result) => {
            if (err) return res.send(err);
            if (result.length > 0) {
                console.log(result);
                res.send(result);
            }
        }
    );
});

app.get("/getTotalMessages", (req, res) => {
    conn.query("select count(*) as totalMessages from message", (err, result) => {
        if (err) return res.send(err);
        if (result.length > 0) {
            console.log(result);
            res.send(result);
        }
    });
});

app.post("/sendEmailVerification", (req, res) => {
    var email = req.body.email;
    const token = jwt.sign(
        {
            data: "Token Data",
        },
        "ourSecretKey",
        { expiresIn: "5m" }
    );

    console.log(email);
    var mailOptions = {
        from: "sakshiiit232@gmail.com",
        to: email,
        subject: "Message sent",
        html: `Hi! There, You have recently visited 
           our website and entered your email.
           Please use following code to verify your email
           <span style="color:blue;">${token}</span> 
           Thanks`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send("Email not sent!!");
        } else {
            console.log("Email sent: " + info.response);
            res.cookie("everify", false);
            res.send("Email sent!!");
        }
    });
});

app.get("/verify/:token", (req, res) => {
    const { token } = req.params;

    // Verifying the JWT token
    jwt.verify(token, "ourSecretKey", function (err, decoded) {
        if (err) {
            console.log(err);
            res.cookie("everify", false);
            res.send(
                "Email verification failed, possibly the link is invalid or expired"
            );
        } else {
            res.cookie("everify", true);
            res.send("Email verifified successfully");
        }
    });
});

app.post("/file", async (req, res) => {
    /** convert req buffer into csv string ,
     *   "csvfile" is the name of my file given at name attribute in input tag */
    csvData = await req.files.csvfile.data.toString("utf8");
    return csvtojson()
        .fromString(csvData)
        .then((json) => {
            return res.status(201).json({ csv: csvData, json: json });
        });
});

app.post("/resetpasswordmail", async (req, res) => {
    var email = req.body.email;
    var mailOptions = {
        from: "sakshiiit232@gmail.com",
        to: email,
        subject: "Reset password",
        text: "your password reset link sent to your email: http://localhost:8081/passchangebasic",
    };
    conn.query(
        "select * from users where email='" + email + "'",
        (err, result, fields) => {
            if (err) return res.send(console.log(err));
            if (result.length > 0) {
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.send("email not sent");
                    } else {
                        console.log("Email sent: " + info.response);
                        res.cookie("vmail", email);
                        res.send("email sent");
                    }
                });
            } else {
                res.send("user not found");
            }
        }
    );
});

app.post("/resetpassword", (req, res) => {
    let password = req.body.password;
    let mail = req.body.mail;
    conn.query(
        "select * from users where email = '" +
        mail +
        "' and password='" +
        password +
        "'",
        (err, result, fields) => {
            if (err) return console.log(err);
            if (result.length > 0) {
                res.send("password not changed");
            } else {
                conn.query(
                    "UPDATE `users` SET `password`='" +
                    password +
                    "' WHERE `email`='" +
                    mail +
                    "'",
                    (err, result, fields) => {
                        if (err) return res.send(console.log(err));
                        //console.log(result);
                        res.send("password has been changed!!");
                    }
                );
            }
        }
    );
});

app.get("/dis_user", function (req, res) {
    conn.query("select * from users", function (err, rest) {
        if (err) return console.log(err);
        if (rest.length > 0) {
            res.send(rest);
        }
    });
});

app.post("/sendToAllUsingLfile", (req, res) => {
    var indx = req.cookies.index;

    const apikey = req.body.apikey;
    const token = req.body.token;
    var iid = req.body.instanceid;

    var clientinfo = req.body.clientdata;
    var message = req.body.message;

    var object,
        flag = 0;

    conn.query(
        `select * from instance where instance_id = '` +
        iid +
        `' and apikey = '` +
        apikey +
        `' and token = '` +
        token +
        `'`,
        async function (err, result) {
            if (err) return res.send(status.forbidden());
            if (result.length > 0) {
                try {
                    for (let i = 0; i < clientinfo.length; i++) {
                        let prefix = "+91";
                        let phone = clientinfo[i].phone;
                        phone = prefix.concat(phone);
                        let chatId = phone.substring(1) + "@c.us";
                        if (
                            await obj[indx].client.sendMessage(
                                chatId,
                                `Hello ${clientinfo[i].name} ${message}`
                            )
                        ) {
                            var msgid = crypto.randomBytes(8).toString("hex");
                            var msgtype = "bulk";
                            conn.query(
                                "insert into message(`msgid`,`msg`,`msg_type`,`receiver`,`instance_id`,`apikey`,`token`)        values('" +
                                msgid +
                                "','" +
                                message +
                                "','" +
                                msgtype +
                                "','" +
                                chatId +
                                "','" +
                                iid +
                                "','" +
                                apikey +
                                "','" +
                                token +
                                "')",
                                function (err, result, fields) {
                                    if (err) return res.send(status.forbidden());
                                    console.log("record added");
                                }
                            );
                        }
                        flag = 1;
                    }
                } catch (e) {
                    console.log(e);
                    object = {
                        error: "client is not initialized",
                    };
                }
            }
        }
    );
    if (flag == 1) {
        object = {
            error: null,
        };
    }
    res.send(object);
});

app.get("/getPlans", function (req, res) {
    conn.query("select * from plans", (err, result) => {
        if (err) return res.send(err);
        if (result.length > 0) {
            res.send(result);
        }
    });
});

app.post("/create/orderId", (req, res) => {
    let amount = req.body.amount;
    console.log("create orderId request : " + req.body);
    var options = {
        amount: amount,
        currency: "INR",
        receipt: "order_rcptid_i5",
    };
    instance.orders.create(options, function (err, order) {
        // console.log(order);
        res.send({ orderId: order.id });
    });
});

app.post("/api/payment/verify", (req, res) => {
    //   console.log(instance.payments.fetch(paymentId));
    let body =
        req.body.response.razorpay_order_id +
        "|" +
        req.body.response.razorpay_payment_id;

    var expectedSignature = crypto
        .createHmac("sha256", "CGgkDqWQn8f2Sp6vNwqftaXO")
        .update(body.toString())
        .digest("hex");
    // console.log("sig received ", req.body.response.razorpay_signature);
    // console.log("sig generated ", expectedSignature);
    var response = { signatureIsValid: "false" };
    if (expectedSignature === req.body.response.razorpay_signature)
        response = { signatureIsValid: "true" };
    res.send(response);
});

app.post("/recordPayment", function (req, res) {
    let planID = req.body.planID;
    let amount = req.body.amount / 100;
    let apikey = req.body.apikey;
    let orderId = req.body.orderID;
    let payID = req.body.payID;
    console.log(apikey);
    let subID = crypto.randomBytes(10).toString("hex");
    let endDate = new Date();
    conn.query(
        "insert into subscription values('" +
        subID +
        "','" +
        planID +
        "'," +
        amount +
        ",'" +
        apikey +
        "','" +
        payID +
        "','" +
        orderId +
        "',CURRENT_DATE)",
        (err, result) => {
            if (err) {
                return res.send(status.internalservererror());
            }
            res.send(status.ok());
        }
    );
});

app.post("/checkValidity", (req, res) => {
    var apikey = req.body.apikey;
});

app.post("/sendMail", async (req, res) => {
    var email = req.body.mail;
    // var phone = req.body.phone;
    var msg = req.body.message;
    var subject = req.body.subject;
    var mailOptions = {
        from: "sakshiiit232@gmail.com",
        to: email,
        subject: subject,
        text: msg,
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            res.send(status.expectationFailed());
        } else {
            console.log("Email sent: " + info.response);
            res.send(status.ok());
        }
    });
});

app.post("/get-contact-list", async (req, res) => {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const data = {
                table: req.body.obj.table,
                paramstr: req.body.obj.paramstr,
                apikey: apikey,
            };
            tableData(data, (result) => {
                res.send(result);
            });
        } else res.send(status.unauthorized());
    } catch (e) {
        console.log(e);
    }
});

app.get("/dis_template", function (req, res) {
    conn.query("select * from template", function (err, rest) {
        if (err) return console.log(err);
        if (rest.length > 0);
        res.send(rest);
    });
    // const data = {
    //       table: "template",
    //       paramstr: "true; --"
    //   }
    //   tableData(data, (result) => {
    //       res.send(result);
    //   });
});

app.post("/dis_mes", function (req, res) {
    let temp_name = req.body.temp_name;

    conn.query(
        "select * from template where temp_name='" + temp_name + "'",
        function (err, rest) {
            if (err) return console.log(err);
            if (rest.length > 0) res.send(rest);
            else {
                conn.query(
                    "select * from cstm_template where cstm_name='" + temp_name + "'",
                    function (err, rest1) {
                        if (err) return console.log(err);
                        if (rest1.length > 0) console.log(rest1);
                        res.send(rest1);
                    }
                );
            }
        }
    );
});

function one(message, clientobj, selectedcol) {
    let keys = Object.keys(clientobj[0]);
    let msgarray = new Array();
    // let phoneArray = new Array();
    let value1arr = new Array();
    // let emailarray = new Array();
    //let changecount = 2;
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < selectedcol.length; j++) {
            if (keys[i] == selectedcol[j]) {
                //let custommsg;
                for (let k = 0; k < clientobj.length; k++) {
                    let values = Object.values(clientobj[k]);
                    if (keys[i] == selectedcol[0]) {
                        value1arr.push(values[i]);
                    }
                    // if (keys[i] == selectedcol[1]) {
                    //   emailarray.push(values[i]);
                    // }
                }
            }
        }
    }
    let tempmsg;
    for (let k = 0; k < clientobj.length; k++) {
        tempmsg = message.replace("[value1]", value1arr[k]);
        msgarray.push(tempmsg);
    }
    // console.log(msgarray);
    return msgarray;
}

function two(message, clientobj, selectedcol) {
    let keys = Object.keys(clientobj[0]);
    let msgarray = new Array();
    //let phoneArray = new Array();
    let value1arr = new Array();
    let value2arr = new Array();
    //let changecount = 2;
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < selectedcol.length; j++) {
            if (keys[i] == selectedcol[j]) {
                // let custommsg;
                for (let k = 0; k < clientobj.length; k++) {
                    let values = Object.values(clientobj[k]);
                    if (keys[i] == selectedcol[0]) {
                        value1arr.push(values[i]);
                    }
                    if (keys[i] == selectedcol[1]) {
                        value2arr.push(values[i]);
                    }
                }
            }
        }
    }
    let tempmsg;
    for (let k = 0; k < clientobj.length; k++) {
        tempmsg = message.replace("[value1]", value1arr[k]);
        tempmsg = tempmsg.replace("[value2]", value2arr[k]);
        msgarray.push(tempmsg);
    }
    // console.log(msgarray);
    return msgarray;
}

function three(message, clientobj, selectedcol) {
    let keys = Object.keys(clientobj[0]);
    let msgarray = new Array();
    //let phoneArray = new Array();
    let value1arr = new Array();
    let value2arr = new Array();
    let value3arr = new Array();
    //let changecount = 2;
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < selectedcol.length; j++) {
            if (keys[i] == selectedcol[j]) {
                // let custommsg;
                for (let k = 0; k < clientobj.length; k++) {
                    let values = Object.values(clientobj[k]);
                    if (keys[i] == selectedcol[0]) {
                        value1arr.push(values[i]);
                    }
                    if (keys[i] == selectedcol[1]) {
                        value2arr.push(values[i]);
                    }
                    if (keys[i] == selectedcol[2]) {
                        value3arr.push(values[i]);
                    }
                }
            }
        }
    }
    let tempmsg;
    for (let k = 0; k < clientobj.length; k++) {
        tempmsg = message.replace("[value1]", value1arr[k]);
        tempmsg = tempmsg.replace("[value2]", value2arr[k]);
        tempmsg = tempmsg.replace("[value3]", value3arr[k]);
        msgarray.push(tempmsg);
    }
    // console.log(msgarray);
    return msgarray;
}

function four(message, clientobj, selectedcol) {
    let keys = Object.keys(clientobj[0]);
    let msgarray = new Array();
    //let phoneArray = new Array();
    let value1arr = new Array();
    let value2arr = new Array();
    let value3arr = new Array();
    let value4arr = new Array();
    //let changecount = 2;
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < selectedcol.length; j++) {
            if (keys[i] == selectedcol[j]) {
                // let custommsg;
                for (let k = 0; k < clientobj.length; k++) {
                    let values = Object.values(clientobj[k]);
                    if (keys[i] == selectedcol[0]) {
                        value1arr.push(values[i]);
                    }
                    if (keys[i] == selectedcol[1]) {
                        value2arr.push(values[i]);
                    }
                    if (keys[i] == selectedcol[2]) {
                        value3arr.push(values[i]);
                    }
                    if (keys[i] == selectedcol[3]) {
                        value4arr.push(values[i]);
                    }
                }
            }
        }
    }
    let tempmsg;
    for (let k = 0; k < clientobj.length; k++) {
        tempmsg = message.replace("[value1]", value1arr[k]);
        tempmsg = tempmsg.replace("[value2]", value2arr[k]);
        tempmsg = tempmsg.replace("[value3]", value3arr[k]);
        tempmsg = tempmsg.replace("[value4]", value4arr[k]);
        msgarray.push(tempmsg);
    }
    // console.log(msgarray);
    return msgarray;
}

function five(message, clientobj, selectedcol) {
    let keys = Object.keys(clientobj[0]);
    let msgarray = new Array();
    //let phoneArray = new Array();
    let value1arr = new Array();
    let value2arr = new Array();
    let value3arr = new Array();
    let value4arr = new Array();
    let value5arr = new Array();
    //let changecount = 2;
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < selectedcol.length; j++) {
            if (keys[i] == selectedcol[j]) {
                // let custommsg;
                for (let k = 0; k < clientobj.length; k++) {
                    let values = Object.values(clientobj[k]);
                    if (keys[i] == selectedcol[0]) {
                        value1arr.push(values[i]);
                    }
                    if (keys[i] == selectedcol[1]) {
                        value2arr.push(values[i]);
                    }
                    if (keys[i] == selectedcol[2]) {
                        value3arr.push(values[i]);
                    }
                    if (keys[i] == selectedcol[3]) {
                        value4arr.push(values[i]);
                    }
                    if (keys[i] == selectedcol[4]) {
                        value5arr.push(values[i]);
                    }
                }
            }
        }
    }
    let tempmsg;
    for (let k = 0; k < clientobj.length; k++) {
        tempmsg = message.replace("[value1]", value1arr[k]);
        tempmsg = tempmsg.replace("[value2]", value2arr[k]);
        tempmsg = tempmsg.replace("[value3]", value3arr[k]);
        tempmsg = tempmsg.replace("[value4]", value4arr[k]);
        tempmsg = tempmsg.replace("[value5]", value5arr[k]);
        msgarray.push(tempmsg);
    }
    // console.log(msgarray);
    return msgarray;
}

app.post("/tempmsg", async function (req, res) {
    var phonearray = req.body.phonearray;
    var msg = req.body.message;
    var clientobj = req.body.clientobj;
    var selectedcol = req.body.selectedcol;
    var indx = req.cookies.index;
    console.log(msg);
    let msgarr;
    if (selectedcol.length == 1) {
        msgarr = one(msg, clientobj, selectedcol);
    } else if (selectedcol.length == 2) {
        msgarr = two(msg, clientobj, selectedcol);
    } else if (selectedcol.length == 3) {
        msgarr = three(msg, clientobj, selectedcol);
    } else if (selectedcol.length == 4) {
        msgarr = four(msg, clientobj, selectedcol);
    } else if (selectedcol.length == 5) {
        msgarr = five(msg, clientobj, selectedcol);
    }
    for (let i = 0; i < clientobj.length; i++) {
        let prefix = "+91";
        let phone = phonearray[i];
        phone = prefix.concat(phone);
        let chatId = phone.substring(1) + "@c.us";

        if (await obj[indx].client.sendMessage(chatId, msgarr[i])) {
            console.log("msg sent");
        }
    }
    res.send("done");
});

app.post("/getChannels", (req, res) => {
    var apikey = req.body.apikey;
    conn.query(
        "select * from channel where apikey='" + apikey + "'",
        (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    );
});

app.post("/contactByChannel", (req, res) => {
    let channeID = req.body.channelID;
    conn.query(
        "select * from contact_list where channelID=" + channeID + "",
        (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    );
});

app.post("/sendTemplateBulkMail", async (req, res) => {
    var emailarray = req.body.emailarray;
    var msg = req.body.message;
    var clientobj = req.body.clientobj;
    var selectedcol = req.body.selectedcol;
    var subject = req.body.subject;
    console.log(msg);
    let msgarr;
    if (selectedcol.length == 1) {
        msgarr = one(msg, clientobj, selectedcol);
    } else if (selectedcol.length == 2) {
        msgarr = two(msg, clientobj, selectedcol);
    } else if (selectedcol.length == 3) {
        msgarr = three(msg, clientobj, selectedcol);
    } else if (selectedcol.length == 4) {
        msgarr = four(msg, clientobj, selectedcol);
    } else if (selectedcol.length == 5) {
        msgarr = five(msg, clientobj, selectedcol);
    }
    for (let i = 0; i < clientobj.length; i++) {
        // let prefix = "+91";
        let email = emailarray[i];
        // phone = prefix.concat(phone);
        // let chatId = phone.substring(1) + "@c.us";
        var mailOptions = {
            from: "sakshiiit232@gmail.com",
            to: email,
            subject: subject,
            text: msgarr[i],
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                res.send(status.expectationFailed());
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }
    res.send(status.ok());
});

app.post("/sendEmailToAll", (req, res) => {
    var clientarr = req.body.clientarr;
    var subject = req.body.subject;
    var msg = req.body.msg;
    console.log(clientarr, subject, msg);
    for (let i = 0; i < clientarr.length; i++) {
        var mailOptions = {
            from: "sakshiiit232@gmail.com",
            to: clientarr[i].email,
            subject: subject,
            text: msg,
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                res.send(status.expectationFailed());
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }
    res.send(status.ok());
});

app.post("/deleteChannel", (req, res) => {
    var id = req.body.id;
    conn.query(
        "delete from channel where channelID=" + id + "",
        (err, result) => {
            if (err) return res.send(status.internalservererror());
            res.send(status.ok());
        }
    );
});

app.post("/addContactToChannel", (req, res) => {
    let id = crypto.randomBytes(6).toString("hex");
    let conname = req.body.cname;
    let conphone = req.body.phone;
    let apikey = req.cookies.apikey;
    console.log(conname, conphone, apikey);
    let cid = req.body.cid;
    conn.query(
        "insert into contact(`id`,`apikey`, `name`, `phone`,`channelID`) values('" +
        id +
        "','" +
        apikey +
        "','" +
        conname +
        "'," +
        conphone +
        "," +
        cid +
        ")",
        (err, result, fields) => {
            if (err) return res.send(status.internalservererror());
            console.log(result);
            res.send(status.ok());
        }
    );
});

app.post("/deleteContactFromChannel", (req, res) => {
    var contactid = req.body.id;
    conn.query(
        "delete from contact where id='" + contactid + "'",
        (err, result) => {
            if (err) return res.send(status.internalservererror());
            console.log(result);
            res.send(status.ok());
        }
    );
});

// app.post("/getContact", (req, res) => {
//   let id = req.body.id;
//   conn.query(
//     "select * from contact where id='" + id + "'",
//     (err, result, fields) => {
//       if (err) return res.send(status.internalservererror());
//       if (result.length > 0) {
//         res.send(result);
//       }
//     }
//   );
// });

// remaining
app.post("/edit_contact", (req, res) => {
    let id = req.body.id;
    let conname = req.body.conname;
    let conphone = req.body.conphone;
    console.log(id, conname, conphone);
    conn.query(
        "update contact set name='" +
        conname +
        "',phone=" +
        conphone +
        " where id='" +
        id +
        "'",
        (err, result, fields) => {
            if (err) return res.send(status.internalservererror());
            res.send(status.ok());
        }
    );
});

app.post("/importContactsFromGoogle", async (req, res) => {
    var apikey = req.cookies.apikey;
    var clientarr = req.body.clients;
    var query = "insert into contact(contact_id,apikey,name,phone) values";
    for (let i = 0; i < clientarr.length; i++) {
        let id = crypto.randomBytes(6).toString("hex");
        if (i != clientarr.length - 1) {
            query +=
                "('" +
                id +
                "','" +
                apikey +
                "','" +
                clientarr[i].name +
                "'," +
                clientarr[i].phone +
                "),";
        } else {
            query +=
                "('" +
                id +
                "','" +
                apikey +
                "','" +
                clientarr[i].name +
                "'," +
                clientarr[i].phone +
                ")";
        }
    }
    conn.query(query, (err, result, fields) => {
        if (err) return res.send(status.internalservererror());
        res.send(status.ok());
    });
});

app.post("/paginations", function (req, res) {
    var limit = req.body.limit;
    var offset = req.body.offset;
    conn.query(
        `select * from users limit ${limit} offset ${offset}`,
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        }
    );
});

app.get("/users", function (req, res) {
    conn.query("select * from users", (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    });
});

app.get("/getPlans", (req, res) => {
    conn.query("select * from plans", (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    });
});

app.get("/getTemplates", (req, res) => {
    conn.query("select * from template", (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    });
});

app.get("/getChannels", (req, res) => {
    conn.query(
        "select uname,channel.* from channel,users where channel.apikey=users.apikey",
        (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    );
});

app.get("/getContacts", (req, res) => {
    conn.query(
        "select uname,contact.* from contact,users where contact.apikey=users.apikey",
        (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    );
});

app.get("/getMessages", (req, res) => {
    conn.query(
        "select uname,message.* from users,message where users.apikey=message.apikey",
        (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    );
});

app.get("/getSubscriptions", (req, res) => {
    conn.query(
        "select uname,subscription.* from users,subscription where users.apikey=subscription.apikey",
        (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    );
});

app.get("/userinfo", async (req, res) => {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const data = {
                table: "users",
                paramstr: true,
                apikey: apikey,
            };
            tableData(data, (result) => {
                res.send(result);
            });
        } else res.send(status.internalservererror().status_code);
    } catch (e) {
        console.log(e);
    }
});

// pagination apis
app.post("/getBtn", (req, res) => {
    var limit = req.body.limit;
    conn.query("select count(*) as cnt from template", (err, results) => {
        console.log(results[0].cnt);
        //res.send(results);
        var totalBtn = results[0].cnt / limit;

        res.send({ totalBtn: totalBtn });
    });
});

app.get("/dis_cstm_template", function (req, res) {
    apikey = req.cookies.apikey;
    conn.query(
        "select * from cstm_template where apikey='" + apikey + "'",
        function (err, rest1) {
            if (err) return console.log(err);
            if (rest1.length > 0)
                //res.send(rest1);
                console.log(rest1);
            res.send(rest1);
        }
    );
});

app.post("/getDataByPage", (req, res) => {
    var limit = req.body.limit;
    var offset = (req.body.pgno - 1) * limit;
    conn.query(
        `SELECT * FROM template LIMIT ${offset},${limit};`,
        (err, results) => {
            console.log(results);
            res.send(results);
        }
    );
});

// integrated apis
app.post("/get-channels", function (req, res) {
    apikey = req.cookies.apikey;
    const data = {
        table: req.body.obj.table,
        paramstr: req.body.obj.paramstr,
        apikey: apikey,
    };
    tableData(data, (result) => {
        res.send(result);
    });
});

app.get("/get-contact-list", async (req, res) => {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const data = {
                table: "contact",
                paramstr: true,
                apikey: apikey,
            };
            tableData(data, (result) => {
                res.send(result);
            });
        } else res.send(status.unauthorized());
    } catch (e) {
        console.log(e);
    }
});

app.post("/addcontact", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            let id = crypto.randomBytes(6).toString("hex");
            conn.query(
                `insert into contact values('${id}','${apikey}','${req.body.name}','${req.body.phone}')`,
                (err, result) => {
                    if (err) return res.send(status.internalservererror());
                    res.send(status.ok());
                }
            );
        } else res.send(status.unauthorized());
    } catch (e) {
        console.log(e);
    }
});

app.post("/createchannel", async (req, res) => {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            conn.query(
                `insert into channel(channelName,apikey) values('${req.body.name}','${apikey}')`,
                (err, result) => {
                    if (err) return res.send(status.internalservererror());
                    res.send(status.ok());
                }
            );
        } else res.send(status.unauthorized());
    } catch (e) {
        console.log(e);
    }
});

app.delete("/deleterecord", (req, res) => {
    try {
        conn.query(
            `delete from ${req.body.obj.table} where ${req.body.obj.paramstr}`,
            (err, result) => {
                if (err) return res.send(status.internalservererror());
                res.send(status.ok());
            }
        );
    } catch (e) {
        console.log(e);
    }
});

app.post("/get-channel-contact", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const channelID = req.body.channelID;
            conn.query(
                `SELECT cc.channelID,c.contact_id,c.name,ch.channelName,c.phone FROM contact_channel cc, contact c, channel ch WHERE cc.channelID = ch.channelID AND cc.contactID = c.contact_id and cc.apikey = '${apikey}' AND cc.channelID = ${channelID}`,
                (err, result) => {
                    if (err) return res.send(status.internalservererror());
                    if (result.length == 0) return res.send(status.nodatafound());
                    res.send(result);
                }
            );
        } else res.send(status.unauthorized());
    } catch (e) {
        console.log(e);
    }
});

app.post("/addcontact2channel", async (req, res) => {
    var apikey = req.cookies.apikey;
    var contacts = req.body.contacts;
    var query = `insert into contact_channel values `;
    for (let i = 0; i < contacts.length; i++) {
        if (i != contacts.length - 1) {
            query += `('${req.body.id}','${req.body.contacts[i]}','${apikey}'),`;
        } else {
            query += `('${req.body.id}','${req.body.contacts[i]}','${apikey}')`;
        }
    }
    conn.query(query, (err, result) => {
        if (err) return res.send(status.internalservererror());
        res.send(status.ok());
    });
});

app.get("/get_phone_code", (req, res) => {
    var country_obj = country.getList();
    res.send(country_obj);
});

app.put("/updatepersonalinfo", async (req, res) => {
    apikey = req.cookies.apikey;

    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let country = req.body.country;
    let state = req.body.state;
    let city = req.body.city;

    var sql = ``;
    const isValidapikey = await checkAPIKey(apikey);

    try {
        if (isValidapikey) {
            conn.query(
                `SELECT * FROM users WHERE apikey = '${apikey}'`,
                function (err, result) {
                    if (err) return res.send(status.internalservererror());
                    if (result <= 0) return res.send(status.nodatafound());
                    if (result[0].phone != phone) {
                        sql = `UPDATE users SET uname = '${name}', phone = '${phone}', email = '${email}', country = '${country}', state = '${state}', city = '${city}', phoneverify = false WHERE apikey = '${apikey}'`;
                    } else {
                        sql = `UPDATE users SET uname = '${name}', phone = '${phone}', email = '${email}', country = '${country}', state = '${state}', city = '${city}' WHERE apikey = '${apikey}'`;
                    }
                    conn.query(sql, function (err, result) {
                        if (err) return res.send(status.internalservererror());
                        if (result <= 0) return res.send(status.nodatafound());
                        res.send(status.ok());
                    });
                }
            );
        } else res.send(status.unauthorized());
    } catch (e) {
        console.log(e);
    }
});

app.put("/phoneverify", async (req, res) => {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);

    try {
        if (isValidapikey) {
            conn.query(
                `UPDATE users SET phoneverify = true WHERE apikey = '${apikey}'`,
                function (err, result) {
                    if (err) return res.send(status.internalservererror());
                    if (result <= 0) return res.send(status.nodatafound());

                    res.send(status.ok());
                }
            );
        } else res.send(status.unauthorized());
    } catch (e) {
        console.log(e);
    }
});

app.post("/profile_img", async (req, res) => {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);

    try {
        if (isValidapikey) {
            createfolder(`\\profile\\${apikey}`);
            if (req.files && Object.keys(req.files).length !== 0) {
                const uploadedFile = req.files.img;
                const uploadPath = `${__dirname}\\assets\\upload\\profile\\${apikey}\\${uploadedFile.name}`;

                uploadedFile.mv(uploadPath, function (err) {
                    if (err) res.send(status.badRequest());
                    conn.query(
                        `UPDATE users SET image = '${uploadedFile.name}' WHERE apikey = '${apikey}'`,
                        function (err, result) {
                            if (err) return res.send(status.internalservererror());
                            if (result <= 0) return res.send(status.nodatafound());
                            res.send(status.ok());
                        }
                    );
                });
            } else res.send(status.nodatafound());
        } else res.send(status.unauthorized());
    } catch (e) {
        console.log(e);
    }
});

app.post("/insert_cstmtemplate", function (req, res) {
    let cstmid = crypto.randomBytes(6).toString("hex");
    let cstmname = req.body.cstmname;
    let cstmmsg = req.body.cstmmsg;
    let userfield = req.body.userfield;
    let apikey = req.cookies.apikey;
    function char_count(str, letter) {
        var letter_Count = 0;
        for (var position = 0; position < str.length; position++) {
            if (str.charAt(position) == letter) {
                letter_Count += 1;
            }
        }
        return letter_Count;
    }
    let tempmsg = cstmmsg;
    let cnt = char_count(cstmmsg, "{");
    console.log(char_count(cstmmsg, "{"));
    for (let k = 1; k <= cnt; k++) {
        tempmsg = tempmsg.replace("{}", "value" + [k]);
    }
    conn.query(
        "insert into cstm_template (`cstm_id`, `cstm_name`, `cstm_msg`,`userfields`,`apikey`)values('" +
        cstmid +
        "','" +
        cstmname +
        "','" +
        tempmsg +
        "'," +
        userfield +
        ",'" +
        apikey +
        "')",
        (err, result, fields) => {
            if (err) return res.send(error.internalservererror());
            res.send(result);
        }
    );
});

app.get("/instance/:id", (req, res) => {
    var instanceid = req.params.id;
    conn.query(
        `select * from instance where instance_id = '${instanceid}'`,
        function (err, result) {
            if (err || result <= 0) return res.redirect("/404alt");
            var data = {
                apikey: result[0].apikey,
                token: result[0].token,
                i_name: result[0].i_name,
            };
            req.session.data = data;
            res.sendFile(__dirname + "/pages/instanceMain.html");
        }
    );
});

app.post("/user", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const data = {
                table: "instance",
                paramstr: `instance_id = '${req.body.iid}'`,
                apikey: apikey,
            };
            tableData(data, (result) => {
                res.send(result);
            });
        } else res.send(status.unauthorized());
    } catch (e) {
        console.log(e);
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Test the ci cd pipeline