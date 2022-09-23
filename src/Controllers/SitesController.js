const fs = require("fs");
const qs = require("qs");
const AccountController = require("../Controllers/AuthController.js");
const user = require("../Model/User");

const cookieAndSession = AccountController.CookieAndSession;
class SitesController {
  async showHomePage(req, res) {
    let isLogin = cookieAndSession.checkingSession(req);
    await fs.readFile("./src/Views/home.html", "utf-8", (err, data) => {
      if (err) {
        console.log(err.message);
      }

      if (isLogin) {
        data = data.replace("header__user-login", "header__user-login hidden");
        data = data.replace(
          "header__user-register",
          "header__user-register hidden"
        );
        data = data.replace("header__user-auth hidden", "header__user-auth");
        data = data.replace("{Your Name !}", isLogin[1]);
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  }

  async showAboutUsPage(req, res) {
    let isLogin = cookieAndSession.checkingSession(req);
    fs.readFile("./src/Views/aboutus.html", "utf-8", function (err, data) {
      if (err) {
        console.log(err.message);
      }
      if (isLogin) {
        data = data.replace("header__user-login", "header__user-login hidden");
        data = data.replace(
          "header__user-register",
          "header__user-register hidden"
        );
        data = data.replace("header__user-auth hidden", "header__user-auth");
        data = data.replace("Your Name !", isLogin[1]);
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  }
}

module.exports = new SitesController();
