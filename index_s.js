require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const { Client, MessageMedia } = require("whatsapp-web.js");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const app = express();
const csvtojson = require("csvtojson");
const mysql = require("mysql");
const path = require("path");
const requ = require("request").defaults({ rejectUnauthorized: false }); //for passing headers
const router = require("./assets/js/route");

const cloudinary = require('cloudinary').v2;
const fs = require("fs");
const http = require("http");
const crypto = require("crypto");
var nodemailer = require("nodemailer");
var passport = require("passport");
const jwt = require("jsonwebtoken");
let obj = [];
const status = require("./assets/js/status");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { GoogleSpreadsheet } = require("google-spreadsheet");
const Razorpay = require("razorpay");
const country = require("country-list-with-dial-code-and-flag");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");


// Configuration 
cloudinary.config({
    cloud_name: "do6cd8c3p",
    api_key: "589267637882559",
    api_secret: "3HypXjPtwO8Jg9Bv23hTR83kY-M"
});

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


class clients {
    client;
    constructor() {
        this.client = new Client();
        this.client.initialize();
    }

    disconnect() {
        this.client.destroy();
        this.client.initialize();
    }

    async generateqr(res) {
        this.client.on("qr", (qr) => {
            res.send(qr);
        });
    }

    async checkauth(iid) {
        await this.client.on('ready', () => {
            //console.log('Client is ready!');

            // Check if the client is authenticated
            if (obj[iid].client.isLoggedIn()) {
                //console.log('Client is authenticated!');
                res.send(status.ok());
            }
        });
    }
}

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/assets", express.static("assets"));
app.use("/instance/assets", express.static("assets"));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

app.use(
    sessions({
        secret: "thisismysecret",
        saveUninitialized: true,
        resave: true,
    })
);

const port = process.env.PORT;
let apikey;

function setCookie(res, name, value, days) {
    res.cookie(name, value, { maxAge: 1000 * 60 * 60 * 24 * days });
}

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
        //console.log(e);
    }
}



const tableData = (data, callback) => {
    try {
        conn.query(
            `SELECT * FROM ${data.table} WHERE ${data.paramstr} AND apikey = '${data.apikey}'`,
            (err, result) => {
                //console.log(err);
                if (err) return callback(status.internalservererror());
                if (result.length == 0) return callback(status.nodatafound());
                return callback(result);
            }
        );
    } catch (e) {
        callback(status.internalservererror());
    }
};





app.listen(port, () => {
    console.log(`Server running on port ${port} | http://localhost:${port}/signin`);
});

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
                if (err) return //console.log(err);
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
                            if (err) return //console.log(err);
                            if (result) {
                                res.cookie("apikey", id, {
                                    maxAge: 1000 * 24 * 60 * 60 * 7,
                                });
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
            //console.log(row._rawData);
            data.push(row._rawData);
            phones.push(row.phone);
        }
        object["colnames"] = colnames;
        object["values"] = data;
        res.send(object);
    } catch (e) {
        //console.log(e);
    }
});

app.post("/sendtoallgsheet", async (req, res) => {
    //console.log("send api");
    var indx = req.cookies.index;

    const apikey = req.body.apikey;
    const token = req.body.token;
    var iid = req.body.instanceid;
    var data = req.body.data;
    var msg = req.body.msg;
    var date_ob = new Date();
    //console.log(data);
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
                    for (let i = 0; i < data.length; i++) {
                        let prefix = "+91";
                        let phone = data[i].phone;
                        phone = prefix.concat(phone);
                        let chatId = phone.substring(1) + "@c.us";
                        if (await obj[indx].client.sendMessage(chatId, msg)) {
                            var msgid = crypto.randomBytes(8).toString("hex");
                            var msgtype = "custom_bulk";
                            conn.query(
                                "insert into message(`msgid`,`msg`,`msg_type`,`receiver`,`instance_id`,`apikey`,`token`)        values('" +
                                msgid +
                                "','" +
                                msg +
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
                                    if (err)
                                        return res.send(status.forbidden());
                                    //console.log("record added");
                                }
                            );
                            //console.log("message sent to " + data[i].name);
                        }
                        flag = 1;
                    }
                } catch (e) {
                    //console.log(e);
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
                if (err) return //console.log(err);
                // //console.log(rslt);
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
        //console.log(e);
    }
});
let msgcount = 0,
    imgcount = 0,
    bulkcount = 0;

app.get("/getmsgtypes/:iid", (req, res) => {
    let iid = req.params.iid;
    //console.log(iid);
    (msgcount = 0),
        (template_bulkcount = 0),
        (custom_bulkcount = 0),
        (channelcount = 0);
    conn.query(
        "SELECT msg_type,msgid FROM message WHERE instance_id='" + iid + "'",
        (err, result) => {
            if (err) {
                //console.log(err);
            }
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].msg_type == "msg") {
                        msgcount++;
                    } else if (result[i].msg_type == "template_bulk") {
                        template_bulkcount++;
                    } else if (result[i].msg_type == "custom_bulk") {
                        custom_bulkcount++;
                    } else if (result[i].msg_type == "channel") {
                        channelcount++;
                    }
                    // //console.log(msgcount + " " + imgcount + " " + bulkcount);
                }
                var obj = {
                    msg: msgcount,
                    template_bulk: template_bulkcount,
                    custom_bulk: custom_bulkcount,
                    channel: channelcount,
                };
                // //console.log(obj);
                res.send(obj);
            }
        }
    );
});

app.post("/sendNotification/:mail/:phone", async (req, res) => {
    var email = req.params.mail;
    var phone = req.params.phone;
    //console.log(email + " " + phone);
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dashboardcrm.2022@gmail.com",
            pass: "dbwtdfmwrxmwzcat",
        },
    });
    var mailOptions = {
        from: "sakshiiit232@gmail.com",
        to: email,
        subject: "Message sent",
        text: "Whatsapp message was sent to " + phone,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            //console.log(error);
            res.send("email not sent");
        } else {
            //console.log("Email sent: " + info.response);
            res.send("email sent");
        }
    });
});

app.get("/createqr/:ind", async (req, res) => {
    var ind = req.params.ind;
    //console.log("Generating QR image...");
    //console.log(ind);

    await obj[ind].client.on("qr", (qr) => {
        //console.log(qr);
        res.send(qr);
    });
});

app.get("/disconnected/:index/:iid", async (req, res) => {
    let ind = req.params.index;
    let iid = req.params.iid;
    if (ind && iid) {
        try {
            obj[iid].disconnect();

            conn.query(`update instance set isActive = 0 where instance_id = '${iid}'`,
                (err, result) => {
                    if (err || result.affectedRows < 1) res.send(status.internalservererror());
                    res.clearCookie("index");
                    res.send(status.ok());
                }
            );
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
                if (result.length > 0)
                    return res.send(status.duplicateRecord());
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) return res.send("err in bcrypt");
                    // Store hash in database
                    conn.query(
                        `INSERT INTO users(apikey,uname,email,password,phone,phoneverify,country,state,city,registrationDate,image) VALUES('${id}','${name}','${email}','${hash}','${phone}',false,'${country}','${state}','${city}',CURRENT_DATE,NULL)`,
                        function (err, result) {
                            res.clearCookie("everify");
                            if (err)
                                return res.send(status.internalservererror());
                            if (result.affectedRows == 0)
                                return res.send(status.internalservererror());
                            return res.send(status.ok());
                        }
                    );
                });
            }
        );
    } else {
        res.send(status.badRequest());
    }
});

