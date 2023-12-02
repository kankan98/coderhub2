const app = require("../app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  OPERATION_IS_NOT_ALLOWED,
  RESOURCE_IS_NOT_EXISTS,
} = require("../config/error");

app.on("error", (error, ctx) => {
  let code = 0;
  let msg = "";
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      msg = "用户名或密码不能为空~";
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      msg = "用户名已被占用~";
      break;
    case NAME_IS_NOT_EXISTS:
      code = -1003;
      msg = "用户名不存在~";
      break;
    case PASSWORD_IS_INCORRENT:
      code = -1004;
      msg = "输入的密码错误，请检查密码~";
      break;
    case UNAUTHORIZATION:
      code = -1005;
      msg = "无效的token或者token已过期~";
      break;
    case RESOURCE_IS_NOT_EXISTS:
      code = -1006;
      msg = "资源不存在~";
      break;
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001;
      msg = "没有操作该资源的权限~";
      break;
  }
  ctx.body = {
    code,
    msg,
  };
});
