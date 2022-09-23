const db = require("./DBConnect");

class Users {
  async getListUser() {
    let sql = "SELECT * from Users";
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

module.exports = new Users();