app.post("/signin1", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const rememberme = req.body.rememberme;

    if (email && password && email != undefined && password != undefined) {
        tableData({
            table: "users",
            paramstr: `email = '${email}' --`,
            apikey: apikey,
        }, (result, err) => {
            switch (result.status_code) {
                case "500":
                    return res.send(status.internalservererror());
                    break;
                case "404": {
                    tableData({
                        table: "admin",
                        paramstr: `email='${email}' --`,
                        apikey: apikey,
                    }, (result, err2) => {
                        if (result.status_code == 500)
                            return res.send(status.internalservererror());
                        if (result.status_code == 404) {
                            tableData({
                                table: "support_agents",
                                paramstr: `a_email='${email}' and a_password='${password}' --`,
                                apikey: apikey,
                            }, (result, err3) => {
                                switch (result.status_code) {
                                    case "500":
                                        console.log("inside 500");
                                        return res.send(status.internalservererror());
                                        break;
                                    case "404":
                                        console.log("inside 404");
                                        return res.send(status.unauthorized());
                                        break;
                                    default: {
                                        console.log("inside default");
                                        if (result.length > 1)
                                            res.send(status.duplicateRecord());
                                        if (result[0].a_email == email && result[0].a_password == password) {
                                            console.log("inside condition");
                                            setCookie(res, "agent_id", result[0].agent_id, 1);
                                            setCookie(res, "agent_email", result[0].a_email, 1);
                                            console.log("signin success!!");
                                            res.send(status.success());
                                        }
                                        else {
                                            res.send(status.unauthorized());
                                        }
                                    }
                                }
                            }
                            )
                        }
                        if (result.length > 1)
                            return res.send(status.duplicateRecord());
                        if (result.length == 1) {
                            bcrypt.compare(password, result[0].password, (err, match) => {
                                if (match) {
                                    setCookie(res, "aid", result[0].id, 1);
                                    if (rememberme == "true") {
                                        res.cookie("email", email, {
                                            maxAge:
                                                1000 *
                                                60 *
                                                60 *
                                                24 *
                                                15,
                                        });
                                    }
                                    res.send(status.accepted());
                                } else {
                                    console.log("do not Match");
                                    return res.send(status.unauthorized());
                                }
                            });
                            return res.send(status.accepted());
                        }
                    });
                    break;
                }
                default: {
                    if (result.length > 1)
                        return res.send(status.duplicateRecord());
                    bcrypt.compare(
                        password,
                        result[0].password,
                        (err, match) => {
                            if (match) {
                                setCookie(
                                    res,
                                    "apikey",
                                    result[0].id,
                                    1
                                );
                                if (rememberme == "true") {
                                    res.cookie("email", email, {
                                        maxAge: 1000 * 60 * 60 * 24 * 15,
                                    });
                                }
                                res.send(status.ok());
                            } else {
                                console.log("do not Match");
                                return res.send(status.unauthorized());
                            }
                        }
                    );
                }
            }
        }
        );
    } else {
        return res.send(status.badRequest());
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
            // //console.log(result);
            // if (result.length > 0) {
            // }
        }
    );
    res.send(token);
});

