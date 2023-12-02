const fs = require("fs");

const registerRoutes = (app) => {
  // 1.读取当前文件夹下所有文件

  fs.readdirSync(__dirname)
    .filter((file) => {
      return file.indexOf(".") !== 0 && file.endsWith("router.js");
    })
    .forEach((file) => {
      const router = require(`./${file}`);
      app.use(router.routes());
      app.use(router.allowedMethods());
    });
};

module.exports = registerRoutes;
