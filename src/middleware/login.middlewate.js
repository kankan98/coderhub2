const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRENT } = require("../config/error");
const userService = require("../service/user.service");
const { md5password } = require("../utils/md5");

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 1.判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 2.查询该用户是否存在
  const users = await userService.findUserName(name);
  const user = users[0];

  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }
  // 3.擦汗寻数据库中密码和用户输入的密码是否一致
  if (user.password !== md5password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }
  // 执行next,下一个中间件
  ctx.user = user;
  await next();
};

module.exports = {
  verifyLogin,
};
