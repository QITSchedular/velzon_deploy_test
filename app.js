require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const fileUpload = require("express-fileupload");
const csvtojson = require("csvtojson");

const bcrypt = require('bcrypt');
const app = express();
const router = require("./assets/js/route");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const requ = require("request").defaults({ rejectUnauthorized: false }); //for passing headers
const nodemailer = require("nodemailer");
const passport = require('passport');
const country = require("country-list-with-dial-code-and-flag");
const status = require("./assets/js/status");
const jwt = require("jsonwebtoken");
const cron = require('node-cron');
const path = require('path');

const fs = require("fs");
const cloudinary = require('cloudinary').v2;
const Razorpay = require("razorpay");
const crypto = require("crypto");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { Client, MessageMedia, LocalAuth } = require("whatsapp-web.js");

let obj = [], apikey, userProfile;

const SESSION_FILE_PATH = './assets/json/session-data.json';

// const conn = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

const conn = mysql.createConnection({
    host: 'm3-db.cpqpqooy9dzn.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'M3passb4u#0',
    database: 'qrdb',
})
conn.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
})

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sakshiiit232@gmail.com",
        pass: "pzpjmrggsmvmdmym",
    },
});

cloudinary.config({
    cloud_name: "do6cd8c3p",
    api_key: "589267637882559",
    api_secret: "3HypXjPtwO8Jg9Bv23hTR83kY-M"
});

let instance = new Razorpay({
    key_id: "rzp_test_HTTzrcP3gKLLEv",
    key_secret: "CGgkDqWQn8f2Sp6vNwqftaXO",
});

app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/assets", express.static("assets"));
// app.use("", express.static("assets"));
app.use(['/docs/assets', '/instance/assets', '/assets'], express.static("assets"));
app.use("/", router);

app.use(sessions({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

const port = process.env.PORT;

// const browser = puppeteer.launch({
//     executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
// });

class clients {
    client;
    constructor() {
        this.client = new Client();
        this.client.initialize();
    }

    disconnect() {
        this.client.destroy();
        this.client.initialize();
        return Promise.resolve();
    }

    async generateqr() {
        try {
            const qrPromise = new Promise((resolve) => {
                this.client.on("qr", (qr) => {
                    resolve(qr);
                });
            });

            const qr = await qrPromise;
            return Promise.resolve(qr);
        } catch (error) {
            console.error("Error generating QR code:", error);
            return Promise.reject(error);
        }
    }

    async send_whatsapp_message(chatId, message) {
        await this.client.sendMessage(chatId, message).then((messageId) => {
            console.log(messageId);
            return Promise.resolve(messageId);
        }).catch((error) => {
            console.log(error);
            return Promise.reject(error);
        })
    };

    // async send_whatsapp_message(chatId, message) {
    //     try {
    //         const messageId = await this.client.sendMessage(chatId, message);
    //         console.log(messageId)
    //         return messageId;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    async send_whatsapp_document(chatId, media) {
        await this.client.sendMessage(chatId, media).then((messageId) => {
            return Promise.resolve(messageId);
        }).catch((error) => {
            return Promise.reject(error);
        })
    }

    // async send_whatsapp_document(chatId, media) {
    //     try {
    //         const messageId = await this.client.sendMessage(chatId, media);
    //         console.log(messageId)
    //         return messageId;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    async checkAuth() {

        try {
            const authstatus = new Promise((resolve) => {
                this.client.on('ready', () => {
                    if (obj[iid].client.isLoggedIn()) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
            });

            const auth = await authstatus;
            return Promise.resolve(auth);
        } catch (error) {
            console.error("Error generating QR code:", error);
            return Promise.reject(error);
        }

        // try {
        //     return await new Promise((resolve, reject) => {

        //     });
        // } catch (error) {
        //     console.log(error);
        // }
    }

    // async checkAuth() {
    //     try {
    //         return await new Promise((resolve, reject) => {
    //             if (obj[iid].client.isLoggedIn()) {
    //                 resolve();
    //             } else {
    //                 reject();
    //             }
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}

async function checkAPIKey(apikey) {
    try {
        return await new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM users WHERE apikey = '${apikey}'`, (error, results) => {
                if (error) return reject(status.internalservererror());
                if (results.length <= 0) resolve(false);
                resolve(true);
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}

async function findEmail(apikey) {
    try {
        return await new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM users WHERE apikey = '${apikey}'`, (error, result) => {
                if (error || result.length <= 0) return reject(status.internalservererror().status_code);
                resolve(result[0].email);
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}

function setCookie(res, name, value, days) {
    res.cookie(name, value, { maxAge: 1000 * 60 * 60 * 24 * days });
}

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

const tableData = (data, callback) => {
    try {
        conn.query(`SELECT * FROM ${data.table} WHERE ${data.paramstr} AND apikey = '${data.apikey}'`,
            (err, result) => {
                if (err) return callback(status.internalservererror());
                if (result.length == 0) return callback(status.nodatafound());
                return callback(result);
            });
    }
    catch (e) {
        console.log(e);
        callback(status.internalservererror());
    }
}

async function sendEmail(to, subject, body) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dashboardcrm.2022@gmail.com",
            pass: "dbwtdfmwrxmwzcat",
        },
    });
    var mailOptions = {
        from: "sakshiiit232@gmail.com",
        to: to,
        subject: subject,
        html: body,
    };

    return await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error) {
            if (error) return reject(error);
            return resolve();
        });
    });
}

function createInstance() {
    conn.query(`select * from instance where isActive = 1`, (err, result) => {
        if (err || result.affectedRows <= 0) return console.log(status.internalservererror());
        if (result <= 0) return console.log(status.nodatafound());
        for (let i in result) {
            // obj[result[i].instance_id] = new Client(
            //     //     {
            //     //     authStrategy: new LocalAuth({ clientId: result[i].instance_id }),
            //     //     puppeteer: {
            //     //         executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
            //     //     }
            //     // }
            // );
            obj[result[i].instance_id] = "";
        }
        console.log(obj);
    });
}
// createInstance();

const CREDENTIALS = JSON.parse(fs.readFileSync("studied-theater-374912-20d31d5fcc83.json"));

passport.use(new GoogleStrategy(
    {
        clientID: "998325770347-9s0fe9oph1a8blesbtl7hkccgs69fc1h.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: `${process.env.DOMAIN}/auth/google/callback`,
    }, function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/signin" }),
    function (req, res) {
        const apikey = crypto.randomBytes(16).toString("hex");
        var Ac_name = userProfile.displayName;
        var Ac_mail = userProfile.emails[0].value;
        var Ac_image = userProfile.photos[0].value;
        conn.query(`select * from users where email = '${Ac_mail}'`,
            function (err, result) {
                if (err) return res.send(status.internalservererror());
                if (result.length > 0) {
                    setCookie(res, "apikey", result[0].apikey, 1);
                    res.redirect("/dashboard");
                }
                else {
                    conn.query(
                        `INSERT INTO users (apikey,uname,email,image)VALUES('${apikey}','${Ac_name}','${Ac_mail}','${Ac_image}')`,
                        function (err, result) {
                            if (err) return console.log(err);
                            if (result) {
                                setCookie(res, "apikey", apikey, 1);
                                res.redirect("/dashboard");
                            }
                        });
                }
            }
        );
    }
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
    var data = new Array();
    var colnames = new Array();
    var object = new Object();
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
    }
    catch (e) {
        console.log(e);
    }
});

