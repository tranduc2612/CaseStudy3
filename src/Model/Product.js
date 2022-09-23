const db = require("./DBConnect");

class Product {
  async getListProduct() {
    let sql = "SELECT * from Products";
    return await db
      .runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }

  async getProductById(id) {
    let sql = `SELECT * from Products where ProductsID = ${id}`;
    return await db
      .runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }

  async checkCartExistProduct(idUser, idProduct) {
    let sql = `select * from cart where ProductsId = ${idProduct} and userId = ${idUser}`;
    return await db
      .runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }

  async changeSLBan(idUser, idProduct, slBan) {
    let sql = `UPDATE Cart
    SET SLBan = SLBan + ${slBan}
    WHERE ProductsID = ${idProduct} and userID = ${idUser};`;
    return await db
      .runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }

  async addToCart(idUser, idProduct) {
    let sql = `insert Cart(ProductsId,userId,SLban) value (${idProduct},${idUser},1)`;
    return await db
      .runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }

  async billProduct(userID, productID) {
    let sql = `delete from Cart where userID = ${userID} and ProductsID = ${productID};`;
    return await db
      .runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }

  async addToBill(id, sumBill) {
    let sql = `insert Bill(userID,TongTien) value (${id},${sumBill});`;
    return await db
      .runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }

  async showCart(id) {
    let sql = `select Products.ProductsID,img,productsName,currentPrice,slBan from Products
    inner join Cart on Products.ProductsID = Cart.ProductsID where Cart.userID = ${id};`;
    return await db
      .runMySQL(sql)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = new Product();
