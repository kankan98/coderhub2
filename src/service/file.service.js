const connection = require("../app/database");

class FileService {
  async create(filename, mimetype, size, user) {
    const statement = "INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);";
    const [result] = await connection.execute(statement, [filename, mimetype, size, user]);
    return result;
  }

  async queryAvatarWithUserId(userId) {
    const statement = "SELECT * FROM avatar WHERE user_id = ?;";
    const [result] = await connection.execute(statement, [userId]);
    return result.pop();
  }
}

module.exports = new FileService();
