const Router = require("@koa/router");
const orderService = require("../service/order");
const Joi = require("joi");
const validate = require("./_validation");
const { hasPermission } = require("../core/auth");

const getAll = async (ctx) => {
  ctx.body = await orderService.getAll();
};

const updateById = async (ctx) => {
  ctx.body = await orderService.updateById(ctx.params.id, {
    ...ctx.request.body,
    orderDate: new Date(ctx.request.body.orderDate),
  });
};
updateById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  }),
  body: {
    orderDate: Joi.date().iso().less("now"),
    orderStatus: Joi.string(),
    orderLocation: Joi.string(),
    products: Joi.array().items(Joi.object()).optional(),
  },
};

const deleteById = async (ctx) => {
  await orderService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  }),
};

module.exports = (app) => {
  const router = new Router({ prefix: "/orders" });

  router.get("/", hasPermission(), getAll);
  router.put(
    "/:id",
    hasPermission(),
    validate(updateById.validationScheme),
    updateById
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
