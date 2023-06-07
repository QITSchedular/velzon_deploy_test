const router = require('express').Router();
let mainpath = require('path');
let path = mainpath.join(__dirname, "../../pages");


/*--------------------[ Common ]--------------------*/

router.get("/", (req, res) => {
    res.sendFile(`${path}/landing.html`);
})

router.get("/404", (req, res) => {
    res.sendFile(`${path}/404.html`);
})

router.get("/500", (req, res) => {
    res.sendFile(`${path}/500.html`);
})

router.get("/signin", (req, res) => {
    res.sendFile(`${path}/signin.html`);
})

router.get("/signup", (req, res) => {
    res.sendFile(`${path}/signup.html`);
})

/*-------------------------------------------------*/


/*--------------------[ Docs ]--------------------*/

router.get("/docs", (req, res) => {
    res.sendFile(`${path}/docs/index.html`);
})

router.get("/docs/:folder/:page", async (req, res) => {
    res.sendFile(`${path}/docs/${req.params.folder}/${req.params.page}.html`);
})


/*-------------------------------------------------*/


/*--------------------[ User ]--------------------*/

router.get("/dashboard", (req, res) => {
    res.sendFile(`${path}/user/index.html`);
})

router.get("/updateprofile", (req, res) => {
    res.sendFile(`${path}/user/updateprofile.html`);
});

router.get("/profile", (req, res) => {
    res.sendFile(`${path}/user/profile.html`);
});

router.get("/subscription", (req, res) => {
    res.sendFile(`${path}/user/subscription.html`);
})

router.get("/instance", (req, res) => {
    res.sendFile(`${path}/user/instance.html`);
})

router.get("/customtemplate", (req, res) => {
    res.sendFile(`${path}/user/customtemplate.html`);
});

router.get("/addpasscode", (req, res) => {
    res.sendFile(`${path}/user/addpasscode.html`);
});

router.get("/workflow", (req, res) => {
    res.sendFile(`${path}/user/workflow.html`);
});

router.get("/phoneverify", (req, res) => {
    res.sendFile(`${path}/user/phone-verify.html`);
});

router.get("/support-ticket", (req, res) => {
    res.sendFile(`${path}/user/support-ticket.html`);
});

router.get("/support-ticket/:id", (req, res) => {
    res.sendFile(`${path}/user/ticketdetails.html`);
});

router.get("/password-change", (req, res) => {
    res.sendFile(`${path}/user/pass-change.html`);
})

router.get("/password-reset", (req, res) => {
    res.sendFile(`${path}/user/pass-reset.html`);
})

/*-------------------------------------------------*/


/*--------------------[ Admin ]--------------------*/

router.get("/adminDashboard", (req, res) => {
    res.sendFile(`${path}/admin/admin-index.html`);
});

router.get("/whatsappbot", (req, res) => {
    res.sendFile(`${path}/admin/admin-bot.html`);
});

router.get("/instanceData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-instances.html`);
});

router.get("/usersData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-users.html`);
});

router.get("/planData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-plans.html`);
});

router.get("/templateData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-templates.html`);
});

router.get("/channelData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-channels.html`);
});

router.get("/channelData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-channels.html`);
});

router.get("/contactData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-contact.html`);
});

router.get("/messageData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-messages.html`);
});

router.get("/emailData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-email.html`);
});

router.get("/subscriptionData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-subscriptions.html`);
});

router.get("/ticketData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-supportticket.html`);
});

router.get("/customtemplate", (req, res) => {
    res.sendFile(`${path}/admin/customtemplate.html`);
});

router.get("/agentsData", (req, res) => {
    res.sendFile(`${path}/admin/admin-display-agents.html`);
});
/*---------------------------------------------------*/


/*--------------------[ Support ]--------------------*/

router.get("/manageSupportTicket", (req, res) => {
    res.sendFile(`${path}/support/manage_support_ticket.html`);
});

router.get("/supportTicket/:id", (req, res) => {
    console.log("hello");
    res.sendFile(`${path}/support/supportTicket.html`);
});

router.get("/supportScan", (req, res) => {
    res.sendFile(`${path}/support/supportScan.html`);
});

/*----------------------------------------------------*/

module.exports = router;