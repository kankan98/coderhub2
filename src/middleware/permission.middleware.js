const { OPERATION_IS_NOT_ALLOWED, RESOURCE_IS_NOT_EXISTS } = require("../config/error");
const permissionService = require("../service/permission.service");

const verifyPermission = async (ctx, next) => {
  // 1.获取登录用户的id/修改动态的id

  const { id } = ctx.user;
  // const { momentId } = ctx.params;
  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");
  // 2.查询是否存在该动态
  const isExists = await permissionService.checkResourceExists(resourceName, resourceId);
  if (!isExists) {
    return ctx.app.emit("error", RESOURCE_IS_NOT_EXISTS, ctx);
  }
  // 3.查询user的id是否有修改momentId的权限
  // const isPermission = await permissionService.checkMoment(momentId, id);
  const isPermission = await permissionService.checkResource(resourceName, resourceId, id);
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }
  // 3.执行下一个中间件
  await next();
};

module.exports = {
  verifyPermission,
};
