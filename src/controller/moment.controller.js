const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 1. 获取动态的内容
    const { content } = ctx.request.body;

    // 2.动态由谁发表（token -> id/name）
    const { id } = ctx.user;
    const result = await momentService.create(content, id);
    ctx.body = {
      code: 0,
      message: "创建用户动态成功~",
      data: result,
    };
  }

  async list(ctx, next) {
    // 获取offset/size
    const { page, size } = ctx.query;
    // 从数据库中查询动态列表
    const result = await momentService.queryList(page, size);

    // 返回数据
    ctx.body = {
      code: 0,
      data: result,
    };
  }
  async detail(ctx, next) {
    // 获取当前动态id
    const { momentId } = ctx.params;
    const result = await momentService.queryListById(momentId);

    ctx.body = {
      code: 0,
      data: result[0],
    };
  }

  async remove(ctx, next) {
    // 1.获取删除动态的id
    const { momentId } = ctx.params;
    // 执行删除操作
    const result = await momentService.remove(momentId);

    ctx.body = {
      code: 0,
      message: "删除成功",
      darta: result[0],
    };
  }

  async update(ctx, next) {
    try {
      // 1。获取要修改的动态的id
      const { momentId } = ctx.params;
      // 修改的内容
      const { content } = ctx.request.body;

      // 3.执行数据库操作
      const result = await momentService.update(momentId, content);
      ctx.body = {
        code: 0,
        message: "修改动态成功~",
        data: result,
      };
    } catch (err) {
      console.log(err);
    }
  }

  // 为moment添加label
  async addLabels(ctx, next) {
    // 1.获取一些参数
    const { labels } = ctx;
    const { momentId } = ctx.params;
    try {
      // 2.将moment_id和label_id添加到moment_label关系表
      for (const label of labels) {
        // 2.1判断label_id是否已经和moment_idy已经关联
        const isExists = await momentService.hasLabel(momentId, label.id);
        if (!isExists) {
          // 2.2 不存在moment_id和label_id的关系
          const result = await momentService.addLabel(momentId, label.id);
        }
      }
      ctx.body = {
        code: 0,
        message: "为动态添加标签成功~",
      };
    } catch (err) {
      ctx.body = {
        code: -3001,
        message: "为动态添加标签失败，请检查数据~",
      };
    }
  }
}

module.exports = new MomentController();
