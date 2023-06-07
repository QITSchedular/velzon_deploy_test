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
const { Client, MessageMedia, NoAuth } = require("whatsapp-web.js");

let obj = [], apikey, userProfile;

const SESSION_FILE_PATH = './assets/json/session-data.json';

// const conn = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

const conn = mysql.createConnection({
    host: '164.52.208.110',
    user: 'qitsolution_tempuser',
    password: 'Qit123@#india',
    database: 'qitsolution_sample',
})

// const conn = mysql.createConnection({
//     host: 'm3-db.cpqpqooy9dzn.ap-south-1.rds.amazonaws.com',
//     user: 'admin',
//     password: 'M3passb4u#0',
//     database: 'qrdb',
// })
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
            return Promise.resolve(messageId);
        }).catch((error) => {
            return Promise.reject(error);
        })
    };

    async send_whatsapp_document(chatId, media) {
        await this.client.sendMessage(chatId, media).then((messageId) => {
            return Promise.resolve(messageId);
        }).catch((error) => {
            return Promise.reject(error);
        })
    }

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
    }
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

async function findData(apikey, column) {
    try {
        return await new Promise((resolve, reject) => {
            conn.query(`SELECT ${column} FROM users WHERE apikey = '${apikey}'`, (error, result) => {
                if (error || result.length <= 0) return reject(status.internalservererror().status_code);
                resolve(result[0][column]);
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
                    status.ok().status_code;
                }
                else {
                    status.nodatafound().status_code;
                }
            }
            else {
                status.duplicateRecord().status_code;
            }
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

function deleteFolder(folderPath) {
    try {
        if (fs.existsSync(`${__dirname}\\assets\\upload\\${folderPath}`)) {
            fs.readdirSync(`${__dirname}\\assets\\upload\\${folderPath}`).forEach((file) => {
                const currentPath = path.join(`${__dirname}\\assets\\upload\\${folderPath}`, file);
                if (fs.lstatSync(currentPath).isDirectory()) {
                    // Recursively delete sub-folders and files
                    deleteFolder(currentPath);
                } else {
                    // Delete file
                    fs.unlinkSync(currentPath);
                }
            });
            // Delete the empty folder
            fs.rmdirSync(`${__dirname}\\assets\\upload\\${folderPath}`);
            return true;
        } else {
            // Folder doesn't exist
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const tableData = (data, callback) => {
    try {
        const sql = `SELECT * FROM ${data.table} WHERE ${data.paramstr} AND apikey = '${data.apikey}'`;
        conn.query(sql,
            (err, result) => {
                // console.log(err);
                // console.log(result);
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

async function sendEmail(sender, to, subject, body) {
    var transporter = nodemailer.createTransport({
        host: sender.hostname,
        port: sender.port,
        secure: true,
        auth: {
            user: sender.email,
            pass: sender.passcode,
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
        console.log(e);
    }
};

async function AdmincheckAPIKey(apikey) {
    try {
        return await new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM admin WHERE apikey = '${apikey}'`, (error, results) => {
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

function createInstance() {
    conn.query(`update instance set isActive = 0 where 1`, (err, result) => {
        if (err || result.affectedRows <= 0) return console.log(status.internalservererror());
        if (result <= 0) return console.log(status.nodatafound());
    });
}
createInstance();

const CREDENTIALS = JSON.parse(fs.readFileSync("spreadsheet-388213-84c50f351ad0.json"));

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
                    res.redirect(`http://localhost:${process.env.PORT}/dashboard`);
                }
                else {
                    conn.query(
                        `INSERT INTO users (apikey,uname,email) VALUES('${apikey}','${Ac_name}','${Ac_mail}')`,
                        function (err, result) {
                            if (err) return console.log(err);
                            if (result) {
                                setCookie(res, "apikey", apikey, 1);
                                res.redirect(`http://localhost:${process.env.PORT}/dashboard`);
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
            data.push(row._rawData);
            phones.push(row.phone);
        }
        object["colnames"] = colnames;
        object["values"] = data;
        console.log(object);
        res.send(object);
    }
    catch (e) {
        console.log(e);
    }
});

app.post("/file", async (req, res) => {
    if (req.files.csvfile.mimetype === 'text/csv') {
        let csvData = await req.files.csvfile.data.toString("utf8");
        return csvtojson().fromString(csvData).then((json) => {
            return res.status(201).json({
                csv: csvData,
                json: json
            });
        });
    }
    else {
        return res.send(status.notAccepted());
    }
});

/*----------------------------------------------------------*/

/*--------------------[ User | Support ]--------------------*/

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


// Bulkmessage : QRcode Generetor API
app.get("/qr/:iid", async (req, res) => {
    let iid = req.params.iid;
    try {
        obj[iid] = new clients();
        const qrData = await obj[iid].generateqr();
        if (qrData.length < 0) {
            console.log("No qr");
        } else {
            res.send(qrData);
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
});


let adminBot = new clients({
    authStrategy: new NoAuth(),
});


// Apply the middleware to the /admin_bot_qr route
app.get("/admin_bot_qr", async (req, res) => {
    adminBot.client.initialize();
    try {

        const qrData = await adminBot.generateqr();
        if (qrData.length < 0) {
            console.log("No qr");
        } else {
            console.log(qrData);
            res.send(qrData);
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get("/adminBotWork", async (req, res) => {
    await adminBot.client.on('message', (message) => {
        // Your existing code for the /adminBotWork API
        // ...

        let id = message.body;

        let questions = [
            { question: '# Phone-number:', answer: '' },
            { question: '# Ticket subject:', answer: '' },
            {
                question: `# Write a name of your Ticket type:\n\n1. Account Management\n2. Technical Support\n3. Payment Problem\n4. Service Inquiry\n5. Feedback and suggestions`, answer: ''
            },
            { question: `# Description:`, answer: '' }

        ];
        const answers = message.body.split('\n');
        if (answers.length > 1) {
            // Update the form questions with the user's answers
            questions.forEach((q, i) => {
                q.answer = answers[i];
                console.log(q.answer);
            });
            // Store the form data in a database
            console.log(answers);
            const prefix = 'ST';
            const randomString = crypto.randomBytes(8).toString('hex');
            const prefixedString = prefix + randomString;
            let phone = answers[0];
            let subject = answers[1];
            let type = answers[2];
            let description = answers[3];
            //let apikey = req.cookies.apikey;
            conn.query(`INSERT INTO support_ticket(ticket_id,category,user,t_subject,t_type,t_description,apikey) VALUES ('${prefixedString}','whatsapp','${phone}','${subject}','${type}','${description}','1a1e44d1fbc97ef89e31b599c6e8d0a3')`, (err, res) => {
                if (err) console.log(err);
                console.log(res);
            })
        } else {
            switch (message.body) {
                case "Hi":
                    adminBot.client.sendMessage(message.from, 'Hello! How can i help you??\nA. information \nB. query');
                    break;
                case "A":
                    conn.query(
                        `select description from bot where referencekey='A'`,
                        (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                let count = 1;
                                let msg = "*you have to write a number correspond to the problem which displaying in below message for the information.*\n";
                                for (let i = 0; i < results.length; i++) {
                                    msg += count + ". " + results[i].description + "\n";
                                    count++;
                                }
                                adminBot.client.sendMessage(message.from, msg);

                            }

                        })
                    break;
                case '1':
                    conn.query(
                        `select description from bot where referencekey='1'`,
                        (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                adminBot.client.sendMessage(message.from, results[0].description);
                            }
                        })
                    break;
                case '2':
                    conn.query(
                        `select description from bot where referencekey='2'`,
                        (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                adminBot.client.sendMessage(message.from, results[0].description);
                            }
                        })
                    break;
                case '3':
                    conn.query(
                        `select description from bot where referencekey='3'`,
                        (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                adminBot.client.sendMessage(message.from, results[0].description);
                            }
                        })
                    break;
                case '4':
                    conn.query(
                        `select description from bot where referencekey='4'`,
                        (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                adminBot.client.sendMessage(message.from, results[0].description);
                            }
                        })
                    break;
                case '5':
                    conn.query(
                        `select description from bot where referencekey='5'`,
                        (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                adminBot.client.sendMessage(message.from, results[0].description);
                            }
                        })
                    break;
                case '6':
                    conn.query(
                        `select description from bot where referencekey='6'`,
                        (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                adminBot.client.sendMessage(message.from, results[0].description);
                            }
                        })
                    break;
                case '7':
                    conn.query(
                        `select description from bot where referencekey='7'`,
                        (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                adminBot.client.sendMessage(message.from, results[0].description);
                            }
                        })
                    break;
                case '8':
                    conn.query(
                        `select description from bot where referencekey='8'`,
                        (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                adminBot.client.sendMessage(message.from, results[0].description);
                            }
                        })
                    break;
                case '9':
                    conn.query(
                        `select description from bot where referencekey='9'`,
                        (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                adminBot.client.sendMessage(message.from, results[0].description);
                            }
                        })
                    break;
                case "B":
                    adminBot.client.sendMessage(message.from, 'Please fill out this ticket-details:\n\n*Note:You have to answer all the details in a single message and newline.*\n\n' + questions.map(q => q.question).join('\n'));
                    break;


            }
        }
    });
})

// Bulkmessage : Authentication Client API
app.get("/authenticated/:iid", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            let iid = req.params.iid;

            await obj[iid].client.on("authenticated", (session) => {

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

// Bulkmessage : Authentication Client API
app.get("/adminbotauthenticated", function (req, res) {
    try {
        adminBot.client.on("authenticated", (session) => {
            console.log("done");
            res.send(status.ok());

        });

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

app.get("/adminbotdisconnected", async (req, res) => {
    try {
        adminBot.client.disconnect().then(() => {
            res.send(status.ok());
        }).catch((error) => {
            console.error(`Error in dessconnecting: ${error}`);
            res.send(status.badRequest());
        });
    } catch (error) {
        console.log(error);
        res.send(status.forbidden());
    }
});

// Bulkmessage : Send Bulk Template Message API
app.post("/bulktemplatemessage", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const iid = req.body.iid;
            const token = req.body.token;

            let contacts = req.body.contacts;
            let msg = req.body.message;
            let clientobj = req.body.clientobj;
            let selectedcol = req.body.selectedcol;

            if (req.body.type == "workflow") {
                contacts = contacts.split(",");
                selectedcol = selectedcol.split(",");
            }
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

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());
                    for (let i = 0; i < clientobj.length; i++) {
                        if (obj[iid]) {
                            let chatId = `91${contacts[i]}@c.us`;

                            obj[iid].send_whatsapp_message(chatId, msgarr[i]).then((messageId) => {
                                let msgid = crypto.randomBytes(8).toString("hex");

                                conn.query(`insert into message values(?,?,?,?,?,?,?,?)`,
                                    [msgid, msgarr[i], 'Bulk Message Template localfile', chatId, iid, apikey, token, new Date()],
                                    function (err, result) {
                                        if (err || result.affectedRows < 1) return status.internalservererror();
                                        if (i === clientobj.length - 1) {
                                            return res.send(status.ok());
                                        }
                                    });
                            }).catch((error) => {
                                console.log(`error in Sending schedule Message ::::::: <${error}>`);
                                return res.send(status.userNotValid());
                            })
                        }
                        else {
                            console.log("no iid found");
                            return res.send(status.userNotValid());
                        }
                    }
                });
        }
    }
    catch (e) {
        console.log(e);
        return res.send(status.unauthorized());
    }
});

// Bulkmessage : Send Document and Image API
app.post("/sendimage", async function (req, res) {
    apikey = req.cookies.apikey;
    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const token = req.body.token;

            const iid = req.body.iid;

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}'`,
                function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());

                    createfolder(`image_data\\${apikey}\\${iid}`);
                    if (req.files && Object.keys(req.files).length !== 0) {
                        const uploadedFile = req.files.image;
                        const uploadPath = `${__dirname}/assets/upload/image_data/${apikey}/${iid}/${uploadedFile.name}`;

                        uploadedFile.mv(uploadPath, async function (err) {
                            if (err) res.send(status.badRequest());
                            let filepath = `${__dirname}/assets/upload/image_data/${apikey}/${iid}/${uploadedFile.name}`;
                            console.log(filepath);
                            const media = MessageMedia.fromFilePath(filepath);
                            if (obj[iid]) {
                                let phonearray = req.body.phonearray.split(",");
                                for (let i = 0; i < phonearray.length; i++) {
                                    let msgid = crypto.randomBytes(8).toString("hex");
                                    const chatId = `91${phonearray[i]}@c.us`;
                                    await obj[iid].send_whatsapp_document(chatId, media).then((messageId) => {
                                        cloudinary.uploader.upload(filepath, { folder: 'M3' }).then((data) => {
                                            conn.query(`insert into message values(?,?,?,?,?,?,?,?)`,
                                                [msgid, data.secure_url, `Document-${req.files.image.mimetype}`, chatId, iid, apikey, token, new Date()],
                                                function (err, result) {
                                                    console.log(result);
                                                    if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                                    if (i == phonearray.length - 1) {
                                                        res.send(status.ok());
                                                        return;
                                                    }
                                                });
                                        }).catch((err) => {
                                            console.log(`error in storing Document on cloudinary ::::::: <${err}>`);
                                            conn.query(`insert into message values(?,?,?,?,?,?,?,?)`,
                                                [msgid, uploadedFile.name, 'Document-' + req.files.image.mimetype, chatId, iid, apikey, token, new Date()],
                                                function (err, result) {
                                                    if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                                    if (i == phonearray.length - 1) {
                                                        res.send(status.ok());
                                                        return;
                                                    }
                                                })
                                        });
                                    }).catch((error) => {
                                        console.error(`error in sending Document ::::::: <${error}>`);
                                        res.send(status.userNotValid());
                                        return;
                                    });
                                }


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
                            var msgid = crypto.randomBytes(8).toString("hex");
                            conn.query(`insert into message values(?,?,?,?,?,?,?,?)`,
                                [msgid, message, 'Single Message', chatId, iid, apikey, token, new Date()],
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

// Bulkmessage : Send Bulk Custom Message API
app.post("/bulkcustommessage", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const token = req.body.token;
            const iid = req.body.iid;

            let message = req.body.message;
            var contacts = req.body.contacts;

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                async function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());
                    for (let i = 0; i < contacts.length; i++) {
                        const chatId = `91${contacts[i]}@c.us`;
                        let msgid = crypto.randomBytes(8).toString("hex");
                        if (obj[iid]) {

                            obj[iid].send_whatsapp_message(chatId, message).then((messageId) => {
                                conn.query(`insert into message values(?,?,?,?,?,?,?,?)`,
                                    [msgid, message, 'Bulk Message custom localfile', chatId, iid, apikey, token, new Date()],
                                    function (err, result) {
                                        if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                        if (i === contacts.length - 1) return res.send(status.ok());
                                    });
                            }).catch((error) => {
                                console.log(`error in Sending Bulk Message to Channel ::::::: <${error}>`);
                                return res.send(status.userNotValid());
                            })
                        }
                        else {
                            return res.send(status.userNotValid());
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

// Bulkmessage : Send Message through channel API
app.post("/sendmsgchannel", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const token = req.body.token;
            const iid = req.body.iid;

            let message = req.body.message;
            let contacts = req.body.contacts;

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`, async function (err, result) {
                if (err || result.length <= 0) return res.send(status.forbidden());
                for (let i = 0; i < contacts.length; i++) {
                    const chatId = `91${contacts[i]}@c.us`;
                    let msgid = crypto.randomBytes(8).toString("hex");
                    if (obj[iid]) {

                        obj[iid].send_whatsapp_message(chatId, message).then((messageId) => {
                            conn.query(
                                `insert into message values(?,?,?,?,?,?,?,?)`,
                                [msgid, message, 'Bulk Message channel', chatId, iid, apikey, token, new Date()],
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

// Bulkmessage : Send Message on Schedule API
app.post('/schedule', async (req, res) => {
    apikey = req.cookies.apikey;

    const sender = {
        "hostname": await findData(apikey, 'hostname'),
        "port": await findData(apikey, 'port'),
        "email": await findData(apikey, 'email'),
        "passcode": await findData(apikey, 'emailpasscode')
    };

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const iid = req.body.iid;
            const token = req.body.token;
            const time = req.body.time;
            const schedule_id = `sh_${crypto.randomBytes(6).toString("hex")}`;
            const to = await findData(apikey, 'email');
            const subject = `Regarding your Schedule Message on M3`;
            // let time = `${minute + 1} ${hour} ${date} ${month + 1} *`;

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                async function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());
                    try {
                        switch (req.body.type) {
                            case 'message': {
                                let message = req.body.message, contacts = req.body.contacts_list;
                                let data = {
                                    "api": "/sendmsg",
                                    "body": message,
                                    "contacts": contacts
                                };

                                const task = cron.schedule(time, () => {

                                    if (obj[iid]) {
                                        for (let i = 0; i < contacts.length; i++) {
                                            console.log(contacts.length, contacts);
                                            const chatId = `91${contacts[i]}@c.us`;

                                            obj[iid].send_whatsapp_message(chatId, message).then((messageId) => {
                                                let msgid = crypto.randomBytes(8).toString("hex");

                                                conn.query(`insert into message values(?,?,?,?,?,?,?,?)`,
                                                    [msgid, message, 'Schedule Single Message', chatId, iid, apikey, token, new Date()],
                                                    function (err, result) {
                                                        if (err || result.affectedRows < 1) return status.internalservererror();
                                                        if (i === contacts.length - 1) {
                                                            conn.query(`update schedule set status = ? where schedule_id = ?`, [`DONE`, schedule_id],
                                                                async function (err, result) {
                                                                    if (err || result.affectedRows < 1) return console.log(status.internalservererror());
                                                                    let body = "Your scheduled task has completed without any error.";
                                                                    sendEmail(sender, to, subject, body).then(() => {
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
                                                    async function (err, result) {
                                                        if (err || result.affectedRows < 1) return console.log(status.internalservererror());
                                                        let body = `Your scheduled task has not completed due to : ${error}`;
                                                        sendEmail(sender, to, subject, body).then(() => {
                                                            return console.log("Email Sent Scuuessfully");
                                                        }).catch((error) => {
                                                            return console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                                        })
                                                    });
                                            })
                                        }
                                    }
                                    else {
                                        console.log("no iid found");
                                        conn.query(`update schedule set status = ? where schedule_id = ?`, [`ERROR`, schedule_id],
                                            function (err, result) {
                                                if (err || result.affectedRows < 1) return console.log(status.internalservererror());
                                                let body = `Your scheduled task has not completed due to : disconnected instance.`;
                                                sendEmail(sender, to, subject, body).then(() => {
                                                    return console.log("Email Sent Scuuessfully");
                                                }).catch((error) => {
                                                    return console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                                })
                                            });
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
                                let contacts = null;
                                if (typeof (req.body.contacts_list) === 'object') {
                                    contacts = req.body.contacts_list;
                                }
                                else if (typeof (req.body.contacts_list) === 'string') {
                                    contacts = req.body.contacts_list.split(',');
                                }

                                if (req.files && Object.keys(req.files).length !== 0) {
                                    const uploadedFile = req.files.image;
                                    const uploadPath = `${__dirname}/assets/upload/image_data/${apikey}/${iid}/${uploadedFile.name}`;

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

                                            if (obj[iid]) {
                                                for (let i = 0; i < contacts.length; i++) {
                                                    const chatId = `91${contacts[i]}@c.us`;
                                                    await obj[iid].send_whatsapp_document(chatId, media).then((messageId) => {
                                                        var msgid = crypto.randomBytes(8).toString("hex");

                                                        cloudinary.uploader.upload(filepath, { folder: 'M3' }).then((data) => {
                                                            conn.query(`insert into message values(?,?,?,?,?,?,?,?)`,
                                                                [msgid, data.secure_url, req.files.image.mimetype, chatId, iid, apikey, token, new Date()],
                                                                function (err, result) {
                                                                    if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                                                    if (i === contacts.length - 1) {
                                                                        conn.query(`update schedule set status = ? where schedule_id = ?`, [`DONE`, schedule_id],
                                                                            async function (err, result) {
                                                                                if (err || result.affectedRows < 1) return console.log(status.internalservererror());

                                                                                let body = "Your scheduled task has completed without any error.";

                                                                                sendEmail(sender, to, subject, body).then(() => {
                                                                                    return console.log("Email Sent Scuuessfully");
                                                                                }).catch((error) => {
                                                                                    return console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                                                                })
                                                                            });
                                                                    }
                                                                });
                                                        }).catch((err) => {
                                                            console.log(`error in storing Document on cloudnary ::::::: <${err}>`);
                                                            conn.query(`insert into message values(?,?,?,?,?,?,?,?)`,
                                                                [msgid, uploadedFile.name, req.files.image.mimetype, chatId, iid, apikey, token, new Date()],
                                                                function (err, result) {
                                                                    if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                                                    if (i === contacts.length - 1) {
                                                                        let body = "Your scheduled task has completed without any error.";

                                                                        sendEmail(sender, to, subject, body).then(() => {
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
                                                                sendEmail(sender, to, subject, body).then(() => {
                                                                    return console.log("Email Sent Scuuessfully");
                                                                }).catch((error) => {
                                                                    return console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                                                })
                                                            });
                                                    });
                                                }
                                            }
                                            else {
                                                console.log("no iid found");
                                                conn.query(`update schedule set status = ? where schedule_id = ?`, [`ERROR`, schedule_id],
                                                    function (err, result) {
                                                        if (err || result.affectedRows < 1) return console.log(status.internalservererror());
                                                        let body = `Your scheduled task has not completed due to : disconnected instance.`;
                                                        sendEmail(sender, to, subject, body).then(() => {
                                                            return console.log("Email Sent Scuuessfully");
                                                        }).catch((error) => {
                                                            return console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                                                        })
                                                    });
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

// Bulkmessage : Refresh Token API
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


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// Bulkmail : Send Bulk Template Mail API
app.post("/sendMail", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const iid = req.body.iid;
            const token = req.body.token;
            const to = req.body.to;
            const from = await findData(apikey, 'email');
            const subject = req.body.subject;
            const body = req.body.body;

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                async function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());
                    const sender = {
                        "hostname": await findData(apikey, 'hostname'),
                        "port": await findData(apikey, 'port'),
                        "email": from,
                        "passcode": await findData(apikey, 'emailpasscode')
                    };
                    sendEmail(sender, to, subject, body).then(() => {
                        const id = crypto.randomBytes(8).toString("hex");
                        conn.query(`insert into email values(?,?,?,?,?,?,?,?,?)`,
                            [id, from, to, 'GMAIL', subject, body, iid, apikey, new Date()],
                            (err, result) => {
                                if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                                return res.send(status.ok());
                            });
                    }).catch((error) => {
                        console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                        return res.send(status.badRequest());
                    })
                });
        }
    }
    catch (e) {
        console.log(e);
        return res.send(status.unauthorized());
    }
});

// Bulkmail : Send Bulk Template Mail API
app.post("/bulktemplatemail", async function (req, res) {

    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const iid = req.body.iid;
            const token = req.body.token;

            let contacts = req.body.contacts;
            let msg = req.body.message;
            let clientobj = req.body.clientobj;
            let selectedcol = req.body.selectedcol;

            if (req.body.type == "workflow") {
                contacts = contacts.split(",");
                selectedcol = selectedcol.split(",");
            }
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

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                async function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());
                    for (let i = 0; i < clientobj.length; i++) {
                        const to = contacts[i];
                        const subject = req.body.subject;
                        const body = msgarr[i];
                        const sender = {
                            hostname: await findData(apikey, 'hostname'),
                            port: await findData(apikey, 'port'),
                            email: await findData(apikey, 'email'),
                            passcode: await findData(apikey, 'emailpasscode')
                        };
                        sendEmail(sender, to, subject, body).then(() => {
                            if (i === clientobj.length - 1) {
                                return res.send(status.ok());
                            }
                        }).catch((error) => {
                            console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                            return res.send(status.badRequest());
                        })
                    }
                });
        }
    }
    catch (e) {
        console.log(e);
        return res.send(status.unauthorized());
    }
});

// Bulkmail : Send Bulk Custom Mail API
app.post("/bulkcustommail", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const token = req.body.token;
            const iid = req.body.iid;

            var contacts = req.body.contacts;

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                async function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());
                    for (let i = 0; i < contacts.length; i++) {
                        const to = contacts[i];
                        const subject = req.body.subject;
                        const body = req.body.message;
                        const sender = {
                            "hostname": await findData(apikey, 'hostname'),
                            "port": await findData(apikey, 'port'),
                            "email": await findData(apikey, 'email'),
                            "passcode": await findData(apikey, 'emailpasscode')
                        };
                        sendEmail(sender, to, subject, body).then(() => {
                            if (i === contacts.length - 1) {
                                return res.send(status.ok());
                            }
                        }).catch((error) => {
                            console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                            return res.send(status.badRequest());
                        })
                    }
                });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});

// Bulkmail : Send Bulk Mail through channel API
app.post("/sendmailchannel", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const token = req.body.token;
            const iid = req.body.iid;

            let contacts = req.body.contacts;

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`, async function (err, result) {
                if (err || result.length <= 0) return res.send(status.forbidden());
                for (let i = 0; i < contacts.length; i++) {
                    const to = contacts[i];
                    const subject = req.body.subject;
                    const body = req.body.message;
                    const sender = {
                        "hostname": await findData(apikey, 'hostname'),
                        "port": await findData(apikey, 'port'),
                        "email": await findData(apikey, 'email'),
                        "passcode": await findData(apikey, 'emailpasscode')
                    };
                    sendEmail(sender, to, subject, body).then(() => {
                        if (i === contacts.length - 1) {
                            return res.send(status.ok());
                        }
                    }).catch((error) => {
                        console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                        return res.send(status.userNotValid());
                    })
                }
            });
        } else res.send(status.unauthorized());
    }
    catch (e) {
        console.log(e);
        res.send(status.unauthorized());
    }
});


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


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


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


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


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


// Instance : Create Instance
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


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


// Custom-Templet : Create Custom Template
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


/*----------------------------------------------------------*/

let otp, token;
app.post("/sendEmailVerification", (req, res) => {

    const to = req.body.email;
    if (to) {
        otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        token = jwt.sign({
            otp, exp: Math.floor(Date.now() / 1000) + 30
        }, "ourSecretKey");

        const subject = `Verification Email From M3 | Whatsapp Services`;
        const body = `<div class="u-row-container" style="padding: 0px;background-color: transparent"><div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;"><div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"><div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;"><div style="height: 100%;width: 100% !important;"><table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left"><div style="line-height: 140%; text-align: left; word-wrap: break-word;"><p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">Hello,</span></p><p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">OTP to Verify your Email : </span><span style="font-size: 22px; color: #405189;">${otp}</span></p></div></td></tr></tbody></table>`

        const sender = {
            "hostname": 'smtp.gmail.com',
            "port": '465',
            "email": 'dashboardcrm.2022@gmail.com',
            "passcode": 'dbwtdfmwrxmwzcat'
        };

        sendEmail(sender, to, subject, body).then(() => {
            return res.send(status.ok());
        }).catch((error) => {
            return res.send(status.badRequest());
        })
    }
    else {
        return res.send(status.notAccepted());
    }
});

app.post("/verifyOTP", (req, res) => {
    const receivedOTP = req.body.otp;
    if (receivedOTP == otp) {
        jwt.verify(token, "ourSecretKey", function (err, decoded) {
            if (err) return res.send(status.forbidden());
            if (decoded) {
                res.cookie("everify", true);
                return res.send(status.ok());
            }
        });
    }
    else {
        return res.send(status.unauthorized());
    }
});

// app.post("/adduser", (req, res) => {
//     const id = crypto.randomBytes(16).toString("hex");

//     const name = req.body.name;
//     const phone = req.body.phone;
//     const email = req.body.email;
//     const password = req.body.password;
//     const country = req.body.country;
//     const state = req.body.state;
//     const city = req.body.city;

//     if (name && phone && email && password && country && state && name != undefined && phone != undefined && email != undefined && password != undefined && country != undefined && state != undefined) {
//         conn.query("SELECT * FROM users WHERE email='" + email + "'",
//             function (err, result) {
//                 if (err) return res.send(status.internalservererror());
//                 if (result.length > 0) return res.send(status.duplicateRecord());
//                 bcrypt.hash(password, 10, (err, hash) => {
//                     if (err) return res.send("err in bcrypt");
//                     conn.query(
//                         `INSERT INTO users VALUES('${id}','${name}','${email}','${hash}','${phone}',false,'${country}','${state}','${city}',CURRENT_DATE,NULL)`,
//                         function (err, result) {
//                             res.clearCookie("everify");
//                             if (err) return res.send(status.internalservererror());
//                             if (result.affectedRows == 0) return res.send(status.internalservererror());
//                             return res.send(status.ok());
//                         });
//                 });
//             });
//     } else {
//         res.send(status.badRequest());
//     }
// });

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
                        `INSERT INTO users(apikey,uname,email,password,phone,phoneverify,country,state,city,registrationDate,image) VALUES('${id}','${name}','${email}','${hash}','${phone}',false,'${country}','${state}','${city}',${new Date()}, NULL)`,
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

app.get('/message_summary', async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            conn.query(`SELECT m.instance_id AS iid, i.i_name AS i_name, 
            COUNT(CASE WHEN m.msg_type = 'Single Message' THEN 1 END) AS single_message_count, 
            COUNT(CASE WHEN m.msg_type like '%Document%' THEN 1 END) AS single_document_count, 
            COUNT(CASE WHEN m.msg_type = 'Bulk Message Template' THEN 1 END) AS bulk_message_template_count,
            COUNT(CASE WHEN m.msg_type = 'Bulk Message Custom' THEN 1 END) AS bulk_message_custom_count, 
            COUNT(CASE WHEN m.msg_type = 'Bulk Message Channel' THEN 1 END) AS bulk_message_channel_count
            FROM message m JOIN instance i ON m.instance_id = i.instance_id GROUP BY m.apikey, m.instance_id, i.i_name having apikey = '${apikey}'`, function (err, result) {
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

app.get('/message_summary_admin', async (req, res) => {
    conn.query(`SELECT COUNT(CASE WHEN m.msg_type = 'Single Message' THEN 1 END) AS single_message_count, 
            COUNT(CASE WHEN m.msg_type like '%Document%' THEN 1 END) AS single_document_count, 
            COUNT(CASE WHEN m.msg_type = 'Bulk Message Template' THEN 1 END) AS bulk_message_template_count,
            COUNT(CASE WHEN m.msg_type = 'Bulk Message Custom' THEN 1 END) AS bulk_message_custom_count, 
            COUNT(CASE WHEN m.msg_type = 'Bulk Message Channel' THEN 1 END) AS bulk_message_channel_count
            FROM message m`, function (err, result) {
        if (err) return res.send(status.internalservererror());
        if (result.length <= 0) return res.send(status.nodatafound());
        res.send(result);
    })
})

app.get('/email_summary', async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            conn.query(`SELECT m.instance_id AS iid, i.i_name AS i_name, 
            COUNT(CASE WHEN m.email_type = 'Bulk Mail Template' THEN 1 END) AS bulk_mail_template_count,
            COUNT(CASE WHEN m.email_type = 'Bulk Mail Custom' THEN 1 END) AS bulk_mail_custom_count, 
            COUNT(CASE WHEN m.email_type = 'Bulk Mail Channel' THEN 1 END) AS bulk_mail_channel_count
            FROM email m JOIN instance i ON m.instance_id = i.instance_id GROUP BY m.apikey, m.instance_id, i.i_name having apikey = '${apikey}'`, function (err, result) {
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

app.get('/email_summary_admin', async (req, res) => {
    conn.query(`SELECT COUNT(CASE WHEN m.email_type = 'Bulk Mail Template' THEN 1 END) AS bulk_mail_template_count,
            COUNT(CASE WHEN m.email_type = 'Bulk Mail Custom' THEN 1 END) AS bulk_mail_custom_count, 
            COUNT(CASE WHEN m.email_type = 'Bulk Mail Channel' THEN 1 END) AS bulk_mail_channel_count
            FROM email m`, function (err, result) {
        if (err) return res.send(status.internalservererror());
        if (result.length <= 0) return res.send(status.nodatafound());
        res.send(result);
    })
})

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
                    cloudinary.uploader.upload(uploadPath, { folder: 'M3' }).then((data) => {
                        conn.query(`UPDATE users SET image = '${data.secure_url}' WHERE apikey = '${apikey}'`,
                            function (err, result) {
                                if (err || result.affectedRows <= 0) return res.send(status.internalservererror());
                                deleteFolder(`\\profile\\${apikey}`);
                                res.send(status.ok());
                            });
                    }).catch((err) => {
                        console.log(`error in storing Document on cloudnary :::::::`, err);
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
        paramstr: "true --",
    }
    tableData(data, (result) => {
        res.send(result);
    });
});

app.post("/dis_mes", function (req, res) {
    let temp_name = req.body.temp_name;
    tableData({
        table: "template",
        paramstr: `temp_name = '${temp_name}' --`,
        apikey: 'null'
    }, (result) => {
        switch (result.status_code) {
            case '500': {
                res.send(status.internalservererror());
                break;
            }
            case '404': {
                tableData({
                    table: "cstm_template",
                    paramstr: `cstm_name = '${temp_name}'`,
                    apikey: req.cookies.apikey
                }, (result) => {
                    res.send(result);
                })
                break;
            }
            default: {
                res.send(result);
                break;
            }
        }
    });
});

/*--------------------[ Common ]--------------------*/

// validate Instabce API
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
                                tableData({
                                    table: "instance",
                                    paramstr: true,
                                    apikey: apikey,
                                }, (result) => {
                                    if (result.status_code == 404) {
                                        res.send(status.ok());
                                    } else {
                                        res.send(status.forbidden());
                                    }
                                });
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
                        res.sendFile(`${__dirname}/pages/404.html`);
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

app.post("/getDataWithCondition", (req, res) => {
    conn.query(
        `select * from ${req.body.table} where ${req.body.paramstr}`,
        (err, result) => {
            if (err) res.send(status.internalservererror());
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send(status.nodatafound());
            }
        }
    );
});

/*--------------------[ Docs ]--------------------*/

// Docs : Send Message Testing API
app.post('/api/:iid/message', async (req, res) => {
    apikey = req.headers.apikey;
    const iid = req.params.iid;
    const message = req.body.message;
    const chatId = `91${req.body.phone}@c.us`;
    console.log(iid, chatId, message);
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

                if (obj[iid]) {
                    obj[iid].send_whatsapp_message(chatId, message).then((messageId) => {
                        var msgid = crypto.randomBytes(8).toString("hex");
                        conn.query(`insert into message values(?,?,?,?,?,?,?,?)`,
                            [msgid, message, 'Test Single Message', chatId, iid, apikey, "none", new Date()],
                            function (err, result) {
                                if (err || result.affectedRows < 1) return res.send(status.internalservererror());
                                res.send(status.ok());
                            });
                    }).catch((error) => {
                        res.send({ "status_code": "1013", "Message": "Error in sending message / Inactive instance" });
                    })
                }
                else {
                    res.send({ "status_code": "1013", "Message": "Error in sending message / Inactive instance" });
                }
            });
        } else res.send({ "status_code": "401", "Message": "Invalid API KEY" });
    }
    catch (e) {
        console.log(e);
        res.send({ "status_code": "401", "Message": "Invalid API KEY" });
    }
});

// Docs : Send Message Testing API
app.post('/api/:iid/email', async (req, res) => {
    apikey = req.headers.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const iid = req.params.iid;

            tableData({
                table: 'instance',
                paramstr: `instance_id = '${iid}'`,
                apikey: apikey
            }, async (result) => {
                if (result.status_code == 500) return res.send(status.internalservererror());
                if (result.status_code == 404 || result.length > 1) return res.send({ "status_code": "401", "Message": "Invalid Instance ID" });

                const to = req.body.to;
                const subject = req.body.subject;
                const body = req.body.body;
                const sender = {
                    "hostname": await findData(apikey, 'hostname'),
                    "port": await findData(apikey, 'port'),
                    "email": await findData(apikey, 'email'),
                    "passcode": await findData(apikey, 'emailpasscode')
                };
                sendEmail(sender, to, subject, body).then(() => {
                    return res.send({ "status_code": "200", "Message": "Email Sent" });
                }).catch((error) => {
                    return res.send({ "status_code": "1013", "Message": `Error in sending Email <${error}>` });
                })
            });
        } else res.send({ "status_code": "401", "Message": "Invalid API KEY" });
    }
    catch (e) {
        console.log(e);
        res.send({ "status_code": "401", "Message": "Invalid API KEY" });
    }
});

// Docs : GET Testing API
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

// Docs : POST Testing API
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

// Docs : DELETE Testing API
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

/*------------------------------------------------*/

/*--------------------[ Workflow ]--------------------*/

app.post("/createWorkflow", (req, res) => {
    let wid = crypto.randomBytes(16).toString("hex");
    let wname = req.body.wname;
    let iid = req.body.iid;
    console.log(wname + wid);
    conn.query(
        `insert into workflow(workflow_id,workflow_name,apikey,instance_id) values('${wid}','${wname}','${req.cookies.apikey}','${iid}')`,
        (err, result) => {
            console.log(result);
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
    console.log(req.body);

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

app.put("/updateWorkflowSteps", (req, res) => {
    console.log(req.body);
    conn.query("select * from workflow where workflow_id='" + req.body.workflow_id + "'", (err, result) => {
        if (err) return res.send(status.internalservererror());
        if (result.length > 0) {
            let flag = true;
            // for (let i = req.body.index_start; i < result.length; i++) { 
            conn.query(`update workflow set index_no=index_no-1 where workflow_id='${req.body.workflow_id}' and index_no>=${req.body.index_start}`, (err, rslt) => {
                if (err) res.send(status.internalservererror());
                console.log(rslt);
                if (rslt.affectedRows == 0) {
                    res.send(status.internalservererror());
                } else {
                    res.send(status.ok());
                }
            })
        } else {
            res.send(status.badRequest());
        }
    })
})

/*----------------------------------------------------*/

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
        tableData(data, async (result) => {
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
            const sender = {
                "hostname": await findData(apikey, 'hostname'),
                "port": await findData(apikey, 'port'),
                "email": await findData(apikey, 'email'),
                "passcode": await findData(apikey, 'emailpasscode')
            };
            sendEmail(sender, to, subject, body).then(() => {
                return res.send(status.ok());
            }).catch((error) => {
                console.log(`error in Sending  E-Mail ::::::: <${error}>`);
                return res.send(status.badRequest());
            })
        });
    }
});

app.post("/create/orderId", (req, res) => {
    let amount = req.body.amount;
    console.log("amt", amount);
    var options = {
        amount: amount,
        currency: "INR",
        receipt: "order_rcptid_i5",
    };
    instance.orders.create(options, function (err, order) {
        console.log("err", err);
        console.log("order", order);
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
    let limit = req.body.limit;
    try {
        const data = {
            table: req.body.table,
            paramstr: req.body.paramstr,
            limit: limit,
            offset: (req.body.pgno - 1) * limit,
        };
        tableDataAdmin(data, (result) => {
            res.send(result);
        });
    } catch (e) {
        //console.log(e);
    }
});

app.post("/addRecord", function (req, res) {
    let table = req.body.table;

    console.log("inside api");
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
                console.log(result);
                if (err) return res.send(status.internalservererror());
                if (result.affectedRows == 1) {
                    res.send(status.ok());
                } else {
                    res.send(status.internalservererror());
                }
            }
        );
    } else if (table == "support_agents") {
        console.log(req.body);
        conn.query(
            `insert into support_agents(name,email,password,category) values('${req.body.aname}','${req.body.email}','${req.body.password}','${req.body.category}')`,
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

app.post("/adminDeleteRecord", (req, res) => {
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

app.get("/adminBotWork/:iid", (req, res) => {
    let iid = req.params.iid;
    obj[iid].client.on('message', (message) => {

        let questions = [
            { question: '# Phone-number:', answer: '' },
            { question: '# Ticket subject:', answer: '' },
            { question: '# Registered Email:', answer: '' },
            {
                question: `# Write a name of your Ticket type:\n\t* Account Management\n\t* Technical Support\n\t* Payment Problem\n\t* Service Inquiry\n\t* Feedback and suggestions`, answer: ''
            },
            { question: `# Description:`, answer: '' }

        ];
        const answers = message.body.split('\n');
        if (answers.length > 1) {
            // Update the form questions with the user's answers
            questions.forEach((q, i) => {
                q.answer = answers[i];
                console.log(q.answer);
            });
            const generateUniqueId = () => {
                const prefix = "W-";
                const maxLength = 6 - prefix.length;
                const maxNumber = Math.pow(10, maxLength) - 1;
                const uniqueId = Math.floor(Math.random() * maxNumber) + 1;
                return prefix + uniqueId.toString().padStart(maxLength, '0');
            };
            // Store the form data in a database
            //console.log(answers);
            const t_id = generateUniqueId();
            let phone = answers[0];
            let subject = answers[1];
            let Email = answers[2];
            let type = answers[3];
            let description = answers[4];

            let a_agents = new Array();
            let a_Account_Management = new Array();
            let a_Technical_Support = new Array();
            let a_Payment_Problem = new Array();
            let a_Service_Inquiry = new Array();
            let a_Feedback = new Array();

            conn.query(`select * from support_agents`, (err, result) => {
                console.log(result);
                if (err || result.length <= 0) res.send(status.internalservererror());
                if (result.length > 0) {
                    for (let i = 0; i < result.length; i++) {
                        a_agents.push(result[i].a_email);
                        console.log("agents", a_agents);
                        if (result[i].a_category == "Account Management") {
                            console.log(a_Account_Management);
                            a_Account_Management.push(result[i].a_email);
                        } else if (result[i].a_category == "Technical Support") {
                            console.log(a_Technical_Support);
                            a_Technical_Support.push(result[i].a_email);
                        } else if (result[i].a_category == "Payment Problem") {
                            console.log(a_Payment_Problem);
                            a_Payment_Problem.push(result[i].a_email);
                        }
                        else if (result[i].a_category == "Service Inquiry") {
                            console.log(a_Service_Inquiry);
                            a_Service_Inquiry.push(result[i].a_email);
                        }
                        else if (result[i].a_category == "Feedback and Suggestions") {
                            console.log(a_Feedback);
                            a_Feedback.push(result[i].a_email);
                        }
                    }
                    let categories = {
                        "Account Management": a_Account_Management,
                        "Technical Support": a_Technical_Support,
                        "Payment Problem": a_Payment_Problem,
                        "Service Inquiry": a_Service_Inquiry,
                        "Feedback and Suggestions": a_Feedback,
                    };
                    const agentsInCategory = categories[type];
                    const Agent_email = agentsInCategory[Math.floor(Math.random() * agentsInCategory.length)];

                    //console.log(t_id + " " + phone + " " + subject + " " + type + " " + description);
                    conn.query("select * from users where email='" + Email + "'", (err1, res1) => {

                        if (err1) console.log(err1);
                        if (res1.length > 0) {
                            console.log(res1);

                            conn.query(`INSERT INTO support_ticket VALUES(?,?,?,?,?,?,?,?,?,?)`,
                                [t_id, 'whatsapp', phone, subject, type, description, 'open', new Date(), res1[0].apikey, Agent_email], (err, res2) => {
                                    if (err) console.log(err);
                                    console.log(res2);
                                    if (res2 > 0) {
                                        obj[iid].send_whatsapp_message(message.from, 'your support-ticket has been generated successfully!!!');
                                    }
                                })
                        }

                    })
                }
            })
        }
        else {
            switch (message.body) {
                case "hi":
                case "Hi": {

                    obj[iid].send_whatsapp_message(message.from, 'Hello! How can i help you??\nA. information \nB. query');
                }
                    break;
                case "A":
                    conn.query(
                        `select description from bot where referencekey='A'`,
                        async (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                let count = 1;
                                let msg = "*you have to write a number correspond to the problem which displaying in below message for the information.*\n";
                                for (let i = 0; i < results.length; i++) {
                                    msg += count + ". " + results[i].description + "\n";
                                    count++;
                                }
                                await obj[iid].send_whatsapp_message(message.from, msg);

                            }

                        })
                    break;
                case '1':
                    conn.query(
                        `select description from bot where referencekey='1'`,
                        async (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                await obj[iid].send_whatsapp_message(message.from, results[0].description);
                            }
                        })
                    break;
                case '2':
                    conn.query(
                        `select description from bot where referencekey='2'`,
                        async (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                await obj[iid].send_whatsapp_message(message.from, results[0].description);
                            }
                        })
                    break;
                case '3':
                    conn.query(
                        `select description from bot where referencekey='3'`,
                        async (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                await obj[iid].send_whatsapp_message(message.from, results[0].description);
                            }
                        })
                    break;
                case '4':
                    conn.query(
                        `select description from bot where referencekey='4'`,
                        async (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                await obj[iid].send_whatsapp_message(message.from, results[0].description);
                            }
                        })
                    break;
                case '5':
                    conn.query(
                        `select description from bot where referencekey='5'`,
                        async (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                await obj[iid].send_whatsapp_message(message.from, results[0].description);
                            }
                        })
                    break;
                case '6':
                    conn.query(
                        `select description from bot where referencekey='6'`,
                        async (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                await obj[iid].send_whatsapp_message(message.from, results[0].description);
                            }
                        })
                    break;
                case '7':
                    conn.query(
                        `select description from bot where referencekey='7'`,
                        async (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                await obj[iid].send_whatsapp_message(message.from, results[0].description);
                            }
                        })
                    break;
                case '8':
                    conn.query(
                        `select description from bot where referencekey='8'`,
                        async (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                await obj[iid].send_whatsapp_message(message.from, results[0].description);
                            }
                        })
                    break;
                case '9':
                    conn.query(
                        `select description from bot where referencekey='9'`,
                        async (error, results) => {
                            if (error) console.log(error);
                            if (results.length > 0) {
                                console.log(results);

                                await obj[iid].send_whatsapp_message(message.from, results[0].description);
                            }
                        })
                    break;
                case "B":
                    obj[iid].send_whatsapp_message(message.from, 'Please fill out this ticket-details:\n\n*Note:You have to answer all the details in a single message and newline.*\n\n' + questions.map(q => q.question).join('\n'));
                    break;


            }
        }
    });
})

app.get("/adminbotauthenticated/:iid", async function (req, res) {
    apikey = req.cookies.apikey;

    const isValidapikey = await AdmincheckAPIKey(apikey);
    try {
        if (isValidapikey) {
            let iid = req.params.iid;
            obj[iid].client.on("authenticated", (session) => {
                conn.query(`update admin set isActive = 1 where apikey = '${iid}'`,
                    (err, result) => {
                        if (err || result.affectedRows < 1) res.send(status.internalservererror());

                        res.send(status.ok());
                    });
            });
        }

    }
    catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }
});

app.get("/adminbotdisconnected/:iid", async (req, res) => {
    try {
        const iid = req.params.iid;
        obj[iid].disconnect().then(() => {
            conn.query(`update admin set isActive = 0 where apikey = '${iid}'`,
                (err, result) => {
                    if (err || result.affectedRows < 1) res.send(status.internalservererror());
                    res.send(status.ok());
                });
        }).catch((error) => {
            console.error(`Error in dissconnecting: ${error}`);
            res.send(status.badRequest());
        })
    } catch (error) {
        console.log(error);
        res.send(status.forbidden());
    }
});

app.get("/chartsupportticket", (req, res) => {
    (AM_count = 0), (TS_count = 0), (PP_count = 0), (SI_count = 0), (F_count = 0);
    conn.query(
        "SELECT t_type,ticket_id FROM support_ticket",
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].t_type == "Account Management") {
                        AM_count++;
                    } else if (result[i].t_type == "Technical Support") {
                        TS_count++;
                    } else if (result[i].t_type == "Payment Problem") {
                        PP_count++;
                    } else if (result[i].t_type == "Service Inquiry") {
                        SI_count++;
                    } else if (result[i].t_type == "Feedback and Suggestions") {
                        F_count++;
                    }
                }
                var obj = { AM: AM_count, TS: TS_count, PP: PP_count, SI: SI_count, F: F_count };
                res.send(obj);
            }
        }
    );
});

app.get("/chartemail", (req, res) => {
    (template_bulk = 0), (custom_bulk = 0), (channel_bulk = 0);
    conn.query(
        "SELECT email_type,email_id FROM email",
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].email_type == "Template Bulk Mail") {
                        template_bulk++;
                    } else if (result[i].email_type == "Custom Bulk Mail") {
                        custom_bulk++;
                    } else if (result[i].email_type == "Channel Bulk Mail") {
                        channel_bulk++;
                    }
                }
                var obj = { templateBulk: template_bulk, customBulk: custom_bulk, channelBulk: channel_bulk };
                res.send(obj);
            }
        }
    );
});

