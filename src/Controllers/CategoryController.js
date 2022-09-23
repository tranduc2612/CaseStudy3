const fs = require("fs");
const qs = require("qs");
const url = require("url");
const product = require("../Model/Product");
const AccountController = require("../Controllers/AuthController.js");
const cookieAndSession = AccountController.CookieAndSession;
const accountController = AccountController.AccountController;

class CategoryController {
  async loadDataInForm(req) {
    let data = "";
    return new Promise((resolve, reject) => {
      req.on("data", (chunks) => {
        data += chunks;
      });
      req.on("end", () => {
        data = qs.parse(data);
        resolve(data);
      });
      req.on("error", (err) => {
        reject(err);
      });
    });
  }

  async showCategoryPage(req, res) {
    await fs.readFile(
      "./src/Views/categoryAll.html",
      "utf-8",
      async function (err, data) {
        let html = "";
        let isLogin = cookieAndSession.checkingSession(req);
        if (err) {
          console.log(err.message);
        }
        let productLists = await product.getListProduct();
        productLists.forEach((e) => {
          html += `<a class="home__product-item col l-4 m-4 c-6" href="/category/product?${e.ProductsID}">            
          <div class="home__product-item__img" style="background-image: url(../img//AllProduct/${e.img});">
          </div>
          <div class="home__product-item__action">
              <div class="home__product-item__rating">
                  <input type="radio" name="produce1" id="1__star5" value="5">
                  <label for="1__star5" class="fas fa-star"></label>
                  <input type="radio" name="produce1" id="1__star4" value="4">
                  <label for="1__star4" class="fas fa-star"></label>
                  <input type="radio" name="produce1" id="1__star3" value="3">
                  <label for="1__star3" class="fas fa-star"></label>
                  <input type="radio" name="produce1" id="1__star2" value="2">
                  <label for="1__star2" class="fas fa-star"></label>
                  <input type="radio" name="produce1" id="1__star1" value="1">
                  <label for="1__star1" class="fas fa-star"></label>
              </div>
          </div>
          <p class="home__product-item__name">${e.productsName}</p>
          <div class="home__product-item__price">
              <span class="home__product-item__price-current">$${e.currentPrice}</span>
              <span class="home__product-item__price-old">$${e.oldPrice}</span>                 
          </div>
      </a>`;
        });
        data = data.replace("{Products-List-Category}", html);
        if (isLogin) {
          data = data.replace(
            "header__user-login",
            "header__user-login hidden"
          );
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
      }
    );
  }

  async showProductPage(req, res) {
    const handleUrl = url.parse(req.url);
    const idProduct = handleUrl.query;
    const productData = await product.getProductById(idProduct);
    let isLogin = cookieAndSession.checkingSession(req);
    await fs.readFile(
      "./src/Views/product.html",
      "utf-8",
      function (err, data) {
        if (err) {
          console.log(err.message);
        }
        if (isLogin) {
          data = data.replace(
            "header__user-login",
            "header__user-login hidden"
          );
          data = data.replace(
            "header__user-register",
            "header__user-register hidden"
          );
          data = data.replace("header__user-auth hidden", "header__user-auth");
          data = data.replace("Your Name !", isLogin[1]);
        }
        productData.forEach((e) => {
          data = data.replace("src_img_database", e.img);
          data = data.replace("{current-price}", "$" + e.currentPrice);
          data = data.replace("{old-price}", "$" + e.oldPrice);
          data = data.replace(
            'href="/cart"',
            `href="/cart/?idProduct=${e.ProductsID}&idUser=${isLogin[0]}&quantity=1"`
          );
          data = data.replace(
            'href="/cart"',
            `href="/cart/?idProduct=${e.ProductsID}&idUser=${isLogin[0]}&quantity=1"`
          );
          data = data.replace("{name-product}", e.productsName);
          data = data.replace("{name-product-title}", e.productsName);
        });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    );
  }

  async addToCart(req, res) {
    const handleUrl = url.parse(req.url, true).query;
    const idProduct = handleUrl.idProduct;
    const idUser = handleUrl.idUser;
    const quantity = handleUrl.quantity;
    const data = await product.checkCartExistProduct(idUser, idProduct);
    if (!data.length) {
      await product.addToCart(idUser, idProduct);
    } else {
      await product.changeSLBan(idUser, idProduct, Number(quantity));
    }
    res.statusCode = 302;
    res.setHeader("Location", "/cart");
    res.end();
  }

  async showCart(req, res) {
    let isLogin = cookieAndSession.checkingSession(req);
    let idUser = isLogin[0];
    const cartData = await product.showCart(idUser);
    let html = ``;
    if (isLogin) {
      await fs.readFile("./src/Views/cart.html", "utf-8", function (err, data) {
        if (err) {
          console.log(err.message);
        }
        cartData.forEach((e) => {
          html += `
          <div class="cart__product">
          <div class="row">
              <div class="col-1 m-auto text-center">
                  <input name="idProducts" style="width:2rem;height:2rem;" type="checkbox" value=${e.ProductsID} id=${e.ProductsID} checked>
              </div>
              <div class="col align-self-center">
                  <img src="../img//AllProduct/${e.img}" alt="" width="140px" height="115px">
              </div>

              <div class="col-3 align-self-center">
                  <p class="text-break fs-3">${e.productsName}</p>
              </div>
              
              <div class="col align-self-center">
                  <p class="text-center text-break fs-3 text_product">${e.currentPrice}</p>
              </div>
              <div class="col align-self-center text-center">
                  <input class="cart_quantity" min="0" value=${e.slBan} type="number" name="" style="width:50px; font-size:1.9rem">
              </div>
              <div class="col align-self-center">
                  <p class="text-center text-break fs-3 text_bill">100</p>
              </div>
              <div class="col align-self-center text-center ">
                  <button type="button" class="btn btn-danger p-4">Delete</button>
              </div>
          </div>
      </div>
          `;
        });
        data = data.replace("{Cart-list}", html);
        data = data.replace("header__user-login", "header__user-login hidden");
        data = data.replace(
          "header__user-register",
          "header__user-register hidden"
        );

        data = data.replace("header__user-auth hidden", "header__user-auth");
        data = data.replace("Your Name !", isLogin[1]);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else {
      res.statusCode = 302;
      res.setHeader("Location", "/login");
      res.end();
    }
  }

  async BillCart(req, res) {
    let isLogin = cookieAndSession.checkingSession(req);
    let userID = isLogin[0];
    let data = await this.loadDataInForm(req);
    if (data.idProducts == undefined) {
      res.statusCode = 302;
      res.setHeader("Location", "/cart");
      res.end();
    } else {
      let idProduct = [...data.idProducts];
      const handleUrl = url.parse(req.url, true);
      const sumBill = handleUrl.search.replace("?", "");
      await product.addToBill(userID, sumBill);
      idProduct.forEach(async (e) => {
        await product.billProduct(userID, e);
      });
      res.statusCode = 302;
      res.setHeader("Location", "/cart");
      res.end();
      return res.end();
    }
  }
}

module.exports = new CategoryController();