app.post("/sendimage1", async function (req, res) {
    const { fileupload2 } = req.files;
    //console.log(req.cookies.index);
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
    //console.log(fileupload2);
    //console.log(iid);
    //console.log(indx);
    //console.log(apikey);
    //console.log(token);
    //console.log(fileupload2.name);

    if (fileupload2 && iid && indx && apikey && token && phone) {
        //console.log(fileupload2);
        //console.log(iid);
        //console.log(indx);
        //console.log(apikey);
        //console.log(token);
        request = http.request(options, (response) => {
            // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
            //response.setEncoding('utf8');

            // As data starts streaming in, add each chunk to "data"
            response.on("data", (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            response.on("end", async () => {
                //console.log(data);
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
                        //console.log("query1");
                        if (err) return status.forbidden();
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
                                    "select * from users where apikey='" +
                                    apikey +
                                    "'",
                                    (err, result2, fields) => {
                                        // //console.log(result2[0]);
                                        if (result2.length > 0) {
                                            //console.log(result2);
                                            var email = result2[0].email;

                                            const options2 = {
                                                hostname: "localhost",
                                                port: "8081",
                                                path:
                                                    "/sendNotification/" +
                                                    email +
                                                    "/" +
                                                    phone +
                                                    "", // we changed the path to only grab one post
                                                method: "POST",
                                            };
                                            var data2 = "";
                                            var request2 = http.request(
                                                options2,
                                                (response2) => {
                                                    response2.on(
                                                        "data",
                                                        (chunk) => {
                                                            data2 += chunk;
                                                        }
                                                    );

                                                    response2.on("end", () => {
                                                        //console.log(data2);
                                                        if (
                                                            data2 ==
                                                            "email sent"
                                                        ) {
                                                            res.send(
                                                                status.ok()
                                                            );
                                                        } else {
                                                            res.send(
                                                                status.expectationFailed()
                                                            );
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

function sendNotification(email, message) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dashboardcrm.2022@gmail.com",
            pass: "dbwtdfmwrxmwzcat",
        },
    });
    var mailOptions = {
        from: "sakshiiit232@gmail.com",
        to: email,
        subject: "Confermation Mail of sending message",
        text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) return status.forbidden();
        return status.ok();
    });
}

app.post("/sendmsg", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const token = req.body.token;
            let iid = req.body.iid;
            let message = req.body.template.msg;
            var phone = `+91${req.body.to}`;
            const chatId = phone.substring(1) + "@c.us";

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());
                    obj[iid].client.sendMessage(chatId, message).then((messageId) => {
                        var msgid = crypto.randomBytes(8).toString("hex");
                        conn.query(
                            `insert into message values('${msgid}','${message}','message','${chatId}','${iid}','${apikey}','${token}',CURRENT_TIMESTAMP())`,
                            function (err, result) {
                                if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                res.send(status.ok());
                            });
                    }).catch((err) => {
                        console.log(err);
                        res.send(status.userNotValid());
                    });
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }
});

function createfolder(foldername) {
    try {
        const dirs = foldername.split(path.sep);
        let currentDir = '';

        for (const dir of dirs) {
            currentDir = path.join(currentDir, dir);

            if (!fs.existsSync(`${__dirname}\\assets\\upload\\${currentDir}`)) {
                if (fs.mkdirSync(`${__dirname}\\assets\\upload\\${currentDir}`)) {
                    return status.ok().status_code;
                }
                else {
                    return status.nodatafound().status_code;
                }
            }
            else {
                return status.duplicateRecord().status_code;
            }
        }
    } catch (err) {
        console.log(err);
    }
}

app.post("/sendimage/:iid/:token/:to", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const token = req.params.token;
            let iid = req.params.iid;
            let to = req.params.to;
            var phone = `+91${to}`;
            const chatId = phone.substring(1) + "@c.us";

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());

                    createfolder(`image_data\\${apikey}\\${iid}`)
                    if (req.files && Object.keys(req.files).length !== 0) {
                        const uploadedFile = req.files.image;
                        const uploadPath = `${__dirname}/assets/upload/image_data/${apikey}/${iid}/${uploadedFile.name}`;

                        uploadedFile.mv(uploadPath, function (err) {
                            if (err) res.send(status.badRequest());
                            let filepath = `${__dirname}/assets/upload/image_data/${apikey}/${iid}/${uploadedFile.name}`;
                            const media = MessageMedia.fromFilePath(filepath);

                            obj[iid].client.sendMessage(chatId, media).then((messageId) => {
                                var msgid = crypto.randomBytes(8).toString("hex");

                                cloudinary.uploader.upload(filepath, { folder: 'M3' }).then((data) => {
                                    conn.query(`insert into message values('${msgid}','${data.secure_url}','image','${chatId}','${iid}','${apikey}','${token}',CURRENT_TIMESTAMP())`,
                                        function (err, result) {
                                            console.log("err", err);
                                            console.log("result", result);
                                            if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                            res.send(status.ok());
                                        });
                                }).catch((err) => {
                                    console.log("Cloudnary Error", err);
                                    conn.query(`insert into message values('${msgid}','${uploadedFile.name}','image','${chatId}','${iid}','${apikey}','${token}',CURRENT_TIMESTAMP())`,
                                        function (err, result) {
                                            console.log("err", err);
                                            console.log("result", result);
                                            if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                            res.send(status.ok());
                                        });
                                });

                            }).catch((error) => {
                                console.error(`Error sending message: ${error}`);
                                res.send(status.badRequest());
                            });
                        });
                    }
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

app.get("/qr/:iid", async (req, res) => {
    var iid = req.params.iid;
    let f = 0, ind = 0;
    ind = arr.length;
    res.cookie("index", ind);
    var temp = { client: iid };
    arr.push(temp);
    obj[iid] = new clients();
    console.log("in qr", obj[iid]);
    await obj[iid].generateqr(res);
    // await obj[iid].on("qr", (qr) => {
    //     console.log(qr);
    //     res.send(qr);
    // });
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

app.get("/checkauth/:iid", async function (req, res) {
    try {
        let iid = req.params.iid;

        console.log(obj[iid]);

        await obj[iid].checkauth(iid);

        // await obj[iid].client.on('ready', () => {
        //     //console.log('Client is ready!');

        //     // Check if the client is authenticated
        //     if (obj[iid].client.isLoggedIn()) {
        //         //console.log('Client is authenticated!');
        //         res.send(status.ok());
        //     }
        // });
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

app.get("/authenticated/:index/:iid", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            let indx = req.params.index;
            let iid = req.params.iid;

            await obj[iid].client.on("authenticated", async (req, resp) => {
                conn.query(`update instance set isActive = 1 where instance_id = '${iid}'`,
                    (err, result) => {
                        if (err || result.affectedRows < 1) res.send(status.internalservererror());
                        res.send(status.ok());
                    });
            });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }
});

app.post("/validateInstance", (req, res) => {
    let iid = req.body.iid;
    let apikey = req.cookies.apikey;
    try {
        conn.query(
            `select * from instance where instance_id='${iid}'`,
            async (err, result) => {
                if (err) res.send(status.internalservererror());
                if (result.length == 1 && apikey == result[0].apikey) {
                    const isValidapikey = await checkAPIKey(result[0].apikey);

                    if (isValidapikey) {
                        tableData(
                            {
                                table: "subscription",
                                paramstr: true,
                                apikey: apikey,
                            },
                            (result) => {
                                if (result.status_code == 404) {
                                    tableData(
                                        {
                                            table: "instance",
                                            paramstr: true,
                                            apikey: apikey,
                                        },
                                        (result) => {
                                            if (result.status_code == 404) {
                                                res.send(status.ok());
                                            } else {
                                                res.send(status.forbidden());
                                            }
                                        }
                                    );
                                } else {
                                    var latest = new Date(result[0].pay_date),
                                        current_date = new Date();
                                    var planID = result[0].planID;
                                    let total_instance = 0,
                                        duration = 0,
                                        remaining_days = 0;
                                    for (var i in result) {
                                        if (
                                            latest <
                                            new Date(result[i].pay_date)
                                        ) {
                                            latest = new Date(
                                                result[i].pay_date
                                            );
                                            planID = result[i].planID;
                                        }
                                    }

                                    tableData(
                                        {
                                            table: "plans",
                                            paramstr: `planid = ${planID} --`,
                                            apikey: apikey,
                                        },
                                        (result) => {
                                            total_instance =
                                                result[0].totalInstance;
                                            duration = result[0].durationMonth;
                                            latest.setMonth(
                                                latest.getMonth() + duration
                                            );
                                            remaining_days = Math.ceil(
                                                Math.round(
                                                    latest - current_date
                                                ) /
                                                (1000 * 60 * 60 * 24)
                                            );

                                            //console.log(latest, total_instance);
                                            if (remaining_days > 0) {
                                                tableData(
                                                    {
                                                        table: "instance",
                                                        paramstr: true,
                                                        apikey: apikey,
                                                    },
                                                    (result) => {
                                                        if (
                                                            result.length >=
                                                            total_instance
                                                        )
                                                            return res.send(
                                                                status.forbidden()
                                                            );
                                                        res.send(status.ok());
                                                    }
                                                );
                                            } else {
                                                res.send(status.forbidden());
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    } else res.send(status.unauthorized());
                } else {
                    res.send(status.badRequest());
                }
            }
        );
    } catch (error) {
        //console.log(error);
        res.send(status.unauthorized(), error);
    }
});

app.post("/addinstance", async (req, res) => {
    var token = crypto.randomBytes(10).toString("hex");
    var instanceid = crypto.randomBytes(6).toString("hex");
    var instance_name = req.body.instance_name;
    apikey = req.cookies.apikey;

    function create(id, name, apikey, token) {
        tableData(
            {
                table: "instance",
                paramstr: `(i_name = '${name}')`,
                apikey: apikey,
            },
            (result) => {
                if (result.status_code == 404) {
                    conn.query(
                        `INSERT INTO instance values('${id}','${name}','${apikey}','${token}',CURRENT_DATE,0)`,
                        function (error, result) {
                            if (error)
                                return res.send(status.internalservererror());
                            return res.send(status.created());
                        }
                    );
                } else {
                    res.send(status.duplicateRecord());
                }
            }
        );
    }

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            tableData(
                {
                    table: "subscription",
                    paramstr: true,
                    apikey: apikey,
                },
                (result) => {
                    if (result.status_code == 404) {
                        tableData(
                            {
                                table: "instance",
                                paramstr: true,
                                apikey: apikey,
                            },
                            (result) => {
                                if (result.status_code == 404) {
                                    create(
                                        instanceid,
                                        instance_name,
                                        apikey,
                                        token
                                    );
                                } else {
                                    res.send(status.forbidden());
                                }
                            }
                        );
                    } else {
                        var latest = new Date(result[0].pay_date),
                            current_date = new Date();
                        var planID = result[0].planID;
                        let total_instance = 0,
                            duration = 0,
                            remaining_days = 0;
                        for (var i in result) {
                            if (latest < new Date(result[i].pay_date)) {
                                latest = new Date(result[i].pay_date);
                                planID = result[i].planID;
                            }
                        }

                        tableData(
                            {
                                table: "plans",
                                paramstr: `planid = ${planID} --`,
                                apikey: apikey,
                            },
                            (result) => {
                                total_instance = result[0].totalInstance;
                                duration = result[0].durationMonth;
                                latest.setMonth(latest.getMonth() + duration);
                                remaining_days = Math.ceil(
                                    Math.round(latest - current_date) /
                                    (1000 * 60 * 60 * 24)
                                );

                                if (remaining_days > 0) {
                                    tableData(
                                        {
                                            table: "instance",
                                            paramstr: true,
                                            apikey: apikey,
                                        },
                                        (result) => {
                                            if (result.length >= total_instance)
                                                return res.send(
                                                    status.forbidden()
                                                );
                                            create(
                                                instanceid,
                                                instance_name,
                                                apikey,
                                                token
                                            );
                                        }
                                    );
                                } else {
                                    res.send(status.forbidden());
                                }
                            }
                        );
                    }
                }
            );
        } else res.send(status.unauthorized());
    } catch (error) {
        //console.log(error);
        res.send(status.unauthorized(), error);
    }
});

app.get("/getColumnOfUsers", (req, res) => {
    conn.query(
        "SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='qrdb' AND `TABLE_NAME`='instance'",
        (err, result) => {
            if (err) return res.send(err);
            if (result.length > 0) {
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
                res.send(result);
            }
        }
    );
});

app.get("/getTotalMessages", (req, res) => {
    conn.query(
        "select count(*) as totalMessages from message",
        (err, result) => {
            if (err) return res.send(err);
            if (result.length > 0) {
                res.send(result);
            }
        }
    );
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
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dashboardcrm.2022@gmail.com",
            pass: "dbwtdfmwrxmwzcat",
        },
    });
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
            res.send("Email not sent!!");
        } else {
            //console.log("Email sent: " + info.response);
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
            //console.log(err);
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
    let email = req.body.email;

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dashboardcrm.2022@gmail.com",
            pass: "dbwtdfmwrxmwzcat",
        },
    });

    if (email == "" || email == null || email == undefined) {
        res.send(status.badRequest());
    } else {
        var mailOptions = {
            from: "sakshiiit232@gmail.com",
            to: email,
            subject: "Reset password from velzon [ Whatsapp Service ]",
            html: `<div class="u-row-container" style="padding: 0px;background-color: transparent"><div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"><div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"><div style="height: 100%;width: 100% !important;"><table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left"><div style="line-height: 140%; text-align: left; word-wrap: break-word;"><p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">Hello,</span></p><p style="font-size: 14px; line-height: 140%;">&nbsp;</p><p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">We have sent you this email in response to your request to reset your password on company name.</span></p><p style="font-size: 14px; line-height: 140%;">&nbsp;</p><p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">To reset your password, please follow the link below:</span></p></div></td></tr></tbody></table><table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;" align="left"><div align="left"><a href="${process.env.DOMAIN}/password-change" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Lato',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #18163a; border-radius: 1px;-webkit-border-radius: 1px; -moz-border-radius: 1px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;"><span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 18px; line-height: 21.6px;">Reset Password</span></span></a></div></td></tr></tbody></table>
            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left"></td></tr></tbody></table></div></div></div></div></div>`,
        };
        const data = {
            table: "users",
            paramstr: "(true)--",
            apikey: "null",
        };
        tableData(data, (result) => {
            let flag = false;
            for (var i in result) {
                if (email == result[i].email) {
                    flag = true;
                    break;
                } else {
                    flag = false;
                }
            }
            if (!flag) return res.send(status.nodatafound());
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) return res.send(status.badRequest());
                res.send(status.ok());
            });
        });
    }
});

app.get("/dis_user", function (req, res) {
    conn.query("select * from users", function (err, rest) {
        if (err) return //console.log(err);
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

    //console.log(clientinfo);
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
                                `${message}`
                            )
                        ) {
                            var msgid = crypto.randomBytes(8).toString("hex");
                            var msgtype = "custom_bulk";
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
                                    if (err)
                                        return res.send(status.forbidden());
                                    //console.log("record added");
                                }
                            );
                        }
                        flag = 1;
                    }
                } catch (e) {
                    //console.log(e);
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

app.post("/create/orderId", (req, res) => {
    let amount = req.body.amount;
    //console.log("create orderId request : " + req.body);
    var options = {
        amount: amount,
        currency: "INR",
        receipt: "order_rcptid_i5",
    };
    instance.orders.create(options, function (err, order) {
        // //console.log(order);
        res.send({ orderId: order.id });
    });
});

app.post("/api/payment/verify", (req, res) => {
    //   //console.log(instance.payments.fetch(paymentId));
    let body =
        req.body.response.razorpay_order_id +
        "|" +
        req.body.response.razorpay_payment_id;

    var expectedSignature = crypto
        .createHmac("sha256", "CGgkDqWQn8f2Sp6vNwqftaXO")
        .update(body.toString())
        .digest("hex");
    // //console.log("sig received ", req.body.response.razorpay_signature);
    // //console.log("sig generated ", expectedSignature);
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
    //console.log(apikey);
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

app.post("/sendMail", async (req, res) => {
    var receiveremail = req.body.mail;
    // var phone = req.body.phone;
    var msg = req.body.message;
    var subject = req.body.subject;
    var apikey = req.cookies.apikey;
    var iid = req.body.iid;

    conn.query(
        "select * from users where apikey='" + apikey + "'",
        (err, result) => {
            if (err) return res.send(status.internalservererror());
            if (result.length > 0) {
                if (result[0].emailpasscode == "") {
                    res.send(status.badRequest());
                } else {
                    conn.query(
                        `select * from instance where instance_id = '` +
                        iid +
                        `' and  apikey = '` +
                        apikey +
                        `'`,
                        function (err, result2) {
                            if (err) return res.send(status.forbidden());
                            if (result2.length > 0) {
                                var transporter = nodemailer.createTransport({
                                    host: result[0].hostname,
                                    port: result[0].port,
                                    secure: true, // use TLS
                                    auth: {
                                        user: result[0].email,
                                        pass: result[0].emailpasscode,
                                    },
                                });

                                var mailOptions = {
                                    from: result[0].email,
                                    to: receiveremail,
                                    subject: subject,
                                    text: msg,
                                };
                                transporter.sendMail(
                                    mailOptions,
                                    function (err, info) {
                                        if (err) {
                                            //console.log(err);
                                            res.send(
                                                status.expectationFailed()
                                            );
                                        } else {
                                            console.log(
                                                "Email sent: " + info.response
                                            );
                                            res.send(status.ok());
                                        }
                                    }
                                );
                            } else {
                                res.send(status.badRequest());
                            }
                        }
                    );
                }
            }
        }
    );
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
        //console.log(e);
    }
});

app.get("/dis_template", function (req, res) {
    conn.query("select * from template", function (err, rest) {
        if (err) return //console.log(err);
        if (rest.length > 0);
        res.send(rest);
    });
});

app.post("/dis_mes", function (req, res) {
    let temp_name = req.body.temp_name;

    conn.query(
        "select * from template where temp_name='" + temp_name + "'",
        function (err, rest) {
            if (err) return //console.log(err);
            if (rest.length > 0) res.send(rest);
            else {
                conn.query(
                    "select * from cstm_template where cstm_name='" +
                    temp_name +
                    "'",
                    function (err, rest1) {
                        if (err) return //console.log(err);
                        if (rest1.length > 0) //console.log(rest1);
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
    // //console.log(msgarray);
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
    // //console.log(msgarray);
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
    // //console.log(msgarray);
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
    // //console.log(msgarray);
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
    // //console.log(msgarray);
    return msgarray;
}

app.post("/tempmsg", async function (req, res) {
    var phonearray = req.body.phonearray;
    //console.log(phonearray);
    var msg = req.body.message;
    var clientobj = req.body.clientobj;
    var selectedcol = req.body.selectedcol;
    if (req.body.type == "workflow") {
        phonearray = phonearray.split(",");
        selectedcol = selectedcol.split(",");
    }
    var indx = req.cookies.index;
    var iid = req.body.iid;
    var apikey = req.cookies.apikey;
    var token = req.body.token;
    //console.log(msg);
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
    //console.log(msgarr);
    //console.log(phonearray);
    for (let i = 0; i < clientobj.length; i++) {
        let prefix = "+91";
        let phone = phonearray[i];
        phone = prefix.concat(phone);
        let chatId = phone.substring(1) + "@c.us";

        if (await obj[indx].client.sendMessage(chatId, msgarr[i])) {
            //console.log("msg sent");
            var msgid = crypto.randomBytes(8).toString("hex");
            var msgtype = "template_bulk";
            conn.query(
                "insert into message(`msgid`,`msg`,`msg_type`,`receiver`,`instance_id`,`apikey`,`token`)        values('" +
                msgid +
                "','" +
                msgarr[i] +
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
                    //console.log("record added");
                }
            );
        }
    }
    res.send(status.ok());
});

app.post("/getChannels", (req, res) => {
    var apikey = req.cookies.apikey;
    conn.query(
        "select * from channel where apikey='" + apikey + "'",
        (err, result) => {
            if (err) return res.send(err);
            //console.log(result);
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
    var apikey = req.cookies.apikey;
    var iid = req.body.iid;

    if (req.body.type == "workflow") {
        emailarray = emailarray.split(",");
        selectedcol = selectedcol.split(",");
    }
    //console.log(clientobj);
    //console.log("selected column");
    //console.log(selectedcol);
    let msgarr;
    conn.query(
        "select * from users where apikey='" + apikey + "'",
        (err, result) => {
            if (err) return res.send(status.internalservererror());
            if (result.length > 0) {
                if (result[0].emailpasscode == "") {
                    res.send(status.badRequest());
                } else {
                    conn.query(
                        `select * from instance where apikey='${apikey}' and instance_id='${iid}'`,
                        (err, result2) => {
                            if (err)
                                return res.send(status.internalservererror());
                            if (result2.length > 0) {
                                var transporter = nodemailer.createTransport({
                                    host: result[0].hostname,
                                    port: result[0].port,
                                    secure: true, // use TLS
                                    auth: {
                                        user: result[0].email,
                                        pass: result[0].emailpasscode,
                                    },
                                });

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
                                    let receiveremail = emailarray[i];
                                    // phone = prefix.concat(phone);
                                    // let chatId = phone.substring(1) + "@c.us";
                                    var mailOptions = {
                                        from: result[0].email,
                                        to: receiveremail,
                                        subject: subject,
                                        text: msgarr[i],
                                    };

                                    transporter.sendMail(
                                        mailOptions,
                                        function (err, info) {
                                            if (err) {
                                                //console.log(err);
                                                res.send(
                                                    status.expectationFailed()
                                                );
                                            } else {
                                                console.log(
                                                    "Email sent: " +
                                                    info.response
                                                );
                                            }
                                        }
                                    );
                                }
                                res.send(status.ok());
                            } else {
                                res.send(status.badRequest());
                            }
                        }
                    );
                }
            }
        }
    );
});

app.post("/sendEmailToAll", (req, res) => {
    var clientarr = req.body.clientarr;
    var subject = req.body.subject;
    var msg = req.body.msg;
    //console.log(clientarr, subject, msg);
    var apikey = req.cookies.apikey;
    var iid = req.body.iid;
    conn.query(
        "select * from users where apikey='" + apikey + "'",
        (err, result) => {
            if (err) return res.send(status.internalservererror());
            if (result.length > 0) {
                if (result[0].emailpasscode == "") {
                    res.send(status.badRequest());
                } else {
                    conn.query(
                        `select * from instance where instance_id = '` +
                        iid +
                        `' and  apikey = '` +
                        apikey +
                        `'`,
                        function (err, result2) {
                            if (err) return res.send(status.forbidden());
                            if (result2.length > 0) {
                                var transporter = nodemailer.createTransport({
                                    host: result[0].hostname,
                                    port: result[0].port,
                                    secure: true, // use TLS
                                    auth: {
                                        user: result[0].email,
                                        pass: result[0].emailpasscode,
                                    },
                                });

                                for (let i = 0; i < clientarr.length; i++) {
                                    var mailOptions = {
                                        from: result[0].email,
                                        to: clientarr[i].email,
                                        subject: subject,
                                        text: msg,
                                    };

                                    transporter.sendMail(
                                        mailOptions,
                                        function (err, info) {
                                            if (err) {
                                                //console.log(err);
                                                res.send(
                                                    status.expectationFailed()
                                                );
                                            } else {
                                                console.log(
                                                    "Email sent: " +
                                                    info.response
                                                );
                                            }
                                        }
                                    );
                                }
                                res.send(status.ok());
                            } else {
                                res.send(status.badRequest());
                            }
                        }
                    );
                }
            }
        }
    );
});

app.post("/importContactsFromGoogle", async (req, res) => {
    var apikey = req.cookies.apikey;
    var clientarr = req.body.clients;
    //console.log(clientarr);
    var iid = req.body.iid;
    var query = "insert into contact values";
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
                "','" +
                clientarr[i].email +
                "'," +
                clientarr[i].phone +
                ",'" +
                iid +
                "'),";
        } else {
            query +=
                "('" +
                id +
                "','" +
                apikey +
                "','" +
                clientarr[i].name +
                "','" +
                clientarr[i].email +
                "'," +
                clientarr[i].phone +
                ",'" +
                iid +
                "')";
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
        //console.log(e);
    }
});

// pagination apis - error
app.post("/getBtn", (req, res) => {
    var limit = req.body.limit;
    var table = req.body.table;
    var offset = (req.body.pgno - 1) * limit;
    conn.query(
        `SELECT count(*) as cnt FROM ${table} WHERE ${req.body.paramstr}`,
        (err, results) => {
            //console.log(results);
            //res.send(results);
            var totalBtn = results[0].cnt / limit;
            res.send({ totalBtn: Math.ceil(totalBtn) });
        }
    );
});

app.get("/dis_cstm_template", function (req, res) {
    apikey = req.cookies.apikey;
    conn.query(
        "select * from cstm_template where apikey='" + apikey + "'",
        function (err, rest1) {
            if (err) return //console.log(err);
            if (rest1.length > 0)
                //res.send(rest1);
                //console.log(rest1);
                res.send(rest1);
        }
    );
});

app.post("/getDataByPage", (req, res) => {
    var limit = req.body.limit;
    var offset = (req.body.pgno - 1) * limit;
    var table = req.body.table;

    if (table == "users") {
        conn.query(
            `SELECT apikey,uname,email,phone,phoneverify,country,state,city,registrationDate,image FROM users LIMIT ${offset},${limit};`,
            (err, results) => {
                //console.log(results);
                res.send(results);
            }
        );
    } else {
        conn.query(
            `SELECT * FROM ${table} LIMIT ${offset},${limit};`,
            (err, results) => {
                //console.log(results);
                res.send(results);
            }
        );
    }
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
        //console.log(result);
        res.send(result);
    });
});

app.post("/addcontact", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            let id = crypto.randomBytes(6).toString("hex");
            conn.query(
                `insert into contact values('${id}','${apikey}','${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.iid}')`,
                (err, result) => {
                    if (err || result.affectedRows <= 0)
                        return res.send(status.internalservererror());
                    res.send(status.ok());
                }
            );
        } else res.send(status.unauthorized());
    } catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }
});

app.post("/createchannel", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const id = crypto.randomBytes(6).toString("hex");
            conn.query(
                `insert into channel values('${id}','${req.body.name}','${apikey}','${req.body.iid}')`,
                (err, result) => {
                    if (err || result.affectedRows <= 0)
                        return res.send(status.internalservererror());
                    res.send(status.created());
                }
            );
        } else res.send(status.unauthorized());
    } catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
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
        //console.log(e);
    }
});

