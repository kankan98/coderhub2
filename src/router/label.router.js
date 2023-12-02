const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { create, list } = require("../controller/label.controller");

const labelRouter = new KoaRouter({ prefix: "/label" });

// 新增标签
labelRouter.post("/", verifyAuth, create);

// 查询标签列表
labelRouter.post("/list", verifyAuth, list);

module.exports = labelRouter;
