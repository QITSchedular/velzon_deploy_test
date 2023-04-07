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

function chkLogin() {
  var apikey = getCookie("apikey");
  if (apikey == "" || apikey == null) {
    location.href = "/signin";
  }
  $.ajax({
    url: "/userinfo",
    method: "GET",
    success: function (val) {
      if (
        val.length == undefined ||
        val.length == null ||
        val.length <= 0 ||
        val == 500
      ) {
        // document.cookie =
        //   "apikey=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        InternalServerError();
        location.href = "/signin";
      }
    },
  });
  userinfo();
}

function userinfo() {
  const apikey = getCookie("apikey");
  $.ajax({
    url: "/userinfo",
    method: "GET",
    success: function (val) {
      let Obj = {};
      for (let i = 0; i < val.length; i++) {
        Object.assign(Obj, val[i]);
      }
      if (Obj.image == null || Obj.image == "") {
        $(".profileimg").attr(
          "src",
          `../assets/images/users/user-dummy-img.jpg`
        );
      } else {
        $(".profileimg").attr(
          "src",
          `../assets/upload/profile/${apikey}/${Obj.image}`
        );
      }
      $(".profilename").html(Obj.uname);
    },
  });
}

function InternalServerError() {
  swal({
    title: "Internal server error",
    text: "try againg later",
    imageUrl: "assets/images/error500.png",
    // background: "#fff url(assets/images/error500.png)",
    timer: 4000,
    showConfirmButton: false,
    showCancelButton: false,
  });
}

$(document).ready(function () {
  $("#logout").on("click", function () {
    document.cookie = "apikey=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = "/signin";
  });

  $("#navbar-nav").html(
    `<li class="menu-title">
            <span data-key="t-menu">
                Menu
            </span>
        </li>
        <li class="nav-item">
            <a class="nav-link menu-link" href="/dashboard" data-page="dashboard">
                <i class="ri-dashboard-2-line"></i>
                <span data-key="t-dashboards">Dashboards</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link menu-link" href="/instance" data-page="instance">
                <i class="ri-apps-2-line"></i>
                <span data-key="t-apps">Instance</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link menu-link" href="/contact-list" data-page="contact-list">
                <i class="bx bxs-contact" ></i>
                <span data-key="t-apps">Contact list</span>
            </a>
        </li>
        
        <li class="nav-item">
            <a class="nav-link menu-link" href="/channels" data-page="channels">
                <i class="mdi mdi-account-group"></i>
                <span data-key="t-dashboards">Channels</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link menu-link" href="/bulkmail" data-page="bulkmail">
                <i class="las la-mail-bulk"></i>
                <span data-key="t-dashboards">Bulk Mail</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link menu-link" href="/customtemplate" data-page="customtemplate">
                <i class="las la-mail-bulk"></i>
                <span data-key="t-dashboards">Custom Template</span>
            </a>
        </li>`
  );

  $(".nav-item a").each(function () {
    var page = document.URL.split("/")[3];
    if (page == $(this).attr("data-page")) {
      $(this).addClass("active");
    }
  });
});
