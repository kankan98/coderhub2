const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { create, list, detail, update, remove, addLabels } = require("../controller/moment.controller");
const { verifyPermission } = require("../middleware/permission.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");
const momentRouter = new KoaRouter({ prefix: "/moment" });

// 编写接口
// 1.增：新增动态
momentRouter.post("/", verifyAuth, create);
// 2.查：查询动态（列表id）
momentRouter.get("/", list);
momentRouter.get("/:momentId", detail);
// 3.删：删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);
// 4.改：修改动态
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);

// 5.添加标签
/**
 * *中间件:
  1.是否登灵
  2.验证是否有操作这个动态的权限
  3.额外中间件:验证label的name是否已经存在Label表中
  * 如果存在，那么直接使用即可
  * 如果没有存在，那么需要先将Label的name添加LabeL表
  4.最终步骤
  * 所有的Labels都在已经在Label表
  * 动态2，和labels关系，添加到关系表中
 */
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelExists, addLabels);
module.exports = momentRouter;
