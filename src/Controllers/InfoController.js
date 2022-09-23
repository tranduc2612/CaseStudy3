const fs = require("fs");
const qs = require("qs");
const AccountController = require("../Controllers/AuthController.js");
const cookieAndSession = AccountController.CookieAndSession;
class InfoController {
  show(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const userInfo = qs.parse(data);
      fs.readFile("./src/Views/info.html", "utf8", function (err, datahtml) {
        if (err) {
          console.log(err);
        }
        datahtml = datahtml.replace("{name}", userInfo.name);
        datahtml = datahtml.replace("{email}", userInfo.email);
        datahtml = datahtml.replace("{password}", userInfo.password);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(datahtml);
        return res.end();
      });
    });

    req.on("error", () => {
      console.log("error");
    });
  }
}

module.exports = new InfoController();