app.post("/get-channel-contact", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const channelID = req.body.channelID;
            conn.query(
                `SELECT cc.channelID,c.contact_id,c.name,ch.channelName,c.phone,c.email FROM contact_channel cc, contact c, channel ch WHERE cc.channelID = ch.channelID AND cc.contactID = c.contact_id and cc.apikey = '${apikey}' AND cc.channelID = '${channelID}' AND cc.instance_id = '${req.body.iid}' order by c.name asc`,
                (err, result) => {
                    if (err) return res.send(status.internalservererror());
                    if (result.length == 0)
                        return res.send(status.nodatafound());
                    res.send(result);
                }
            );
        } else res.send(status.unauthorized());
    } catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }
});

app.post("/addcontact2channel", async (req, res) => {
    var apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            var contacts = req.body.contacts;
            var query = `insert into contact_channel values `;
            for (let i in contacts) {
                if (i != contacts.length - 1) {
                    query += `('${req.body.id}','${contacts[i]}','${apikey}','${req.body.iid}'),`;
                } else {
                    query += `('${req.body.id}','${contacts[i]}','${apikey}','${req.body.iid}');`;
                }
            }
            conn.query(query, (err, result) => {
                if (err || result.affectedRows <= 0)
                    return res.send(status.internalservererror());
                res.send(status.ok());
            });
        } else res.send(status.unauthorized());
    } catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }
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
        //console.log(e);
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
        //console.log(e);
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
                            if (err)
                                return res.send(status.internalservererror());
                            if (result <= 0)
                                return res.send(status.nodatafound());
                            res.send(status.ok());
                        }
                    );
                });
            } else res.send(status.nodatafound());
        } else res.send(status.unauthorized());
    } catch (e) {
        //console.log(e);
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
    //console.log(char_count(cstmmsg, "{"));
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

app.get("/instance/:id/:page", async (req, res) => {
    var page = req.params.page;
    let apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const data = {
                table: "instance",
                paramstr: `instance_id = '${req.params.id}'`,
                apikey: apikey,
            };
            tableData(data, (result) => {
                switch (result.status_code) {
                    case "404": {
                        res.send(status.nodatafound());
                        break;
                    }
                    case "500": {
                        res.send(status.internalservererror());
                        break;
                    }
                    default:{
                        if(req.query.id){
                            return res.sendFile(`${__dirname}/pages/user/${page}.html?id=${req.query.id}`);
                        }
                        else{
                            return res.sendFile(`${__dirname}/pages/user/${page}.html`);
                        }
                    }
                }
            });
        } else res.send(status.unauthorized());
    } catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }
});

