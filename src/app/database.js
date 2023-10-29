const mysql = require("mysql2");
// 1.创建数据库连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "coderhub",
  user: "root",
  password: "dengkui123",
  connectionLimit: 5,
});
// 2.获取连接是否成功
connectionPool.getConnection((err, connection) => {
  // 1.判断是否有错误信息
  if (err) {
    console.log("获取连接失败");
    return;
  }

  // 2.获取connection吗，尝试和数据库建立一下连接
  connection.connect((err) => {
    if (err) {
      console.log("和数据库交互失败", err);
    } else {
      console.log("数据库交互成功，可以操作数据库~");
    }
  });
});

const connection = connectionPool.promise();

module.exports = connection;