app.post("/sendtoall", async (req, res) => {
    apikey = req.cookies.apikey;

    var indx = req.cookies.index;
    var iid = req.body.instanceid;
    var data = req.body.data;
    let token = req.body.token;

    var date_ob = new Date();
    var object, flag = 0;

    conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
        async function (err, result) {
            if (err) return res.send(status.forbidden());
            if (result.length > 0) {
                try {
                    for (let i = 0; i < data.names.length; i++) {
                        let prefix = "+91";
                        let phone = data.phones[i];
                        phone = prefix.concat(phone);
                        let chatId = phone.substring(1) + "@c.us";
                        if (await obj[indx].client.sendMessage(chatId, `Hello ${data.names[i]} how are you ? it's ${date_ob.getHours()} : ${date_ob.getMinutes()} : ${date_ob.getSeconds()}`)) {
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

app.post("/file", async (req, res) => {
    try {
        csvData = await req.files.csvfile.data.toString("utf8");
        return csvtojson().fromString(csvData).then((json) => {
            return res.status(201).json({
                csv: csvData,
                json: json
            });
        });
    }
    catch (e) {
        console.log(e);
    }
});




/*--------------------[ Mail ]--------------------*/

app.post("/sendEmailToAll", (req, res) => {
    var clientarr = req.body.clientarr;
    var subject = req.body.subject;
    var msg = req.body.msg;
    console.log(clientarr, subject, msg);
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
                                                console.log(err);
                                                res.send(status.expectationFailed());
                                            } else {
                                                console.log("Email sent: " + info.response);
                                                let id = crypto.randomBytes(8).toString("hex");
                                                let emailtype = "bulk";
                                                conn.query(`insert into email(email_id,from_email,to_email,email_type,subject,message,instance_id,apikey) values('${id}','${result[0].email}','${clientarr[i].email}','${emailtype}','${subject}','${msg}','${iid}','${apikey}')`,
                                                    (err, result3) => {
                                                        console.log(result3);
                                                        if (err)
                                                            console.log("record not added");
                                                        if (
                                                            result3.affectedRows >=
                                                            1
                                                        ) {
                                                            console.log(
                                                                "record added"
                                                            );
                                                        } else {
                                                            console.log(
                                                                "record not added"
                                                            );
                                                        }
                                                    }
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

app.post("/sendMail", async (req, res) => {
    var receiveremail = req.body.mail;
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
                                            console.log(err);
                                            res.send(
                                                status.expectationFailed()
                                            );
                                        } else {
                                            console.log(
                                                "Email sent: " + info.response
                                            );
                                            let id = crypto
                                                .randomBytes(8)
                                                .toString("hex");
                                            let emailtype = "email";
                                            conn.query(
                                                `insert into email(email_id,from_email,to_email,email_type,subject,message,instance_id,apikey) values('${id}','${result[0].email}','${receiveremail}','${emailtype}','${subject}','${msg}','${iid}','${apikey}')`,
                                                (err, result3) => {
                                                    if (err)
                                                        res.send(
                                                            status.internalservererror()
                                                        );
                                                    if (
                                                        result3.affectedRows ==
                                                        1
                                                    ) {
                                                        res.send(status.ok());
                                                    } else {
                                                        res.send(
                                                            status.badRequest()
                                                        );
                                                    }
                                                }
                                            );
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
    console.log(clientobj);
    console.log("selected column");
    console.log(selectedcol);
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
                                                console.log(err);
                                                res.send(
                                                    status.expectationFailed()
                                                );
                                            } else {
                                                console.log(
                                                    "Email sent: " +
                                                    info.response
                                                );
                                                let id = crypto
                                                    .randomBytes(8)
                                                    .toString("hex");
                                                let emailtype = "template_bulk";
                                                conn.query(
                                                    `insert into email(email_id,from_email,to_email,email_type,subject,message,instance_id,apikey) values('${id}','${result[0].email}','${receiveremail}','${emailtype}','${subject}','${msgarr[i]}','${iid}','${apikey}')`,
                                                    (err, result3) => {
                                                        if (err)
                                                            console.log(
                                                                "record not added"
                                                            );
                                                        if (
                                                            result3.affectedRows >=
                                                            1
                                                        ) {
                                                            console.log(
                                                                "record added"
                                                            );
                                                        } else {
                                                            console.log(
                                                                "record not added"
                                                            );
                                                        }
                                                    }
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

/*----------------------------------------------------------*/

/*--------------------[ User | Support ]--------------------*/

// if (fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// };
let client;
// if (fs.existsSync(SESSION_FILE_PATH)) {
//     const sessionData = fs.readFileSync(SESSION_FILE_PATH, { encoding: 'utf-8' });
//     const session = JSON.parse(sessionData);
//     client = new Client({ session });
// } else {
//     client = new Client();
// }

// Bulkmessage : QRcode Generetor API
app.get("/qr/:iid", async (req, res) => {
    let iid = req.params.iid;
    try {
        obj[iid] = new clients(
            // {
            //     authStrategy: new LocalAuth({ clientId: iid }),
            //     // puppeteer: {
            //     //     executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
            //     // }
            // }
        );
        // await obj[iid].generateqr().then(async (qr) => {
        //     res.send(qr);
        // }).catch((error) => {
        //     console.log("Error In QR Generation", error);
        //     return res.send(error);
        // });
        // return res.send(iid);
        const qrData = await obj[iid].generateqr();
        if (qrData.length < 0) {
            console.log("No qr")
        } else {
            res.send(qrData);
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }

});

// Bulkmessage : Authentication Client API
app.get("/authenticated/:iid", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            let iid = req.params.iid;

            await obj[iid].client.on("authenticated", (session) => {
                // console.log(session);
                // sessionData = JSON.stringify(session);
                // if (sessionData) {
                //     fs.writeFileSync(SESSION_FILE_PATH, sessionData);
                // }
                conn.query(`update instance set isActive = 1 where instance_id = '${iid}'`,
                    (err, result) => {
                        if (err || result.affectedRows < 1) res.send(status.internalservererror());
                        // const session_obj = { obj[iid]: session }
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

// Bulkmessage : Disconnected Client API
app.get("/disconnected/:iid", async (req, res) => {
    try {
        const iid = req.params.iid;
        obj[iid].disconnect().then(() => {
            conn.query(`update instance set isActive = 0 where instance_id = '${iid}'`,
                (err, result) => {
                    if (err || result.affectedRows < 1) res.send(status.internalservererror());
                    res.send(status.ok());
                });
        }).catch((error) => {
            console.error(`Error in dessconnecting: ${error}`);
            res.send(status.badRequest());
        });
    } catch (error) {
        console.log(error);
        res.send(status.forbidden());
    }
});

app.post("/sendToAllUsingLfile", (req, res) => {
    var indx = req.cookies.index;

    const apikey = req.body.apikey;
    const token = req.body.token;
    var iid = req.body.instanceid;

    var clientinfo = req.body.clientdata;
    var message = req.body.message;

    var object, flag = 0;

    conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
        async function (err, result) {
            if (err) return res.send(status.forbidden());
            if (result.length > 0) {
                try {
                    for (let i = 0; i < clientinfo.length; i++) {
                        let prefix = "+91";
                        let phone = clientinfo[i].phone;
                        phone = prefix.concat(phone);
                        let chatId = phone.substring(1) + "@c.us";
                        if (await obj[indx].client.sendMessage(chatId, `${message}`)) {
                            var msgid = crypto.randomBytes(8).toString("hex");
                            var msgtype = "custom_bulk";
                            conn.query(
                                "insert into message(`msgid`,`msg`,`msg_type`,`receiver`,`instance_id`,`apikey`,`token`)    values('" +
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
        });
    if (flag == 1) {
        object = {
            error: null,
        };
    }
    res.send(object);
});

app.post("/tempmsg", async function (req, res) {
    var phonearray = req.body.phonearray;
    var msg = req.body.message;
    var clientobj = req.body.clientobj;
    var selectedcol = req.body.selectedcol;
    var indx = req.cookies.index;
    var iid = req.body.iid;
    var apikey = req.cookies.apikey;
    var token = req.body.token;
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
            var msgid = crypto.randomBytes(8).toString("hex");
            var msgtype = "template_bulk";
            conn.query(`insert into message values('${msgid}','${msgarr[i]}','${msgtype}','${chatId}','${iid}','${apikey}','${token}')`,
                function (err, result, fields) {
                    if (err) return res.send(status.forbidden());
                    console.log("record added");
                });
        }
    }
    res.send(status.ok());
});

// Bulkmessage : Send Document and Image API
app.post("/sendimage", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const token = req.body.token;
            const chatId = `91${req.body.to}@c.us`;
            const iid = req.body.iid;

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());

                    createfolder(`image_data\\${apikey}\\${iid}`)
                    if (req.files && Object.keys(req.files).length !== 0) {
                        const uploadedFile = req.files.image;
                        const uploadPath = `${__dirname}/assets/upload/image_data/${apikey}/${iid}/${uploadedFile.name}`;

                        uploadedFile.mv(uploadPath, async function (err) {
                            if (err) res.send(status.badRequest());
                            let filepath = `${__dirname}/assets/upload/image_data/${apikey}/${iid}/${uploadedFile.name}`;
                            const media = MessageMedia.fromFilePath(filepath);
                            // const media = await MessageMedia.fromUrl('https://via.placeholder.com/350x150.png');
                            if (obj[iid]) {

                                obj[iid].send_whatsapp_document(chatId, media).then((messageId) => {
                                    var msgid = crypto.randomBytes(8).toString("hex");

                                    cloudinary.uploader.upload(filepath, { folder: 'M3' }).then((data) => {
                                        conn.query(`insert into message values(?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`,
                                            [msgid, data.secure_url, req.files.image.mimetype, chatId, iid, apikey, token],
                                            function (err, result) {
                                                if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                                res.send(status.ok());
                                            });
                                    }).catch((err) => {
                                        console.log(`error in storing Document on cloudnary ::::::: <${err}>`);
                                        conn.query(`insert into message values(?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`,
                                            [msgid, uploadedFile.name, req.files.image.mimetype, chatId, iid, apikey, token],
                                            function (err, result) {
                                                if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                                res.send(status.ok());
                                            });
                                    });
                                }).catch((error) => {
                                    console.error(`error in sending Document ::::::: <${error}>`);
                                    res.send(status.userNotValid());
                                });
                            }
                            else {
                                res.send(status.userNotValid());
                            }
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

// Bulkmessage : Send Message API
app.post("/sendmsg", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const token = req.body.token;
            const chatId = `91${req.body.to}@c.us`;
            const iid = req.body.iid;

            let message = req.body.message;

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                async function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());
                    if (obj[iid]) {
                        obj[iid].send_whatsapp_message(chatId, message).then((messageId) => {
                            console.log("yo", messageId)
                            var msgid = crypto.randomBytes(8).toString("hex");
                            conn.query(`insert into message values(?,?,'Single Message',?,?,?,?,CURRENT_TIMESTAMP)`,
                                [msgid, message, chatId, iid, apikey, token],
                                function (err, result) {
                                    if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                    res.send(status.ok());
                                });
                        }).catch((error) => {
                            console.log(`error in Sending Message ::::::: <${error}>`);
                            res.send(status.userNotValid());
                        })
                    }
                    else {
                        res.send(status.userNotValid());
                    }
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

// Bulkmessage : Send Message through channel API
app.post("/sendmsgchannel", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const token = req.body.token;
            const iid = req.body.iid;

            let message = req.body.message;
            let contacts = req.body.contacts.split(",");

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`, async function (err, result) {
                if (err || result.length <= 0) return res.send(status.forbidden());
                for (let i = 0; i < contacts.length; i++) {
                    const chatId = `91${contacts[i]}@c.us`;
                    let msgid = crypto.randomBytes(8).toString("hex");
                    if (obj[iid]) {

                        obj[iid].send_whatsapp_message(chatId, message).then((messageId) => {
                            conn.query(
                                `insert into message values(?,?,'Bulk Message channel',?,?,?,?,CURRENT_TIMESTAMP)`,
                                [msgid, message, chatId, iid, apikey, token],
                                function (err, result) {
                                    if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                    if (i === contacts.length - 1) return res.send(status.ok());
                                });
                        }).catch((error) => {
                            console.log(`error in Sending Bulk Message to Channel ::::::: <${error}>`);
                            res.send(status.userNotValid());
                        })
                    }
                    else {
                        res.send(status.userNotValid());
                    }
                }
            });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

// console.log(obj);
app.post('/schedule', async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const iid = req.body.iid;
            const token = req.body.token;
            const time = req.body.time;
            const schedule_id = `sh_${crypto.randomBytes(6).toString("hex")}`;
            const to = await findEmail(apikey);
            const subject = `Regarding your Schedule Message on M3`;

            let contacts = req.body.contacts_list;
            console.log(req.body);
            console.log(contacts);

            // let time = `${minute + 1} ${hour} ${date} ${month + 1} *`;
            // console.log("time", `[${time}]`);
            // console.log("token", token);
            // console.log("contacts", contacts);
            // console.log("type", req.body.type);

            // console.log(iid, apikey, token);

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                async function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());
                    try {
                        switch (req.body.type) {
                            case 'message': {
                                let data = {
                                    "api": "/sendmsg",
                                    "body": req.body.message,
                                    "contacts": contacts
                                }, message = req.body.message;
                                const task = cron.schedule(time, () => {

                                    // console.log("0", iid);
                                    // console.log("0", token);
                                    // console.log("0", contacts);
                                    // console.log("0", req.body.type);
                                    for (let i = 0; i < contacts.length; i++) {
                                        console.log(contacts.length, contacts);
                                        const chatId = `91${contacts[i]}@c.us`;

                                        console.log("1", iid);
                                        console.log("1", token);
                                        console.log("1", contacts);
                                        console.log("1", req.body.type);
                                        if (obj[iid]) {
                                            obj[iid].send_whatsapp_message(chatId, message).then((messageId) => {
                                                console.log("2", iid);
                                                console.log("2", token);
                                                console.log("2", contacts);
                                                console.log("2", req.body.type);
                                                let msgid = crypto.randomBytes(8).toString("hex");
                                                conn.query(`insert into message values(?,?,'Schedule Single Message',?,?,?,?,CURRENT_TIMESTAMP)`,
                                                    [msgid, message, chatId, iid, apikey, token],
                                                    function (err, result) {
                                                        // console.log("3", iid);
                                                        // console.log("3", token);
                                                        // console.log("3", contacts);
                                                        // console.log("3", req.body.type);
                                                        if (err || result.affectedRows < 1) return status.internalservererror();
                                                        if (i === contacts.length - 1) {
                                                            // console.log("4", iid);
                                                            // console.log("4", token);
                                                            // console.log("4", contacts);
                                                            // console.log("4", req.body.type);
                                                            // task.stop();
                                                            conn.query(`update schedule set status = ? where schedule_id = ?`, [`DONE`, schedule_id],
                                                                function (err, result) {
                                                                    console.log("5", iid);
                                                                    console.log("5", token);
                                                                    console.log("5", contacts);
                                                                    console.log("5", req.body.type);
                                                                    if (err || result.affectedRows < 1) return console.log(status.internalservererror());
                                                                    let body = "Your scheduled task has completed without any error.";
                                                                    sendEmail(to, subject, body).then(() => {
                                                                        console.log("6", iid);
                                                                        console.log("6", token);
                                                                        console.log("6", contacts);
                                                                        console.log("6", req.body.type);
                                                                        return console.log("Email Sent Scuuessfully");
                                                                    }).catch((error) => {
                                                                        return console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                                                    })
                                                                });
                                                        }
                                                    });
                                            }).catch((error) => {
                                                console.log(`error in Sending schedule Message ::::::: <${error}>`);
                                                conn.query(`update schedule set status = ? where schedule_id = ?`, [`ERROR`, schedule_id],
                                                    function (err, result) {
                                                        if (err || result.affectedRows < 1) return console.log(status.internalservererror());
                                                        let body = `Your scheduled task has not completed due to : ${error}`;
                                                        sendEmail(to, subject, body).then(() => {
                                                            return console.log("Email Sent Scuuessfully");
                                                        }).catch((error) => {
                                                            return console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                                        })
                                                    });
                                            })
                                        }
                                        else {
                                            // res.send(status.userNotValid());
                                            console.log("no iid found");
                                        }
                                    }
                                }, { scheduled: true, timezone: 'Asia/Kolkata' });
                                task.start();
                                conn.query(`insert into schedule values(?,?,?,?,?,?)`, [schedule_id, JSON.stringify(data), time, `PENDING`, apikey, iid],
                                    function (err, result) {
                                        if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                        return res.send(status.ok());
                                    });
                                break;
                            }

                            case 'document': {
                                createfolder(`image_data\\${apikey}\\${iid}`);

                                if (req.files && Object.keys(req.files).length !== 0) {
                                    const uploadedFile = req.files.image;
                                    const uploadPath = `${__dirname}/assets/upload/image_data/${apikey}/${iid}/${uploadedFile.name}`;

                                    // console.log(contacts.length, contacts);

                                    uploadedFile.mv(uploadPath, async function (err) {
                                        if (err) res.send(status.badRequest());
                                        let filepath = `${__dirname}/assets/upload/image_data/${apikey}/${iid}/${uploadedFile.name}`;
                                        const media = MessageMedia.fromFilePath(filepath);
                                        let data = {
                                            "api": "/sendmsg",
                                            "body": media,
                                            "contacts": contacts
                                        };
                                        const task = cron.schedule(time, async () => {
                                            let filepath = `${__dirname}/assets/upload/image_data/${apikey}/${iid}/${uploadedFile.name}`;
                                            // console.log(contacts.length, contacts);
                                            for (let i = 0; i < contacts.length; i++) {
                                                const chatId = `91${contacts[i]}@c.us`;
                                                if (obj[iid]) {
                                                    await obj[iid].send_whatsapp_document(chatId, media).then((messageId) => {
                                                        var msgid = crypto.randomBytes(8).toString("hex");

                                                        cloudinary.uploader.upload(filepath, { folder: 'M3' }).then((data) => {
                                                            conn.query(`insert into message values(?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`,
                                                                [msgid, data.secure_url, req.files.image.mimetype, chatId, iid, apikey, token],
                                                                function (err, result) {
                                                                    if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                                                    if (i === contacts.length - 1) {
                                                                        task.stop();
                                                                        conn.query(`update schedule set status = ? where schedule_id = ?`, [`DONE`, schedule_id],
                                                                            function (err, result) {
                                                                                if (err || result.affectedRows < 1) return console.log(status.internalservererror());
                                                                                let body = "Your scheduled task has completed without any error.";
                                                                                sendEmail(to, subject, body).then(() => {
                                                                                    return console.log("Email Sent Scuuessfully");
                                                                                }).catch((error) => {
                                                                                    return console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                                                                })
                                                                            });
                                                                    }
                                                                });
                                                        }).catch((err) => {
                                                            console.log(`error in storing Document on cloudnary ::::::: <${err}>`);
                                                            conn.query(`insert into message values(?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`,
                                                                [msgid, uploadedFile.name, req.files.image.mimetype, chatId, iid, apikey, token],
                                                                function (err, result) {
                                                                    if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                                                    if (i === contacts.length - 1) {
                                                                        let body = "Your scheduled task has completed without any error.";
                                                                        sendEmail(to, subject, body).then(() => {
                                                                            console.log("Email Sent Scuuessfully");
                                                                        }).catch((error) => {
                                                                            console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                                                        })
                                                                    }
                                                                });
                                                        });
                                                    }).catch((error) => {
                                                        console.error(`error in sending Document ::::::: <${error}>`);
                                                        conn.query(`update schedule set status = ? where schedule_id = ?`, [`ERROR`, schedule_id],
                                                            function (err, result) {
                                                                if (err || result.affectedRows < 1) return console.log(status.internalservererror());
                                                                let body = `Your scheduled task has not completed due to : ${error}`;
                                                                sendEmail(to, subject, body).then(() => {
                                                                    return console.log("Email Sent Scuuessfully");
                                                                }).catch((error) => {
                                                                    return console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                                                })
                                                            });
                                                    });
                                                }
                                                else {
                                                    console.log("no iid found");
                                                    // conn.query(`update schedule set status = ? where schedule_id = ?`, [`ERROR`, schedule_id],
                                                    //     function (err, result) {
                                                    //         if (err || result.affectedRows < 1) return console.log(status.internalservererror());
                                                    //         let body = `Your scheduled task has not completed due to : disconnected instance.`;
                                                    //         sendEmail(to, subject, body).then(() => {
                                                    //             return console.log("Email Sent Scuuessfully");
                                                    //         }).catch((error) => {
                                                    //             return console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                                    //         })
                                                    //     });
                                                }
                                            }
                                        }, { scheduled: false, timezone: 'Asia/Kolkata' });
                                        task.start();
                                        conn.query(`insert into schedule values(?,?,?,?,?,?)`, [schedule_id, JSON.stringify(data), time, `PENDING`, apikey, iid],
                                            function (err, result) {
                                                if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                                return res.send(status.ok());
                                            });
                                    });
                                }
                                break;
                            }
                        }
                    } catch (error) {
                        console.log(`Failed to schedule message: ${error}`);
                        return res.send(status.expectationFailed());
                    }
                });
        } else return res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
})

app.get("/checkauth/:iid", (req, res) => {
    if (obj[req.params.iid]) {
        obj[req.params.iid].checkAuth().then(() => {
            console.log("Ready");
        }).catch(() => {
            console.log("Not Ready");
        })
    }
    else {
        console.log("iid not found");
    }
});


/*----------------------------------------------------------*/

app.post("/sendEmailVerification", (req, res) => {
    var email = req.body.email;
    const token = jwt.sign({
        data: "Token Data",
    },
        "ourSecretKey",
        {
            expiresIn: "5m"
        }
    );
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dashboardcrm.2022@gmail.com",
            pass: "dbwtdfmwrxmwzcat",
        },
    });
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

app.post("/adduser", (req, res) => {
    const id = crypto.randomBytes(16).toString("hex");

    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const country = req.body.country;
    const state = req.body.state;
    const city = req.body.city;

    if (name && phone && email && password && country && state && name != undefined && phone != undefined && email != undefined && password != undefined && country != undefined && state != undefined) {
        conn.query("SELECT * FROM users WHERE email='" + email + "'",
            function (err, result) {
                if (err) return res.send(status.internalservererror());
                if (result.length > 0) return res.send(status.duplicateRecord());
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) return res.send("err in bcrypt");
                    conn.query(
                        `INSERT INTO users VALUES('${id}','${name}','${email}','${hash}','${phone}',false,'${country}','${state}','${city}',CURRENT_DATE,NULL)`,
                        function (err, result) {
                            res.clearCookie("everify");
                            if (err) return res.send(status.internalservererror());
                            if (result.affectedRows == 0) return res.send(status.internalservererror());
                            return res.send(status.ok());
                        });
                });
            });
    } else {
        res.send(status.badRequest());
    }
});

app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const rememberme = req.body.rememberme;

    if (email && password && email != undefined && password != undefined) {

        tableData({
            table: req.body.type,
            paramstr: `email = '${email}' --`,
            apikey: apikey,
        }, (result) => {
            if (result.status_code == 500) return res.send(status.internalservererror());
            if (result.status_code == 404) return res.send(status.unauthorized());
            if (result.length > 1) return res.send(status.duplicateRecord());
            bcrypt.compare(password, result[0].password, (err, match) => {
                if (match) {
                    setCookie(res, "apikey", result[0].apikey, 1);
                    if (rememberme == "true") {
                        res.cookie("email", email, { maxAge: 1000 * 60 * 60 * 24 * 15 });
                    }

                    res.send(status.ok());
                } else {
                    console.log("do not Match");
                    return res.send(status.unauthorized());
                }
            });
        })
    }
    else {
        return res.send(status.badRequest());
    }
});

app.post("/getUserMessages", async (req, res) => {
    let iid = req.body.iid;

    obj[iid].client.getChats().then((chats) => {
        for (const chat of chats) {
            if (chat.id._serialized === `91${req.body.phone}@c.us`) {
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
    }).catch((error) => {
        res.send(status.nodatafound());
    });
});

app.get("/refreshtoken/:iid", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            let token = crypto.randomBytes(10).toString("hex");
            let iid = req.params.iid;
            conn.query(`UPDATE instance SET token = '${token}' where apikey = '${apikey}' and instance_id = '${iid}'`,
                function (err) {
                    if (err) console.log(err);
                    res.send(token);
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

app.get('/message_summary', async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            conn.query(`SELECT m.instance_id,i.i_name,COUNT(CASE WHEN m.msg_type = 'image' THEN 1 END) AS image_count,COUNT(CASE WHEN m.msg_type = 'Schedule Single Mess' THEN 1 END) AS schedule_single_count,COUNT(CASE WHEN m.msg_type = 'bulk through channel' THEN 1 END) AS bulk_through_channel_count FROM message m JOIN instance i ON m.instance_id = i.instance_id GROUP BY m.apikey, m.instance_id, i.i_name having apikey = '${apikey}'`, function (err, result) {
                if (err) return res.send(status.internalservererror());
                if (result.length <= 0) return res.send(status.nodatafound());
                res.send(result);
            })
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
})

app.get("/msg_record", async (req, res) => {
    apikey = req.cookies.apikey;

    var data = new Array();
    var abc = new Array();
    var countobj;

    try {
        conn.query(`SELECT apikey, COUNT(CASE WHEN msg_type = 'image' THEN 1 END) AS image_count, COUNT(CASE WHEN msg_type = 'msg' THEN 1 END) AS msg_count, COUNT(CASE WHEN msg_type = 'bulk through channel' THEN 1 END) AS bulk_count, COUNT(CASE WHEN msg_type = 'Schedule Single Mess' THEN 1 END) AS single_schedule_count FROM message GROUP BY apikey HAVING apikey = '${apikey}';`,
            function (err, rslt) {
                if (err) return console.log(err);
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

app.get("/getmsgtypes/:iid", (req, res) => {
    let msgcount = 0,
        imgcount = 0,
        bulkcount = 0;
    let iid = req.params.iid;
    (msgcount = 0), (imgcount = 0), (bulkcount = 0);
    conn.query("SELECT msg_type,msgid FROM message WHERE instance_id='" + iid + "'",
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
                }
                var obj = { msg: msgcount, img: imgcount, bulk: bulkcount };
                res.send(obj);
            }
        }
    );
});

app.post("/addinstance", async (req, res) => {
    var token = crypto.randomBytes(10).toString("hex");
    var instanceid = crypto.randomBytes(8).toString("hex");
    var instance_name = req.body.instance_name;
    apikey = req.cookies.apikey;

    function create(id, name, apikey, token) {
        tableData({
            table: "instance",
            paramstr: `(i_name = '${name}')`,
            apikey: apikey,
        }, (result) => {
            if (result.status_code == 404) {
                conn.query(`INSERT INTO instance values('${id}','${name}','${apikey}','${token}',CURRENT_DATE,0)`,
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
                    var latest = new Date(result[0].pay_date), current_date = new Date();
                    var planID = result[0].planID;
                    let total_instance = 0, duration = 0, remaining_days = 0;
                    for (var i in result) {
                        if (latest < new Date(result[i].pay_date)) {
                            latest = new Date(result[i].pay_date);
                            planID = result[i].planID;
                        }
                    }

                    tableData({
                        table: "plans",
                        paramstr: `planid = ${planID} --`,
                        apikey: apikey,
                    }, (result) => {
                        total_instance = result[0].totalInstance;
                        duration = result[0].durationMonth;
                        latest.setMonth(latest.getMonth() + duration);
                        remaining_days = Math.ceil(Math.round(latest - current_date) / (1000 * 60 * 60 * 24));

                        console.log(latest, total_instance);
                        if (remaining_days > 0) {
                            tableData({
                                table: "instance",
                                paramstr: true,
                                apikey: apikey
                            }, (result) => {
                                if (result.length >= total_instance) return res.send(status.forbidden());
                                create(instanceid, instance_name, apikey, token);
                            })
                        }
                        else {
                            res.send(status.forbidden());
                        }
                    })
                }
            });
        } else res.send(status.unauthorized());
    } catch (error) {
        console.log(error);
        res.send(status.unauthorized(), error);
    }
});

app.get("/get_phone_code", (req, res) => {
    var country_obj = country.getList();
    res.send(country_obj);
})

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
            conn.query(`SELECT * FROM users WHERE apikey = '${apikey}'`,
                function (err, result) {
                    if (err) return res.send(status.internalservererror());
                    if (result <= 0) return res.send(status.nodatafound());
                    if (result[0].phone != phone) {
                        sql = `UPDATE users SET uname = '${name}', phone = '${phone}', email = '${email}', country = '${country}', state = '${state}', city = '${city}', phoneverify = false WHERE apikey = '${apikey}'`;
                    }
                    else {
                        sql = `UPDATE users SET uname = '${name}', phone = '${phone}', email = '${email}', country = '${country}', state = '${state}', city = '${city}' WHERE apikey = '${apikey}'`;
                    }
                    conn.query(sql, function (err, result) {
                        if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                        if (result <= 0) return res.send(status.nodatafound());
                        res.send(status.ok());
                    });
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
})

app.put("/phoneverify", async (req, res) => {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);

    try {
        if (isValidapikey) {
            conn.query(`UPDATE users SET phoneverify = true WHERE apikey = '${apikey}'`,
                function (err, result) {
                    if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                    if (result <= 0) return res.send(status.nodatafound());
                    res.send(status.ok());
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
})

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
                    if (err) return res.send(status.badRequest());
                    conn.query(`UPDATE users SET image = '${uploadedFile.name}' WHERE apikey = '${apikey}'`,
                        function (err, result) {
                            if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                            res.send(status.ok());
                        });
                });
            }
            else return res.send(status.nodatafound());
        }
        else return res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
    }
})

app.get("/userinfo", async (req, res) => {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const data = {
                table: "users",
                paramstr: true,
                apikey: apikey
            }
            tableData(data, (result) => {

                res.send(result);
            });
        } else res.send(status.internalservererror().status_code);
    }
    catch (e) {
        console.log(e);
    }
});

app.get("/get-landingpage-data", (req, res) => {
    try {
        conn.query(`SELECT COUNT(*) AS total FROM users UNION ALL SELECT COUNT(*) FROM instance UNION ALL SELECT COUNT(*) FROM message`,
            (err, result) => {
                if (err) return res.send(err);
                if (result.length > 0) {
                    res.send(result);
                }
            })
    }
    catch (e) {
        console.log(e);
    }
});

app.post("/sendTemplateBulkMail", async (req, res) => {
    console.log("send_template");
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
    console.log("send_gsheet");
    var clientarr = req.body.clientarr;
    var subject = req.body.subject;
    var msg = req.body.msg;
    let email_array = new Array();
    const data = {
        table: "users",
        paramstr: true,
        apikey: apikey
    }
    tableData(data, (result) => {

        for (let i = 0; i < clientarr.length; i++) {
            email_array.push(clientarr[i].email);
        }
        var mailOptions = {
            from: "gajjarharah1104@gmail.com",
            to: email_array,
            subject: subject,
            text: msg,
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) return res.send(status.expectationFailed());
            console.log("Email sent: " + info.response);
            res.send(status.ok());
        });
    });
});

app.get("/getPlans", function (req, res) {
    const data = {
        table: "plans",
        paramstr: "true; --"
    }
    tableData(data, (result) => {
        res.send(result);
    });
});

app.get("/dis_template", function (req, res) {
    const data = {
        table: "template",
        paramstr: "true; --"
    }
    tableData(data, (result) => {
        res.send(result);
    });
});

app.get("/dis_user", function (req, res) {
    const data = {
        table: "users",
        paramstr: "true; --",
    }
    tableData(data, (result) => {
        console.log(result);
        res.send(result);
    });
});

app.post("/dis_mes", function (req, res) {
    let temp_name = req.body.temp_name;
    const data = {
        table: "template",
        paramstr: `temp_name = ${temp_name}`,
    }
    tableData(data, (result) => {
        console.log(result);
        res.send(result);
    });
});

// Common UPDATE API
app.put("/updateData", (req, res) => {
    try {
        if (req.body.table == "users" && req.body.paramstr.includes("password")) {
            bcrypt.hash(req.body.paramstr.split('\'')[1], 10, (err, hash) => {
                if (err) return res.send("err in bcrypt");
                conn.query(`UPDATE ${req.body.table} SET password = '${hash}' WHERE ${req.body.condition}`,
                    (err, result) => {
                        if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                        if (result <= 0) return res.send(status.nodatafound());
                        res.send(status.ok());
                    })
            });
        }
        else {
            conn.query(`UPDATE ${req.body.table} SET ${req.body.paramstr} WHERE ${req.body.condition}`,
                (err, result) => {
                    if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                    if (result <= 0) return res.send(status.nodatafound());
                    res.send(status.ok());
                })
        }
    }
    catch (e) {
        console.log(e);
    }
});

// Common DELETE API
app.delete("/deleterecord", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            conn.query(`DELETE FROM ${req.body.obj.table} WHERE ${req.body.obj.paramstr}`,
                (err, result) => {
                    console.log(err);
                    if (err || result.affectedRows < 0) return res.send(status.internalservererror());
                    res.send(status.ok());
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

/*--------------------[ Custom-Templet ]--------------------*/

app.post("/create_custom_template", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            let cstm_id = crypto.randomBytes(6).toString("hex");
            let cstm_name = req.body.name;
            let cstm_message = req.body.message;
            let field = req.body.field;

            function char_count(str, letter) {
                var letter_Count = 0;
                for (var position = 0; position < str.length; position++) {
                    if (str.charAt(position) == letter) {
                        letter_Count += 1;
                    }
                }
                return letter_Count;
            }
            let tempmsg = cstm_message;
            let cnt = char_count(cstm_message, "{");
            for (let k = 1; k <= cnt; k++) {
                tempmsg = tempmsg.replace("{}", `[value${[k]}]`);
            }

            conn.query(`insert into cstm_template values(?,?,?,?,?)`,
                [cstm_id, cstm_name, tempmsg, field, apikey],
                (err, result) => {
                    if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                    res.send(status.ok());
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

/*--------------------[ Contact-list ]--------------------*/

// Contact-list : add contact from sheet / csv
app.post("/importContactsFromGoogle", async (req, res) => {
    var apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            var clientarr = req.body.clients;
            var query = `insert into contact values`;
            for (var i in clientarr) {
                let id = crypto.randomBytes(8).toString("hex");
                if (i != clientarr.length - 1) {
                    query += `('${id}','${apikey}','${clientarr[i].name}','${clientarr[i].email}','${clientarr[i].phone}','${req.body.iid}'),`;
                }
                else {
                    query += `('${id}','${apikey}','${clientarr[i].name}','${clientarr[i].email}','${clientarr[i].phone}','${req.body.iid}')`;
                }
            }
            conn.query(query, (err, result) => {
                if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                res.send(status.ok());
            });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

// Contact-list : Add contact
app.post("/addcontact", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            let id = crypto.randomBytes(8).toString("hex");
            conn.query(
                `insert into contact values('${id}','${apikey}','${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.iid}')`,
                (err, result) => {
                    if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                    res.send(status.ok());
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});


/*--------------------[ Channel ]--------------------*/

// Channel : add contact to channel
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
                }
                else {
                    query += `('${req.body.id}','${contacts[i]}','${apikey}','${req.body.iid}');`;
                }
            }
            conn.query(query, (err, result) => {
                if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                res.send(status.ok());
            });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

// Channel : get contact of particular channel
app.post("/get-channel-contact", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const channel_id = req.body.channel_id;
            conn.query(`SELECT cc.channel_id,c.contact_id,c.name,ch.channelName,c.phone,c.email FROM contact_channel cc, contact c, channel ch WHERE cc.channel_id = ch.channel_id AND cc.contact_id = c.contact_id and cc.apikey = '${apikey}' AND cc.channel_id = '${channel_id}' AND cc.instance_id = '${req.body.iid}' order by c.name asc`,
                (err, result) => {
                    if (err) return res.send(status.internalservererror());
                    if (result.length == 0) return res.send(status.nodatafound());
                    res.send(result);
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

// Channel : Create | Add Channel
app.post("/createchannel", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const id = crypto.randomBytes(8).toString("hex");
            conn.query(`insert into channel values('${id}','${req.body.name}','${apikey}','${req.body.iid}')`,
                (err, result) => {
                    if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                    res.send(status.created());
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

// Common instance wise page API
app.get("/instance/:id/:pagename", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const data = {
                table: 'instance',
                paramstr: `instance_id = '${req.params.id}'`,
                apikey: apikey
            }
            tableData(data, (result) => {
                switch (result.status_code) {
                    case '404': {
                        console.log(`${__dirname}/pages/404.html`);
                        res.sendFile(`${__dirname}/pages/404.html`);
                        // res.send(status.nodatafound());
                        break;
                    }
                    case '500': {
                        res.send(status.internalservererror());
                        break;
                    }
                    default: {
                        res.sendFile(`${__dirname}/pages/user/${req.params.pagename}.html`);
                    }
                }
            });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
})


/*--------------------[ Common ]--------------------*/

app.post("/validateInstance", (req, res) => {
    let iid = req.body.iid;
    let apikey = req.cookies.apikey;
    try {
        conn.query(`select * from instance where instance_id='${iid}'`,
            async (err, result) => {
                if (err) res.send(status.internalservererror());
                if (result.length == 1 && apikey == result[0].apikey) {
                    const isValidapikey = await checkAPIKey(result[0].apikey);
                    if (isValidapikey) {
                        tableData({
                            table: "subscription",
                            paramstr: true,
                            apikey: apikey,
                        }, (result) => {
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
                            }
                            else {
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

                                tableData({
                                    table: "plans",
                                    paramstr: `planid = ${planID} --`,
                                    apikey: apikey,
                                }, (result) => {
                                    total_instance = result[0].totalInstance;
                                    duration = result[0].durationMonth;
                                    latest.setMonth(latest.getMonth() + duration);
                                    remaining_days = Math.ceil(Math.round(latest - current_date) / (1000 * 60 * 60 * 24));

                                    if (remaining_days > 0) {
                                        tableData({
                                            table: "instance",
                                            paramstr: true,
                                            apikey: apikey,
                                        }, (result) => {
                                            if (result.length >= total_instance) return res.send(status.forbidden());
                                            res.send(status.ok());
                                        });
                                    }
                                    else {
                                        res.send(status.forbidden());
                                    }
                                });
                            }
                        });
                    } else res.send(status.unauthorized());
                } else {
                    res.send(status.badRequest());
                }
            });
    }
    catch (error) {
        console.log(error);
        res.send(status.unauthorized(), error);
    }
});


/*--------------------[ Docs ]--------------------*/

// Docs : GET API for testing
app.get('/api/:iid/:fld', async (req, res) => {
    apikey = req.headers.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            tableData({
                table: 'instance',
                paramstr: `instance_id = '${req.params.iid}'`,
                apikey: req.headers.apikey
            }, (result) => {
                if (result.status_code == 500) return res.send(status.internalservererror());
                if (result.status_code == 404) return res.send({ "status_code": "401", "Message": "Invalid Instance ID" });
                if (result.length > 1) return res.send(status.duplicateRecord());
                tableData({
                    table: `${req.params.fld}`,
                    paramstr: `instance_id = '${req.params.iid}'`,
                    apikey: req.headers.apikey
                }, (result) => {
                    if (result.status_code == 500) return res.send(status.internalservererror());
                    if (result.status_code == 404) return res.send(status.nodatafound());
                    res.send(result);
                });
            });
        } else res.send({ "status_code": "401", "Message": "Invalid API KEY" });
    }
    catch (e) {
        console.log(e);
        res.send({ "status_code": "401", "Message": "Invalid API KEY" });
    }
});

// Docs : POST API for testing
app.post('/api/:iid/:fld', async (req, res) => {
    apikey = req.headers.apikey;
    const iid = req.params.iid;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            tableData({
                table: 'instance',
                paramstr: `instance_id = '${iid}'`,
                apikey: apikey
            }, (result) => {
                if (result.status_code == 500) return res.send(status.internalservererror());
                if (result.status_code == 404) return res.send({ "status_code": "401", "Message": "Invalid Instance ID" });
                if (result.length > 1) return res.send(status.duplicateRecord());
                let ID = crypto.randomBytes(8).toString("hex");

                let keys = Object.keys(req.body);
                let value = Object.values(req.body);

                let query = `insert into ${req.params.fld} (`;
                for (var i in keys) {
                    query += `${keys[i]}, `;
                }
                query += `${req.params.fld}_id,apikey, instance_id) values (`;
                for (var i in value) {
                    query += `${value[i]}, `;
                }
                query += `'${ID}','${apikey}','${iid}')`;
                conn.query(query, (err, result) => {
                    if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                    res.send(status.created());
                });
            });
        } else res.send({ "status_code": "401", "Message": "Invalid API KEY" });
    }
    catch (e) {
        console.log(e);
        res.send({ "status_code": "401", "Message": "Invalid API KEY" });
    }
});

// Docs : DELETE API for testing
app.delete('/api/:iid/:fld', async (req, res) => {
    apikey = req.headers.apikey;
    const iid = req.params.iid;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            tableData({
                table: 'instance',
                paramstr: `instance_id = '${iid}'`,
                apikey: apikey
            }, (result) => {
                if (result.status_code == 500) return res.send(status.internalservererror());
                if (result.status_code == 404) return res.send({ "status_code": "401", "Message": "Invalid Instance ID" });
                if (result.length > 1) return res.send(status.duplicateRecord());

                let query = `delete from ${req.params.fld} where ${Object.keys(req.body)[0]} = ${Object.values(req.body)[0]}`;
                conn.query(query, (err, result) => {
                    if (err) return res.send(status.internalservererror());
                    if (result.affectedRows <= 0) return res.send({ "status_code": "404", "Message": "Invalid Contact ID" });
                    res.send(status.ok());
                });
            });
        } else res.send({ "status_code": "401", "Message": "Invalid API KEY" });
    }
    catch (e) {
        console.log(e);
        res.send({ "status_code": "401", "Message": "Invalid API KEY" });
    }
});


app.post('/user', async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const data = {
                table: 'instance',
                paramstr: `instance_id = '${req.body.iid}'`,
                apikey: apikey
            }
            tableData(data, (result) => {
                res.send(result);
            });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/resetpasswordmail", async (req, res) => {
    const email = req.body.email;
    const subject = `Reset password from M3 | Whatsapp Service`;
    const body = `<div class="u-row-container" style="padding: 0px;background-color: transparent"><div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"><div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"><div style="height: 100%;width: 100% !important;"><table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left"><div style="line-height: 140%; text-align: left; word-wrap: break-word;"><p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">Hello,</span></p><p style="font-size: 14px; line-height: 140%;">&nbsp;</p><p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">We have sent you this email in response to your request to reset your password on company name.</span></p><p style="font-size: 14px; line-height: 140%;">&nbsp;</p><p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">To reset your password, please follow the link below:</span></p></div></td></tr></tbody></table><table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;" align="left"><div align="left"><a href="${process.env.DOMAIN}/password-change" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Lato',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #18163a; border-radius: 1px;-webkit-border-radius: 1px; -moz-border-radius: 1px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;"><span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 18px; line-height: 21.6px;">Reset Password</span></span></a></div></td></tr></tbody></table>
            <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left"></td></tr></tbody></table></div></div></div></div></div>`;

    if (email) {
        const data = {
            table: 'users',
            paramstr: `email = ${email} --`,
            apikey: 'null'
        }
        tableData(data, (result) => {
            switch (result) {
                case '500': {
                    return res.send(status.internalservererror())
                    break;
                }

                case '500': {
                    break;
                }

                default: {

                }
            }
            let flag = false;
            for (let i in result) {
                if (email == result[i].email) {
                    flag = true;
                    break;
                }
                else {
                    flag = false;
                }
            }
            if (!flag) return res.send(status.nodatafound());
            sendEmail(to, subject, body).then(() => {
                return res.send(status.ok());
            }).catch((error) => {
                console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                return res.send(status.badRequest());
            })
        });
    }
});

// Common DISPLAY API
app.post("/getData", async (req, res) => {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const data = {
                table: req.body.obj.table,
                paramstr: req.body.obj.paramstr,
                apikey: apikey
            }
            tableData(data, (result) => {
                res.send(result);
            });
        }
        else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

app.post("/create/orderId", (req, res) => {
    let amount = req.body.amount;
    var options = {
        amount: amount,
        currency: "INR",
        receipt: "order_rcptid_i5",
    };
    instance.orders.create(options, function (err, order) {
        res.send({ orderId: order.id });
    });
});

app.post("/api/payment/verify", (req, res) => {
    let body = `${req.body.response.razorpay_order_id}|${req.body.response.razorpay_payment_id}`;

    var expectedSignature = crypto
        .createHmac("sha256", "CGgkDqWQn8f2Sp6vNwqftaXO")
        .update(body.toString())
        .digest("hex");
    var response = { signatureIsValid: "false" };
    if (expectedSignature === req.body.response.razorpay_signature) {
        response = { signatureIsValid: "true" };
    }
    res.send(response);
});


app.post("/recordPayment", function (req, res) {
    let subID = crypto.randomBytes(10).toString("hex");
    let planID = req.body.planID;
    let amount = req.body.amount / 100;
    let apikey = req.body.apikey;
    let payID = req.body.payID;
    let orderId = req.body.orderID;

    conn.query(`insert into subscription values('${subID}','${planID}',${amount},'${apikey}','${payID}','${orderId}',CURRENT_DATE)`,
        (err, result) => {
            if (err) return res.send(status.internalservererror());
            res.send(status.ok());
        });
});

app.post("/checkoldpwd", async function (req, res) {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            tableData({
                "table": "users",
                "paramstr": true,
                "apikey": apikey
            }, (result) => {
                bcrypt.compare(req.body.oldpwd, result[0].password, (err, match) => {
                    if (match) {
                        return res.send(status.ok());
                    } else {
                        return res.send(status.notAccepted());
                    }
                });
            });
        }
        else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
})

app.post("/updatePasscode", (req, res) => {
    let query = ``;
    if (req.body.emailtype == "gmail") {
        query = "update users set emailpasscode='" + passcode + "' where apikey='" + req.cookies.apikey + "'";
    } else {
        query = `update users set emailpasscode='
      ${passcode}',hostname='${req.body.hostname}',port=${req.body.port} where apikey='${req.cookies.apikey}'`;
    }
    conn.query(query, (err, result) => {
        if (err) return res.send(status.internalservererror());
        console.log(result);
        if (result.affectedRows == 1) {
            res.send(status.ok());
        } else {
            res.send(status.internalservererror());
        }
    });
});

// admin apis->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

app.post("/getBtn", (req, res) => {
    var limit = req.body.limit;
    var table = req.body.table;
    var offset = (req.body.pgno - 1) * limit;
    conn.query(
        `SELECT count(*) as cnt FROM ${table} WHERE ${req.body.paramstr}`,
        (err, results) => {
            console.log(results);
            //res.send(results);
            var totalBtn = results[0].cnt / limit;
            res.send({ totalBtn: Math.ceil(totalBtn) });
        }
    );
});

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


app.post("/card", function (req, res) {
    var table = req.body.table;
    var paramstr = req.body.paramstr;
    conn.query(`select count(*) as cnt from ${table} where ${paramstr}`, (err, result) => {
        if (err) return res.send(err);
        if (result.length > 0) {
            res.send(result);
        }
    });
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
    conn.query(`SELECT count(*) as cnt FROM users WHERE MONTH(registrationDate) = ${month} AND YEAR(registrationDate)=${year}`, (err, result) => {
        console.log(result);
        if (err) return res.send(err);
        if (result.length > 0) {
            res.send(result);
        }
    });
});


app.post("/instancereport", function (req, res) {
    let month = req.body.month;
    let year = req.body.year;
    conn.query(`SELECT count(*) as cnt FROM instance WHERE MONTH(create_date) = ${month} AND YEAR(create_date)=${year}`, (err, result) => {
        console.log(result);
        if (err) return res.send(err);
        if (result.length > 0) {
            res.send(result);
        }
    });
});

//user wise plan subscription
app.get("/usersubscription", (req, res) => {
    conn.query(
        "SELECT planID,count(*) as cnt from subscription GROUP BY planID",
        (err, result) => {
            console.log(result);
            if (err) return res.send(err);
            if (result.length > 0) {
                res.send(result);
            }
        })
})

app.post("/addticket", async (req, res) => {
    let apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const t_id = `ST${crypto.randomBytes(8).toString("hex")}`;
            const c_id = `ST${crypto.randomBytes(4).toString('Base64url').replace(/[^A-Z0-9]/g, '')}`;

            let email = await findEmail(apikey);
            let subject = req.body.subject;
            let t_type = req.body.t_type;
            let description = req.body.description;

            let agents = new Array();
            let Account_Management = new Array();
            let Technical_Support = new Array();
            let Payment_Problem = new Array();
            let Service_Inquiry = new Array();
            let Feedback = new Array();

            conn.query(`select * from support_agents`, (err, result) => {
                if (err || result.length <= 0) res.send(status.internalservererror());
                for (let i = 0; i < result.length; i++) {
                    agents.push(result[i].email);
                    console.log("agents", agents);
                    if (result[i].category == "Account Management") {
                        console.log(Account_Management);
                        Account_Management.push(result[i].email);
                    } else if (result[i].category == "Technical Support") {
                        console.log(Technical_Support);
                        Technical_Support.push(result[i].email);
                    } else if (result[i].category == "Payment Problem") {
                        console.log(Payment_Problem);
                        Payment_Problem.push(result[i].email);
                    }
                    else if (result[i].category == "Service Inquiry") {
                        console.log(Service_Inquiry);
                        Service_Inquiry.push(result[i].email);
                    }
                    else if (result[i].category == "Feedback and Suggestions") {
                        console.log(Feedback);
                        Feedback.push(result[i].email);
                    }
                }
                let categories = {
                    "Account Management": Account_Management,
                    "Technical Support": Technical_Support,
                    "Payment Problem": Payment_Problem,
                    "Service Inquiry": Service_Inquiry,
                    "Feedback and Suggestions": Feedback,
                };
                console.log(categories);
                const agentsInCategory = categories[t_type];
                const assignedAgent = agentsInCategory[Math.floor(Math.random() * agentsInCategory.length)];


                conn.query(`INSERT INTO support_ticket VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
                    [t_id, c_id, `email`, email, subject, t_type, description, `open`, `current_timestamp`, apikey, assignedAgent],
                    (err, resp) => {
                        if (err) return res.send(status.internalservererror());
                        //mail to support person for support ticket assigning
                        const smtpTransport = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: "dashboardcrm.2022@gmail.com",
                                pass: "dbwtdfmwrxmwzcat",
                            }
                        });

                        sendEmail(assignedAgent, `New support ticket (${t_id}): ${t_type}`, `Dear ${assignedAgent},\n\nYou have been assigned a new support ticket (${t_id}) for the category '${t_type}'.\n\nPlease log in to the support portal to view and respond to this ticket.\n\nThank you,\nThe support team`).then(() => {
                            console.log("Email Sent Scuuessfully");
                            sendEmail(email, `Support ticket (${t_id}) issued`, `Dear customer,\n\nThank you for submitting a support ticket (${t_id}).\n\nOur support team will review your ticket and get back to you as soon as possible.\n\nThank you,\nThe support team`).then(() => {
                                return res.send(status.ok());;
                            }).catch((error) => {
                                console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                return res.send(status.badRequest());
                            })
                        }).catch((error) => {
                            console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                            return res.send(status.badRequest());
                        })
                    });
            })
        } else res.send(status.unauthorized());
    } catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }
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

//msgcount chart
app.get("/messagecount", (req, res) => {
    (msgcount = 0), (imgcount = 0), (channelcount = 0), (bulkcount = 0);
    conn.query(
        "SELECT msg_type,msgid FROM message",
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
                    } else if (result[i].msg_type == "channel") {
                        channelcount++;
                    }
                }
                var obj = { msg: msgcount, img: imgcount, bulk: bulkcount, channel: channelcount };
                res.send(obj);
            }
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

app.use((req, res) => {
    res.status(404).sendFile(`${__dirname}/pages/404.html`);
});

app.listen(port, () => {
    console.log(`Your server is up and running on : ${port}`);

});

// bcrypt.hash('harsh@123', 10, (err, hash) => {
//     if (err) return res.send("err in bcrypt");
//     console.log(hash);
// });

// var task = cron.schedule('*/1 * * * * *', () => {
//     console.log('will execute every minute until stopped');
// });

// setTimeout(() => {
//     task.stop();
// }, 5000)

// task.stop();

let arr = ['1', '2', '3'];

let frmdata = new FormData();

arr.forEach((value, index) => {
    frmdata.append(`i${index}`, value);
})

console.log(frmdata);