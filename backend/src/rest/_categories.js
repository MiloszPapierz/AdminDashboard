const Router = require("@koa/router");
const categoryService = require("../service/category");
const Joi = require("joi");
const validate = require("./_validation");
const { hasPermission } = require("../core/auth");

const getAll = async (ctx) => {
  ctx.body = await categoryService.getAll();
};

const create = async (ctx) => {
  const newCategory = await categoryService.create(ctx.request.body);
  ctx.body = newCategory;
  ctx.status = 201;
};
create.validationScheme = {
  body: {
    categoryName: Joi.string().min(3),
  },
};

const update = async (ctx) => {
  ctx.body = await categoryService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
};
update.validationScheme = {
  body: {
    categoryName: Joi.string().min(3),
  },
  params: Joi.object({
    id: Joi.number().integer().positive(),
  }),
};

const deleteById = async (ctx) => {
  await categoryService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  }),
};

module.exports = (app) => {
  const router = new Router({ prefix: "/categories" });

  router.get("/", hasPermission(), getAll);
  router.post("/", hasPermission(), validate(create.validationScheme), create);
  router.put(
    "/:id",
    hasPermission(),
    validate(update.validationScheme),
    update
  );
  router.delete(
    "/:id",
    hasPermission(),
    validate(deleteById.validationScheme),
    deleteById
  );

  app.use(router.routes());
  app.use(router.allowedMethods());
};
