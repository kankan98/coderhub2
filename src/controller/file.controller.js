const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { SERVER_HOST, SERVER_PORT } = require("../config/server");
class FileController {
  async create(ctx, next) {
    console.log(ctx.request.file);
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;

    // 2.将图片信息和用户id结合存起来
    const result = await fileService.create(filename, mimetype, size, id);

    // 3.将头像的地址信息保存到user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`;
    const result2 = await userService.updateUserAvatar(id, avatarUrl);
    ctx.body = {
      code: "",
      message: "头像上传成功~",
      data: result,
    };
  }
}

module.exports = new FileController();
