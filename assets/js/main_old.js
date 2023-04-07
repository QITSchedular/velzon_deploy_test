$(document).ready(function () {
  // check login start
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
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
    apikey = getCookie("apikey");
    if (apikey == "" || apikey == null) {
      location.href = "/signin";
    }
  }
  chkLogin();
  // check login end

  // logout start
  $("#logout").on("click", function () {
    document.cookie = "apikey=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = "/logout";
  });
  // logout end

  $("#admin-navbar-nav").html(
    `<li class="menu-title"><span data-key="t-menu">Menu</span></li>
              <li class="nav-item">
                <a
                  class="nav-link menu-link"
                  href="/channelData"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards" data-page="channelData"
                >
                  <i class="las la-address-card"></i>
                  <span data-key="t-dashboards">Channel</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link menu-link" href="/contactData" data-page="contactData">
                  <i class="bx bxs-contact"></i>
                  <span data-key="t-apps">Contact List</span>
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link menu-link" href="/instanceData" data-page="instanceData">
                  <i class="ri-apps-2-line"></i>
                  <span data-key="t-apps">Instance</span>
                </a>
              </li>
              <!-- end Dashboard Menu -->
              <li class="nav-item">
                <a
                  class="nav-link menu-link"
                  href="/messageData"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards" data-page="messageData"
                >
                  <i class="las la-mail-bulk"></i>
                  <span data-key="t-dashboards">Message</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link menu-link"
                  href="/planData"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards" data-page="planData"
                >
                  <i class="las la-handshake"></i>
                  <span data-key="t-dashboards">Plans</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link menu-link"
                  href="/subscriptionData"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards" data-page="subscriptionData"
                >
                  <i class="las la-clipboard-list"></i>
                  <span data-key="t-dashboards">Subscription</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link menu-link"
                  href="/templateData"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards" data-page="templateData"
                >
                  <i class="mdi mdi-book-open-outline"></i>
                  <span data-key="t-dashboards">Templates</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link menu-link"
                  href="/usersData"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards" data-page="usersData"
                >
                  <i class="mdi mdi-account-group"></i>
                  <span data-key="t-dashboards">Users</span>
                </a>
              </li>`
  );

  $("#admin-navbar-nav .nav-item a").each(function () {
    var page = document.URL.split("/")[3];
    if (page == $(this).attr("data-page")) {
      $(this).addClass("active");
    }
  });
});
