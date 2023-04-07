const router = require("express").Router();
const mainpath = require('path');
const path = mainpath.join(__dirname,'../../pages');

router.get("/", (req, res) => {
  res.sendFile(path + "/landing.html");
  //   res.send("kjgsdjshgfhg");
});

router.get("/dashboard", (req, res) => {
  res.sendFile(path + "/index.html");
});

router.get("/payment", (req, res) => {
  res.sendFile(path + "/payment.html");
});

router.get("/updateprofile", (req, res) => {
  res.sendFile(path + "/updateprofile.html");
});

router.get("/profile", (req, res) => {
  res.sendFile(path + "/profile.html");
});

router.get("/pagesprofilesettings", (req, res) => {
  res.sendFile(path + "/pages-profile-settings.html");
});

router.get("/subscription", (req, res) => {
  res.sendFile(path + "/subscription.html");
});

router.get("/instance", (req, res) => {
  res.sendFile(path + "/instance.html");
});

router.get("/404alt", (req, res) => {
  res.sendFile(path + "/404-alt.html");
});

router.get("/404basic", (req, res) => {
  res.sendFile(path + "/404-basic.html");
});

router.get("/404cover", (req, res) => {
  res.sendFile(path + "/404-cover.html");
});

router.get("/500", (req, res) => {
  res.sendFile(path + "/500.html");
});

router.get("/lockscreenbasic", (req, res) => {
  res.sendFile(path + "/lockscreen-basic.html");
});

router.get("/lockscreencover", (req, res) => {
  res.sendFile(path + "/lockscreen-cover.html");
});

router.get("/logout", (req, res) => {
  res.sendFile(path + "/logout-basic.html");
});

router.get("/logoutcover", (req, res) => {
  res.sendFile(path + "/logout-cover.html");
});

router.get("/offline", (req, res) => {
  res.sendFile(path + "/offline.html");
});

router.get("/passchangebasic", (req, res) => {
  res.sendFile(path + "/pass-change-basic.html");
});

router.get("/passresetbasic", (req, res) => {
  res.sendFile(path + "/pass-reset-basic.html");
});

router.get("/signin", (req, res) => {
  res.sendFile(path + "/signin.html");
});

router.get("/signup", (req, res) => {
  res.sendFile(path + "/signup.html");
});

router.get("/successmsgbasic", (req, res) => {
  res.sendFile(path + "/success-msg-basic.html");
});

router.get("/successmsgcover", (req, res) => {
  res.sendFile(path + "/success-msg-cover.html");
});

router.get("/twostepbasic", (req, res) => {
  res.sendFile(path + "/twostep-basic.html");
});

router.get("/twostepcover", (req, res) => {
  res.sendFile(path + "/twostep-cover.html");
});

router.post("/send", (req, res) => {
  res.sendFile(`Information is:${req.body.phone} ${req.body.msg}.`);
});

router.get("/pricing", (req, res) => {
  res.sendFile(path + "/pricing.html");
});

router.get("/bulkmail", (req, res) => {
  res.sendFile(path + "/bulkmail.html");
});

router.get("/channels", (req, res) => {
  res.sendFile(path + "/channel.html");
});

router.get("/contact-list", (req, res) => {
  res.sendFile(path + "/contact-list.html");
});

router.get("/instanceData", (req, res) => {
  res.sendFile(path + "/admin-display-instances.html");
});

router.get("/usersData", (req, res) => {
  res.sendFile(path + "/admin-display-users.html");
});

router.get("/planData", (req, res) => {
  res.sendFile(path + "/admin-display-plans.html");
});

router.get("/templateData", (req, res) => {
  res.sendFile(path + "/admin-display-templates.html");
});

router.get("/channelData", (req, res) => {
  res.sendFile(path + "/admin-display-channels.html");
});

router.get("/channelData", (req, res) => {
  res.sendFile(path + "/admin-display-channels.html");
});

router.get("/contactData", (req, res) => {
  res.sendFile(path + "/admin-display-contact.html");
});

router.get("/messageData", (req, res) => {
  res.sendFile(path + "/admin-display-messages.html");
});

router.get("/subscriptionData", (req, res) => {
  res.sendFile(path + "/admin-display-subscriptions.html");
});

router.get("/customtemplate", (req, res) => {
  res.sendFile(path + "/customtemplate.html");
});

module.exports = router;
