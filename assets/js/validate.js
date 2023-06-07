let param1, param2, param3;
let objFlag = {};

function onfocusout_validation(x) {
    param1 = "#".concat(x);
    param2 = "#err_".concat($(param1).attr('id'));
    param3 = "flag_".concat($(param1).attr('id'));

    if ($(param1).val() == "" || $(param1).val() == null) {
        $(param1).removeClass('form-control-success');
        $(param1).addClass('form-control-danger');
        $(param2).text("Required");
        objFlag[`${param3}`] = 1;
        return objFlag;
    }
}

function oninput_validation(x) {
    param1 = "#".concat(x);
    type = $(param1).attr('data-type');
    param2 = "#err_".concat($(param1).attr('id'));
    param3 = "flag_".concat($(param1).attr('id'));

    let obj = {
        name: {
            rgx: "^[A-Za-z0-9 ]+$",
            msg: "must be character."
        },
        phone: {
            rgx: "^[0-9]{10}$",
            msg: "Invalid Phone number."
        },
        email: {
            rgx: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
            msg: "Email must be like abc@xyz.com."
        },
        password: {
            rgx: "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$",
            msg: "Invalid password format."
        },
        message: {
            rgx: ".",
            msg: "Invalid message format."
        },
        number: {
            rgx: "^[0-9]+$",
            msg: "must be digit."
        },
        custom: {
            rgx: $(param1).attr('data-regex'),
            msg: $(param1).attr('data-message')
        }
    };

    var check = new RegExp(obj[type].rgx);

    if (!check.test($(param1).val())) {
        $(param1).removeClass('form-control-success');
        $(param1).addClass('form-control-danger');
        $(param2).text(obj[type].msg);
        objFlag[`${param3}`] = 1;
        return objFlag;
    }
    else {
        $(param1).removeClass('form-control-danger');
        $(param1).addClass('form-control-success');
        $(param2).text("");
        objFlag[`${param3}`] = 0;
        return objFlag;
    }
}

function nullfield_validation(x) {
    param1 = "#".concat(x);
    param2 = "#err_".concat($(param1).attr('id'));
    param3 = "flag_".concat($(param1).attr('id'));

    if ($(param1).val() == "" || $(param1).val() == null) {
        $(param1).removeClass('form-control-success');
        $(param1).addClass('form-control-danger');
        $(param2).text("Required");
        objFlag[`${param3}`] = 1;
        return objFlag;
    }
    else {
        $(param1).removeClass('form-control-danger');
        $(param1).addClass('form-control-success');
        $(param2).text("");
        objFlag[`${param3}`] = 0;
        return objFlag;
    }
}