function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function InternalServerError() {
    swal({
        title: "Internal server error",
        text: "Site is under maintainance,Try againg later",
        imageUrl: "assets/images/error500.png",
        timer: 4000,
        showConfirmButton: false,
        showCancelButton: false,
    });
}

function InvalidUser() {
    document.cookie =
        "aid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = "/signin";
}

function chkLogin() {
    const aid = getCookie("aid");
    if (aid == "" || aid == null) return (location.href = "/signin");
    $.ajax({
        url: "/getAdminData",
        method: "POST",
        data: {
            table: `admin`,
        },
        success: function (val) {
            if (val.length > 0) {
                let flag = 0;
                for (let i = 0; i < val.length; i++) {
                    if (val[i].id == aid) {
                        flag = 1;
                        break;
                    }
                }
                if (flag != 1) {
                    location.href = "/signin";
                }
            }
        },
    });
}

$(document).ready(function () {
    // chkLogin();
    let page = document.URL.split("/");
    fetch('../../assets/json/admin-nav.json')
        .then(response => response.json())
        .then(data => {
            let result = ``;
            for (var i in data) {
                result += `
                        <li class="nav-item">
                            <a class="nav-link menu-link" href="/${data[i].link}" data-page="${data[i].link}">
                                <i class="${data[i].icon}"></i>
                                <span data-key="t-dashboards">${data[i].page}</span>
                            </a>
                        </li>`;
            }
            $('#navbar-nav').html(result);
            $(`a[data-page='${page[3]}']`).addClass('active');
        })
        .catch(error => {
            console.error(error);
        });

    sessionStorage.setItem(`data-preloader`, `enable`);

    $(".footer").html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-6">
                                <span>&copy;<span>
                                <span>${new Date().getFullYear()}<span>
                                <span>M3(Message Mail Mitra).<span>
                            </div>
                            <div class="col-sm-6">
                                <div class="text-sm-end d-none d-sm-block">
                                    Develop by Triangles
                                </div>
                            </div>
                        </div>
                    </div>`);

    $(document).on("click", "#logout", function () {
        document.cookie =
            "aid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        location.href = "/signin";
    });

    $(document).on("click", ".light-dark-mode", () => {
        if (sessionStorage.getItem("data-layout-mode") == "dark") {
            sessionStorage.setItem("data-layout-mode", "light");
        } else {
            sessionStorage.setItem("data-layout-mode", "dark");
        }
    });

    $(document).on("click", "#topnav-hamburger-icon", () => {
        if (sessionStorage.getItem("data-sidebar-size") == "lg") {
            sessionStorage.setItem("data-sidebar-size", "sm");
        } else {
            sessionStorage.setItem("data-sidebar-size", "lg");
        }
    });
});
