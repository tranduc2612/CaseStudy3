const AuthController = require("../Controllers/AuthController.js");
const sitesController = require("../Controllers/SitesController");
const categoryController = require("../Controllers/CategoryController");
const url = require("url");
const fs = require("fs");
const qs = require("qs");
const PART = "Casestudy3";
const COMPUTER = "OSC" || "DELL";
const authController = AuthController.AccountController;
async function Router(req, res) {
  let parseUrl = url.parse(req.url, true);
  let path = parseUrl.pathname;
  // let trimPath = path.replace(/^\/+|\/+$/g, "");
  let mimeTypes = {
    webp: "image/webp",
    jpg: "images/jpg",
    png: "images/png",
    js: "text/javascript",
    css: "text/css",
    svg: "image/svg+xml",
    ttf: "font/ttf",
    woff: "font/woff",
    woff2: "font/woff2",
    eot: "application/vnd.ms-fontobject",
  };
  const filesDefences = path.match(
    /\.js|\.css|\.png|\.svg|\.jpg|\.ttf|\.woff|\.woff2|\.eot|\.webp/
  );

  if (filesDefences) {
    const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
    res.writeHead(200, { "Content-Type": extension });
    fs.createReadStream(
      "C:\\Users\\" + COMPUTER + "\\Desktop\\" + PART + "\\src\\Views" + req.url
    ).pipe(res);
  } else {
    console.log(path);
    switch (path) {
      case "/":
        if (req.method == "GET") {
          sitesController.showHomePage(req, res);
        }
        if (req.method == "POST") {
          authController.checkLogin(req, res);
          // sitesController.showHomePage(req, res);
        }
        break;
      case "/logout":
        console.log("hello");
        authController.logOut(req, res);
        break;
      case "/profile":
        authController.showProfilePage(req, res);
        break;
      case "/admin":
        authController.showAdminPage(req, res);
        break;
      case "/registers":
        authController.showRegisterPage(req, res);
        break;
      case "/login":
        if (req.method == "GET") {
          authController.showLoginPage(req, res);
        }
        break;
      case "/about-us":
        sitesController.showAboutUsPage(req, res);
        break;
      case "/category":
        categoryController.showCategoryPage(req, res);
        break;
      case "/cart/":
        categoryController.addToCart(req, res);
        break;
      case "/cart":
        if (req.method == "GET") {
          categoryController.showCart(req, res);
        }
        if (req.method == "POST") {
          categoryController.BillCart(req, res);
        }
        break;
      case "/category/product":
        categoryController.showProductPage(req, res);
        break;
      default:
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>No found page !</h1>");
        return res.end();
    }
  }
}

module.exports = Router;