app.get("/instance/:id/:page/:pageid", async (req, res) => {
    var page = req.params.page;
    let apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const data = {
                table: "instance",
                paramstr: `instance_id = '${req.params.id}'`,
                apikey: apikey,
            };
            tableData(data, (result) => {
                switch (result.status_code) {
                    case "404": {
                        res.send(status.nodatafound());
                        break;
                    }
                    case "500": {
                        res.send(status.internalservererror());
                        break;
                    }
                    default: {
                        const data = {
                            table: "workflow",
                            paramstr: `workflow_id = '${req.params.pageid}'`,
                            apikey: apikey,
                        };
                        tableData(data, (result) => {
                            switch (result.status_code) {
                                case "404": {
                                    res.send(status.nodatafound());
                                    break;
                                }
                                case "500": {
                                    res.send(status.internalservererror());
                                    break;
                                }
                                default: {
                                    res.sendFile(
                                        __dirname +
                                        "/pages/user/individualworkflow.html"
                                    );
                                }
                            }
                        });
                    }
                }
            });
        } else res.send(status.unauthorized());
    } catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }
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
        //console.log(e);
        res.send(status.unauthorized());
    }
});

app.post("/addRecord", function (req, res) {
    let table = req.body.table;

    //console.log("inside api");
    if (table == "plans") {
        conn.query(
            `insert into plans(pname,price,durationMonth,totalInstance,totalMessage,discount,plan_type) values('${req.body.pname}',${req.body.price},${req.body.duration},${req.body.instances},${req.body.messages},${req.body.discount},'${req.body.type}')`,
            (err, result) => {
                if (err) return res.send(status.internalservererror());
                if (result.affectedRows == 1) {
                    res.send(status.ok());
                } else {
                    res.send(status.internalservererror());
                }
            }
        );
    } else if (table == "template") {
        conn.query(
            `insert into template(temp_name,temp_message,userfields) values('${req.body.tname}','${req.body.message}',${req.body.userfields})`,
            (err, result) => {
                if (err) return res.send(status.internalservererror());
                if (result.affectedRows == 1) {
                    res.send(status.ok());
                } else {
                    res.send(status.internalservererror());
                }
            }
        );
    }
});

