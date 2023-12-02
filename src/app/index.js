const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const userRouter = require("../router/user.router");
const loginRouter = require("../router/login.router");
const registerRoutes = require("../router");
// 1.创建app对象
const app = new Koa();

// 2.对app使用中间件
app.use(bodyParser());
registerRoutes(app);

// 3.导出app
module.exports = app;
