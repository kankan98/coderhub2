const labelService = require("../service/label.service");

const verifyLabelExists = async (ctx, next) => {
  // 1.获取客户端传递过来的所有labels
  const { labels } = ctx.request.body;

  // 2.判断所有得labels中得name是否已经存在label表
  const newLabels = [];
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name);
    const labelObj = { name };
    if (result) {
      // 获取name对应的label的id
      labelObj.id = result.id; // => {name:"篮球",id: 1}
    } else {
      // 插入name，获取插入后新的label的id
      const insertResult = await labelService.create(name);
      labelObj.id = insertResult.insertId;
    }
    newLabels.push(labelObj);
    ctx.labels = newLabels;
  }

  await next();
};

module.exports = {
  verifyLabelExists,
};
