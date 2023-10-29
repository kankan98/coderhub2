const KoaRouter = require("@koa/router");
const { sign } = require("../controller/login.controller");
const { verifyLogin } = require("../middleware/login.middlewate");

const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/", verifyLogin, sign);

module.exports = loginRouter;
