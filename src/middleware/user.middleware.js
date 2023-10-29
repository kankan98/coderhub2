const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require("../config/error");
const userService = require("../service/user.service");
const md5 = require("../utils/md5");
const verifyUser = async (ctx, next) => {
  // 2.验证客户端传递过来的user是否可以保存到数据库中
  // 2.1 验证用户名是否存在
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 2.2 判断name是否已经被占用
  const isNameTaken = await userService.checkNameExists(name);
  if (isNameTaken) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }
  await next();
};

const handlePassword = async (ctx, next) => {
  // 1.取出密码
  const { password } = ctx.request.body;
  console.log(md5.md5password(password));
  // 2.对密码进行加密
  ctx.request.body.password = md5.md5password(password);
  // 3.执行下一个中间件
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