// ----------------------------------------------------------

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
    conn.query(`select country, count(apikey) as cnt from ${table} group by country`, (err, result) => {
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
            const generateUniqueId = () => {
                const prefix = "ST-";
                const maxLength = 7 - prefix.length;
                const maxNumber = Math.pow(10, maxLength) - 1;
                const uniqueId = Math.floor(Math.random() * maxNumber) + 1;
                return prefix + uniqueId.toString().padStart(maxLength, '0');
            };
            const t_id = generateUniqueId();

            let email = await findData(apikey, 'email');
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
                const agentsInCategory = categories[t_type];
                const assignedAgent = agentsInCategory[Math.floor(Math.random() * agentsInCategory.length)];


                conn.query(`INSERT INTO support_ticket VALUES(?,?,?,?,?,?,?,?,?,?)`,
                    [t_id, `email`, email, subject, t_type, description, `open`, new Date(), apikey, assignedAgent],
                    async (err, resp) => {
                        if (err) return res.send(status.internalservererror());
                        //mail to support person for support ticket assigning
                        const sender = {
                            "hostname": await findData(apikey, 'hostname'),
                            "port": await findData(apikey, 'port'),
                            "email": await findData(apikey, 'email'),
                            "passcode": await findData(apikey, 'emailpasscode')
                        };

                        sendEmail(sender, assignedAgent, `New support ticket (${t_id}): ${t_type}`, `Dear ${assignedAgent},\n\nYou have been assigned a new support ticket (${t_id}) for the category '${t_type}'.\n\nPlease log in to the support portal to view and respond to this ticket.\n\nThank you,\nThe support team`).then(() => {
                            console.log("Email Sent Scuuessfully");
                            sendEmail(sender, email, `Support ticket (${t_id}) issued`, `Dear customer,\n\nThank you for submitting a support ticket (${t_id}).\n\nOur support team will review your ticket and get back to you as soon as possible.\n\nThank you,\nThe support team`).then(() => {
                                return res.send(status.ok());
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

app.post("/AgentReplyToTicket", async (req, res) => {
    let id = req.body.id;
    let indexno = req.body.indexno;
    let identity = req.body.identity;
    let category = req.body.category;
    let type = req.body.type;
    let subject = req.body.subject;
    let description = req.body.description;
    let tstatus = req.body.status;
    let uname = req.body.uname;
    let contact = req.body.contact;
    let response = req.body.response;
    // let apikey = req.cookies.apikey;
    let email = req.body.email;
    let agent_id = req.cookies.agent_id;
    let sindex = req.cookies.sindex;
    let prefix = "+91";
    contact = prefix.concat(contact);
    let chatId = contact.substring(1) + "@c.us";
    let mailOptions;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dashboardcrm.2022@gmail.com",
            pass: "dbwtdfmwrxmwzcat",
        },
    });

    if (category == "whatsapp") {
        supportclient[sindex].client
            .sendMessage(
                chatId,
                `Hello ${uname}\n\nFor query #${id} \n${subject}\n\nWe have considered your query and send response on your email: ${email}`
            );

        mailOptions = {
            from: "dashboardcrm.2022@gmail.com",
            to: email,
            subject: "Reply of your Ticket " + id,
            html: `<div><b>Hello ${uname}</b><br>Your Query : #${id} ${subject}<br>${description}<br><br>Answer: <b>${response}</b></div>`,
        };
    }
    else {
        mailOptions = {
            from: "dashboardcrm.2022@gmail.com",
            to: contact,
            subject: "Reply of your Support-Ticket " + id,
            html: `<div><b>Hello ${uname}</b><br>Your Query : #${id} ${subject}<br>${description}<br><br>Answer: <b>${response}</b></div>`,
        };
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(status.badRequest());
        }
        else {
            console.log("Email sent: " + info.response);
            conn.query(`INSERT INTO ticket_reply(index_no, identity, ticket_id,reply,apikey) VALUES ('${indexno}','${identity}','${id}','${response}','${agent_id}')`, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(status.internalservererror());
                }
                if (result) {
                    conn.query(`update support_ticket set status='inprogress' where ticket_id='${id}'`, (err2, result2) => {
                        if (err2) {
                            console.log(err2);
                            res.send(status.internalservererror());
                        }
                        if (result2.affectedRows == 1) {
                            res.send(status.ok());
                        }
                        else {
                            res.send(status.expectationFailed());
                        }
                    });
                }
                else {
                    res.send(status.expectationFailed());
                }
            });
        }
    });
});

app.post("/ClientReplyToTicketAgent", async (req, res) => {
    let id = req.body.id;
    let indexno = req.body.indexno;
    let identity = req.body.identity;
    let category = req.body.category;
    let type = req.body.type;
    // let subject = req.body.subject;
    let description = req.body.description;
    let tstatus = req.body.status;
    let uname = req.body.uname;
    let contact = req.body.contact;
    let response = req.body.response;
    let apikey = req.cookies.apikey;
    let email = req.body.email;
    let agent_email = req.body.agent_email;
    let prefix = "+91";
    contact = prefix.concat(contact);

    // let transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: email,
    //         pass: pass,
    //     },
    // });





    // mailOptions = {
    //     from: email,
    //     to: agent_email,
    //     // subject: ",
    //     html: ``,
    // };

    const to = agent_email;
    const subject = `Support-Ticket ${id}`;
    const body = `<div><b>Hello ${agent_email},</b><br><br>Ticket-Id: #${id}<br><br>subject: ${subject}<br><br>description:${response}</div>`;


    const sender = {
        "hostname": await findData(apikey, 'hostname'),
        "port": await findData(apikey, 'port'),
        "email": await findData(apikey, 'email'),
        "passcode": await findData(apikey, 'emailpasscode')
    };
    sendEmail(sender, to, subject, body).then(() => {
        // return console.log("Email Sent Scuuessfully");
        conn.query(`INSERT INTO ticket_reply(index_no, identity, ticket_id,reply,apikey) VALUES ('${indexno}','${identity}','${id}','${response}','${apikey}')`, (err, result) => {
            if (err) {
                console.log(err);
                res.send(status.internalservererror());
            }
            if (result) {
                conn.query(`update support_ticket set status='inprogress' where ticket_id='${id}'`, (err2, result2) => {
                    if (err2) {
                        console.log(err2);
                        res.send(status.internalservererror());
                    }
                    if (result2.affectedRows == 1) {
                        res.send(status.ok());
                    }
                    else {
                        res.send(status.expectationFailed());
                    }
                });
            }
            else {
                res.send(status.expectationFailed());
            }
        });
    }).catch((error) => {
        return console.log(`error in Sending  E-Mail ::::::: <${error}>`);
    })

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //         res.send(status.badRequest());
    //     }
    //     else {
    //         console.log("Email sent: " + info.response);

    //     }
    // });
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
    conn.query("select * from cstm_template where apikey='" + apikey + "'",
        function (err, rest1) {
            if (err) return //console.log(err);
            if (rest1.length > 0)
                //res.send(rest1);
                //console.log(rest1);
                res.send(rest1);
        }
    );
});

app.post("/sendtoallgsheet", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const token = req.body.token;
            const iid = req.body.instanceid;

            let data = req.body.data;
            let msg = req.body.msg;

            let object, flag = 0;

            conn.query(`select * from instance where instance_id = '${iid}' and apikey = '${apikey}' and token = '${token}'`,
                async function (err, result) {
                    if (err || result.length <= 0) return res.send(status.forbidden());
                    if (obj[iid]) {
                        obj[iid].send_whatsapp_message(chatId, message).then((messageId) => {
                            console.log("yo", messageId)
                            var msgid = crypto.randomBytes(8).toString("hex");
                            conn.query(`insert into message values(?,?,?,?,?,?,?,?)`,
                                [msgid, message, 'Single Message', chatId, iid, apikey, token, new Date()],
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

        }
    }
    catch (e) {
        //console.log(e);
        res.send(status.unauthorized());
    }



    var date_ob = new Date();

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
    return msgarray;
}

app.post("/createworkflow", async (req, res) => {
    apikey = req.cookies.apikey;

    const isValidapikey = await checkAPIKey(apikey);
    try {
        if (isValidapikey) {
            const iid = req.body.iid;
            const generateUniqueId = () => {
                const prefix = "W-";
                const maxLength = 6 - prefix.length;
                const maxNumber = Math.pow(10, maxLength) - 1;
                const uniqueId = Math.floor(Math.random() * maxNumber) + 1;
                return prefix + uniqueId.toString().padStart(maxLength, '0');
            };
            const wid = generateUniqueId();
            let wname = req.body.wname;
            conn.query(`insert into workflow (workflow_id,workflow_name,apikey,instance_id) values(?,?,?,?)`,
                [wid, wname, apikey, iid],
                (err, result) => {
                    if (err) return res.send(status.internalservererror());
                    return res.send(status.ok());
                });
        } else return res.send(status.unauthorized());
    }
    catch (e) {
        return res.send(status.unauthorized());
    }
});

app.post("/getAdminData", function (req, res) {
    conn.query(`select * from ${req.body.table}`, (err, result) => {
        if (err) return res.send(status.internalservererror());
        res.send(result);
    });
});

app.use((req, res) => {
    res.status(404).sendFile(`${__dirname}/pages/404.html`);
});

app.listen(port, () => {
    console.log(`Your server is up and running on : ${port}`);
    console.log(`http://localhost:${port}/signin`);
});