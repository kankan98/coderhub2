const connection = require("../app/database");

class UserService {
  async create(user) {
    // 1.获取用户 user
    const { name, password } = user;

    // 2.拼接statement
    const statement = "INSERT INTO `user` (name,password) VALUES (?,?)";
    // 3.执行sql语句
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  async checkNameExists(name) {
    // 1.拼接statement
    const statement = "SELECT * FROM `user` WHERE name=?";
    // 2.执行sql语句
    const [result] = await connection.execute(statement, [name]);
    return result.length > 0;
  }
  async findUserName(name) {
    // 1.拼接statement
    const statement = "SELECT * FROM `user` WHERE name=?";
    // 2.执行sql语句
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
}

module.exports = new UserService();
