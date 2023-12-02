const fs = require("fs");
const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { UPLOAD_PATH } = require("../config/path");
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
  async showAvatarImage(ctx, next) {
    // 1.获取用户信息
    const { userId } = ctx.params;
    // 2.获取userId对应的头像信息
    const avatarInfo = await fileService.queryAvatarWithUserId(userId);
    console.log(avatarInfo);
    // 3.读取头像所在的文件
    const { filename, mimetype } = avatarInfo;
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  }
}

module.exports = new UserController();
