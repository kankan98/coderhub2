const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { create, reply, remove } = require("../controller/comment.controller");
const { verifyPermission } = require("../middleware/permission.middleware");
const commentRouter = new KoaRouter({ prefix: "/comment" });

// 增： 新增评论
commentRouter.post("/", verifyAuth, create);
// 增： 回复评论
commentRouter.post("/reply", verifyAuth, reply);

// 删： 删除评论
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove);
module.exports = commentRouter;