app.put("/updateData", (req, res) => {
    try {
        if (
            req.body.table == "users" &&
            req.body.paramstr.includes("password")
        ) {
            bcrypt.hash(req.body.paramstr.split("'")[1], 10, (err, hash) => {
                if (err) return res.send("err in bcrypt");
                conn.query(
                    `UPDATE ${req.body.table} SET password = '${hash}' WHERE ${req.body.condition}`,
                    (err, result) => {
                        if (err || result.affectedRows <= 0)
                            return res.send(status.internalservererror());
                        if (result <= 0) return res.send(status.nodatafound());
                        res.send(status.ok());
                    }
                );
            });
        } else {
            //console.log(req.body);
            conn.query(
                `UPDATE ${req.body.table} SET ${req.body.paramstr} WHERE ${req.body.condition}`,
                (err, result) => {
                    if (err || result.affectedRows <= 0)
                        return res.send(status.internalservererror());
                    if (result <= 0) return res.send(status.nodatafound());
                    res.send(status.ok());
                }
            );
        }
    } catch (e) {
        //console.log(e);
    }
});

app.delete("/deleterecord", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            conn.query(
                `DELETE FROM ${req.body.obj.table} WHERE ${req.body.obj.paramstr}`,
                (err, result) => {
                    if (err || result.affectedRows < 0)
                        return res.send(status.internalservererror());
                    res.send(status.ok());
                }
            );
        } else res.send(status.unauthorized());
    } catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }
});

const tableDataAdmin = (data, callback) => {
    try {
        if (data.table == "users") {
            conn.query(
                `SELECT apikey,uname,email,phone,phoneverify,country,state,city,registrationDate,image FROM users WHERE ${data.paramstr} LIMIT ${data.offset},${data.limit}`,
                (err, results) => {
                    if (err) return callback(status.internalservererror());
                    if (results.length == 0)
                        return callback(status.nodatafound());
                    return callback(results);
                }
            );
        } else {
            conn.query(
                `SELECT * FROM ${data.table} WHERE ${data.paramstr} LIMIT ${data.offset},${data.limit}`,
                (err, result) => {
                    if (err) return callback(status.internalservererror());
                    if (result.length == 0)
                        return callback(status.nodatafound());
                    return callback(result);
                }
            );
        }
    } catch (e) {
        //console.log(e);
    }
};

