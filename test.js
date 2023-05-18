const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const puppeteer = require('puppeteer');

const client = new Client({
    puppeteer: {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' || '/usr/bin/google-chrome-stable',
    }
});
const { MessageMedia } = require("whatsapp-web.js");

const media = MessageMedia.fromFilePath("dataupdated.mp3");

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Client is ready!");
    client.sendMessage("919313054702@c.us", media);
});

client.initialize();

client.on("message", (message) => {
    console.log(message.body);
});