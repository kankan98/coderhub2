const userService = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    // 1.获取请求体中的数据
    const user = ctx.request.body;

    // 2.将数据保存到数据库
    const result = await userService.create(user);
    // 3.查看存储的结果，是否成功
    ctx.body = {
      message: "创建用户成功~",
      data: result,
    };
  }
}

module.exports = new UserController();