app.post("/adminSearchRecord", async (req, res) => {
    //console.log(req.body.table + req.body.paramstr);
    let limit = req.body.limit;
    try {
        const data = {
            table: req.body.table,
            paramstr: req.body.paramstr,
            limit: limit,
            offset: (req.body.pgno - 1) * limit,
        };
        tableDataAdmin(data, (result) => {
            //console.log(result);
            res.send(result);
        });
    } catch (e) {
        //console.log(e);
    }
});

app.post("/sendmsgchannel", function (req, res) {
    var indx = req.cookies.index;
    const apikey = req.body.apikey;
    const token = req.body.token;
    var iid = req.body.instanceid;
    let msg = req.body.msg;
    let channel_contact = req.body.channel_contact;

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
                    for (let i = 0; i < channel_contact.length; i++) {
                        let prefix = "+91";
                        let phone = channel_contact[i].phone;
                        phone = prefix.concat(phone);
                        let chatId = phone.substring(1) + "@c.us";
                        if (
                            await obj[indx].client.sendMessage(chatId, `${msg}`)
                        ) {
                            var msgid = crypto.randomBytes(8).toString("hex");
                            var msgtype = "channel";
                            conn.query(
                                "insert into message(`msgid`,`msg`,`msg_type`,`receiver`,`instance_id`,`apikey`,`token`) values('" +
                                msgid +
                                "','" +
                                msg +
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
                                    if (err)
                                        return res.send(status.forbidden());
                                    // if (result.length > 0) {

                                    // }
                                }
                            );
                        }
                    }
                } catch (e) {
                    //console.log(e);
                    res.send({
                        error: "client is not initialized",
                    });
                }
            }
        }
    );
    res.send({ error: null });
});

app.get("/getemail", function (req, res) {
    let apikey = req.cookies.apikey;
    conn.query(
        "select * from users where apikey='" + apikey + "'",
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        }
    );
});

app.post("/updatePasscode", (req, res) => {
    // let passcode = req.body.passcode;
    //console.log(passcode);
    var query;
    if (req.body.emailtype == "gmail") {
        query =
            "update users set emailpasscode='" +
            passcode +
            "' where apikey='" +
            req.cookies.apikey +
            "'";
    } else {
        query = `update users set emailpasscode='
      ${passcode}',hostname='${req.body.hostname}',port=${req.body.port} where apikey='${req.cookies.apikey}'`;
    }
    conn.query(query, (err, result) => {
        if (err) return res.send(status.internalservererror());
        //console.log(result);
        if (result.affectedRows == 1) {
            res.send(status.ok());
        } else {
            res.send(status.internalservererror());
        }
    });
});

app.post("/getData", async (req, res) => {
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
        //console.log(e);
    }
});

app.post("/sendEnquiry", function (req, res) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dashboardcrm.2022@gmail.com",
            pass: "dbwtdfmwrxmwzcat",
        },
    });
    var mailOptions = {
        from: "dashboardcrm.2022@gmail.com",
        to: "dashboardcrm.2022@gmail.com",
        subject: req.body.subject,
        html:
            "User Email : " +
            req.body.email +
            "<br>Message : " +
            req.body.message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            //console.log(error);
            res.send(status.badRequest());
        } else {
            //console.log("Email sent: " + info.response);
            res.send(status.ok());
        }
    });
});

app.post("/card", function (req, res) {
    var table = req.body.table;
    var paramstr = req.body.paramstr;
    conn.query(
        `select count(*) as cnt from ${table} where ${paramstr}`,
        (err, result) => {
            if (err) return res.send(err);
            if (result.length > 0) {
                res.send(result);
            }
        }
    );
});

app.post("/distinct", function (req, res) {
    var column = req.body.column;
    var table = req.body.table;
    conn.query(`select distinct(${column}) from ${table}`, (err, result) => {
        if (err) return res.send(err);
        if (result.length > 0) {
            res.send(result);
        }
    });
});

app.post("/monthlyreport", function (req, res) {
    let month = req.body.month;
    let year = req.body.year;
    conn.query(
        `SELECT count(*) as cnt FROM users WHERE MONTH(registrationDate) = ${month} AND YEAR(registrationDate)=${year}`,
        (err, result) => {
            //console.log(result);
            if (err) return res.send(err);
            if (result.length > 0) {
                res.send(result);
            }
        }
    );
});

app.post("/instancereport", function (req, res) {
    let month = req.body.month;
    let year = req.body.year;
    conn.query(
        `SELECT count(*) as cnt FROM instance WHERE MONTH(create_date) = ${month} AND YEAR(create_date)=${year}`,
        (err, result) => {
            //console.log(result);
            if (err) return res.send(err);
            if (result.length > 0) {
                res.send(result);
            }
        }
    );
});

//msgcount chart
app.get("/messagecount", (req, res) => {
    (msgcount = 0), (imgcount = 0), (channelcount = 0), (bulkcount = 0);
    conn.query("SELECT msg_type,msgid FROM message", (err, result) => {
        if (err) {
            //console.log(err);
        }
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                if (result[i].msg_type == "msg") {
                    msgcount++;
                } else if (result[i].msg_type == "custom_bulk") {
                    imgcount++;
                } else if (result[i].msg_type == "template_bulk") {
                    bulkcount++;
                } else if (result[i].msg_type == "channel") {
                    channelcount++;
                }
                // //console.log(msgcount + " " + imgcount + " " + bulkcount);
            }
            var obj = {
                msg: msgcount,
                img: imgcount,
                bulk: bulkcount,
                channel: channelcount,
            };
            // //console.log(obj);
            res.send(obj);
        }
    });
});

//user wise plan subscription
app.get("/usersubscription", (req, res) => {
    conn.query(
        "SELECT planID,count(*) as cnt from subscription GROUP BY planID",
        (err, result) => {
            //console.log(result);
            if (err) return res.send(err);
            if (result.length > 0) {
                res.send(result);
            }
        }
    );
});

app.post("/getTickets", (req, res) => {
    try {
        const data = {
            table: req.body.obj.table,
            paramstr: req.body.obj.paramstr,
        };
        tableData(data, (result) => {
            res.send(result);
        });
    } catch (e) {
        //console.log(e);
    }
});

app.post("/getUserMessages", async (req, res) => {
    let indx = req.body.index;
    console.log(obj[indx].client.getState().then((state) => {
        console.log(state);
    }));
    obj[indx].client.getChats().then((chats) => {
        // Loop through the chats to find the desired chat
        for (const chat of chats) {
            const phoneNumber = req.body.phone; // replace with actual phone number
            if (chat.id._serialized === `91${phoneNumber}@c.us`) {
                console.log(
                    `Chat ID for "${chat.name}": ${chat.id._serialized}`
                );
                chat.fetchMessages({ limit: 50 }).then((messages) => {
                    let usermessages = new Array();
                    for (let i = 0; i < messages.length; i++) {
                        if (messages[i].type == "chat") {
                            usermessages.push({
                                msg: messages[i].body,
                                fromMe: messages[i].fromMe,
                                timestamp: messages[i].timestamp,
                            });
                        }
                    }
                    res.send(usermessages);
                });
            }
        }
    });
});

