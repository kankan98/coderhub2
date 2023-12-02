const connection = require("../app/database");

class MomentService {
  async create(content, userId) {
    const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?);";
    // 3.执行sql语句
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  async queryList(page = 1, size = 10) {
    const offset = (page - 1) * size;
    // const statement = "SELECT * FROM moment LEFT JOIN LIMIT ? OFFSET ?;";
    const statement = `SELECT moment.id id,moment.content content,moment.createAt createTime, moment.updateAt updateTime, 
                      JSON_OBJECT('id', user.id, 'name',user.name,'avatar',user.avatar_url,'createTime',user.createAt,'updateTime',user.updateAt) user,
                      (SELECT COUNT(*) FROM comment WHERE comment.moment_id = moment.id) commentCount,
                      (SELECT COUNT(*) FROM moment_label WHERE moment_label.moment_id = moment.id) labelCount
                      FROM moment LEFT JOIN user ON moment.user_id = user.id ORDER BY moment.id LIMIT ? OFFSET ?`;
    const [result] = await connection.execute(statement, [size, offset]);
    return result;
  }

  async queryListById(id) {
    // const statement = "SELECT * FROM moment LEFT JOIN LIMIT ? OFFSET ?;";
    const statement = `SELECT moment.id id,moment.content content,moment.createAt createTime, moment.updateAt updateTime, 
     JSON_OBJECT('id', user.id, 'name',user.name,'avatar', user.avatar_url, 'createTime',user.createAt,'updateTime',user.updateAt) user,
     (
      JSON_ARRAYAGG(JSON_OBJECT('id',comment.id, 'content', comment.content, 'commentId', comment.comment_id,
      'user',JSON_OBJECT('id', cu.id, 'name', cu.name)
      ))
    ) comments
     FROM moment LEFT JOIN user ON moment.user_id = user.id
     LEFT JOIN comment on comment.moment_id = moment.id 
     LEFT JOIN user cu ON cu.id = comment.user_id
     WHERE moment.id = ? GROUP BY moment.id;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async remove(id) {
    const statement = "DELETE FROM moment WHERE id = ?;";
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async update(id, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, id]);
    return result;
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return !!result.length;
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
