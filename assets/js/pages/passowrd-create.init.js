Array.from(document.querySelectorAll(".auth-pass-inputgroup")).forEach(function (s) {
    Array.from(s.querySelectorAll(".password-addon")).forEach(function (t) {
        t.addEventListener("click", function (t) {
            var e = s.querySelector(".password-input");
            "password" === e.type ? e.type = "text" : e.type = "password"
        })
    })
});


$(document).on('focus', '.password-input', function () {
    document.getElementById("password-contain").style.display = "block";
})

$(document).on('blur', '.password-input', function () {
    document.getElementById("password-contain").style.display = "none";
})

$(document).on('keyup', '.password-input', function () {
    let letter = $("#pass-lower");
    let capital = $("#pass-upper");
    let number = $("#pass-number");
    let length = $("#pass-length");
    let symbol = $("#pass-symbol");

    let myInput = $(".password-input").val();

    myInput.match(/[a-z]/g) ? (
        letter.removeClass("invalid").addClass("valid")
    ) : (
        letter.removeClass("valid").addClass("invalid")
    );

    myInput.match(/[A-Z]/g) ? (
        capital.removeClass("invalid").addClass("valid")
    ) : (
        capital.removeClass("valid").addClass("invalid")
    );

    myInput.match(/[\W_]/g) ? (
        symbol.removeClass("invalid").addClass("valid")
    ) : (
        symbol.removeClass("valid").addClass("invalid")
    );

    myInput.match(/[0-9]/g) ? (
        number.removeClass("invalid").addClass("valid")
    ) : (
        number.removeClass("valid").addClass("invalid")
    );

    if (myInput.length >= 8) {
        length.removeClass("invalid").addClass("valid");
    } else {
        length.removeClass("valid").addClass("invalid");
    }
});