app.post("/sendDirectMessage", (req, res) => {
    let indx = req.cookies.index;
    let chatId = `91${req.body.phone}@c.us`;
    let message = req.body.message;
    let apikey = req.cookies.apikey;
    //console.log(req.body);

    if (obj[indx].client.sendMessage(chatId, message)) {
        var msgid = crypto.randomBytes(8).toString("hex");
        var msgtype = "msg";
        conn.query(
            "insert into message(`msgid`,`msg`,`msg_type`,`receiver`,`apikey`)        values('" +
            msgid +
            "','" +
            message +
            "','" +
            msgtype +
            "','" +
            chatId +
            "','" +
            apikey +
            "')",
            function (err, result, fields) {
                if (err) return res.send(status.forbidden());
                res.send(status.ok());
            }
        );
    } else {
        //console.log(status.expectationFailed());
        //console.log(status.userNotValid());
        res.send(status.userNotValid());
    }
});

app.post("/checkoldpwd", async function (req, res) {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            tableData(
                {
                    table: "users",
                    paramstr: true,
                    apikey: apikey,
                },
                (result) => {
                    bcrypt.compare(
                        req.body.oldpwd,
                        result[0].password,
                        (err, match) => {
                            if (match) {
                                return res.send(status.ok());
                            } else {
                                return res.send(status.notAccepted());
                            }
                        }
                    );
                }
            );
        } else res.send(status.unauthorized());
    } catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }
});

let supportclient = new Array();

app.get("/supportqr", async (req, res) => {
    let ind = 0;
    ind = supportclient.length;
    // //console.log(ind);
    res.cookie("sindex", ind);
    supportclient[ind] = new clients();
    await supportclient[ind].client.on("qr", (qr) => {
        //console.log(qr);
        res.send(qr);
    });
});

app.get("/supportauthenticated/:index", async function (req, res) {
    let indx = req.params.index;
    //console.log(indx);
    //console.log("inside authenticated");

    await supportclient[indx].client.on("authenticated", async (req, resp) => {
        //console.log("Client is authenticated!");
        res.send(status.ok());
    });
});

app.get("/supportdisconnected/:index", async (req, res) => {
    let ind = req.params.index;
    if (ind && iid) {
        try {
            supportclient[ind].disconnect().then(() => {
                res.send(status.ok());
            });
        } catch (e) {
            //console.log(e);
        }
    }
});

app.post("/replyToTicket", (req, res) => {
    let id = req.body.id,
        category = req.body.category,
        type = req.body.type,
        subject = req.body.subject,
        description = req.body.description,
        tstatus = req.body.status,
        uname = req.body.uname,
        contact = req.body.contact,
        response = req.body.response;
    if (category == "whatsapp") {
        let sindex = req.cookies.sindex;
        let prefix = "+91";
        contact = prefix.concat(contact);
        let chatId = contact.substring(1) + "@c.us";
        supportclient[sindex].client
            .sendMessage(
                chatId,
                `Hello ${uname}\n\nFor query #${id} ${subject}\nresponse\n\nAnswer : ${response}`
            )
            .then(() => {
                conn.query(
                    `insert into ticket_reply(ticket_id,reply) values('${id}','${response}')`,
                    (err, result) => {
                        if (err) {
                            //console.log(err);
                            res.send(status.internalservererror());
                        }
                        if (result.affectedRows == 1) {
                            conn.query(
                                `update support_ticket set status='inprogress' where ticket_id='${id}'`,
                                (err2, result2) => {
                                    if (err2) {
                                        //console.log(err2);
                                        res.send(status.internalservererror());
                                    }
                                    if (result2.affectedRows == 1) {
                                        res.send(status.ok());
                                    } else {
                                        res.send(status.expectationFailed());
                                    }
                                }
                            );
                        } else {
                            res.send(status.expectationFailed());
                        }
                    }
                );
            });
    } else if (category == "email") {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "dashboardcrm.2022@gmail.com",
                pass: "dbwtdfmwrxmwzcat",
            },
        });
        var mailOptions = {
            from: "dashboardcrm.2022@gmail.com",
            to: contact,
            subject: "Reply of your Ticket " + id,
            html: `<div><b>Hello ${uname}</b><br>Your Query : #${id} ${subject}<br>${description}<br><br>Answer: <b>${response}</b></div>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                //console.log(error);
                res.send(status.badRequest());
            } else {
                //console.log("Email sent: " + info.response);
                conn.query(
                    `insert into ticket_reply(ticket_id,reply) values('${id}','${response}')`,
                    (err, result) => {
                        if (err) {
                            //console.log(err);
                            res.send(status.internalservererror());
                        }
                        if (result.affectedRows == 1) {
                            conn.query(
                                `update support_ticket set status='inprogress' where ticket_id='${id}'`,
                                (err2, result2) => {
                                    if (err2) {
                                        //console.log(err2);
                                        res.send(status.internalservererror());
                                    }
                                    if (result2.affectedRows == 1) {
                                        res.send(status.ok());
                                    } else {
                                        res.send(status.expectationFailed());
                                    }
                                }
                            );
                        } else {
                            res.send(status.expectationFailed());
                        }
                    }
                );
            }
        });
    }
});

app.post("/addticket", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {

        } else res.send(status.unauthorized());
    } catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }


    let email = req.body.email;
    let subject = req.body.subject;
    let t_type = req.body.t_type;
    let description = req.body.description;

    conn.query(`INSERT INTO support_ticket(ticket_id,category,user,t_subject,t_type,t_description,apikey) VALUES ('${prefixedString}','email','${email}','${subject}','${t_type}','${description}','${apikey}')`,
        (err, resp) => {
            if (err) console.log(err);
            if (resp) {
                res.send(status.ok());
            } else {
                res.send(status.badRequest());
            }
        }
    );
});

app.post("/createWorkflow", (req, res) => {
    let wid = crypto.randomBytes(16).toString("hex");
    let wname = req.body.wname;
    let iid = req.body.iid;
    //console.log(wname + wid);
    conn.query(
        `insert into workflow(workflow_id,workflow_name,apikey,instance_id) values('${wid}','${wname}','${req.cookies.apikey}','${iid}')`,
        (err, result) => {
            //console.log(result);
            if (err) return res.send(status.internalservererror());
            if (result.affectedRows == 1) {
                res.send(status.ok());
            } else {
                res.send(status.internalservererror());
            }
        }
    );
});

app.post("/insertWorkflowApi", (req, res) => {
    let wfid = req.body.wfid;
    let wfname = req.body.wfname;
    let api_name = req.body.api_name;
    let index_no = req.body.index_no;
    let body_data = req.body.body_data;
    let apikey = req.body.apikey;
    let instance_id = req.body.instance_id;
    //console.log(req.body);

    conn.query(
        `insert into workflow values('${wfid}','${wfname}','${api_name}',${index_no},'${body_data}','${apikey}','${instance_id}')`,
        (err, result) => {
            if (err) return res.send(status.internalservererror());
            if (result.affectedRows == 1) {
                res.send(status.ok());
            } else {
                res.send(status.internalservererror());
            }
        }
    );
});

app.post("/deleteRecord", (req, res) => {
    conn.query(
        `delete from ${req.body.table} where ${req.body.column}='${req.body.id}'`,
        (err, result) => {
            if (err) return res.send(status.internalservererror());
            if (result.affectedRows == 1) {
                res.send(status.ok());
            } else {
                res.send(status.expectationFailed());
            }
        }
    );
});