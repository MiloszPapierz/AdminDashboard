const Router = require("@koa/router");
const productService = require("../service/product");
const { upload } = require("../core/multer");
const Joi = require("joi");
const validate = require("./_validation");
const { hasPermission } = require("../core/auth");

const getAll = async (ctx) => {
  ctx.body = await productService.getAll();
};

const create = async (ctx) => {
  const product = { ...ctx.request.body };
  ctx.body = await productService.create(product, ctx.request.file);
  ctx.status = 201;
};
create.validationScheme = {
  body: {
    productName: Joi.string(),
    unitPrice: Joi.number().positive(),
    unitsInStock: Joi.number().integer().min(0).optional(),
    categoryID: Joi.number().positive().integer(),
    image: Joi.any().optional(), //If no new image provided, empty string is being send in the body
  },
  file: Joi.any().optional(),
};

const updateById = async (ctx) => {
  ctx.body = await productService.updateById(
    ctx.params.id,
    {
      ...ctx.request.body,
    },
    ctx.request.file
  );
};
updateById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  }),
  body: {
    productName: Joi.string(),
    unitPrice: Joi.number().positive(),
    unitsInStock: Joi.number().integer().min(0).optional(),
    categoryID: Joi.number().positive().integer(),
    image: Joi.any().optional(), //If no new image provided, empty string is being send in the body
  },
  file: Joi.any().optional(),
};

const deleteById = async (ctx) => {
  await productService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  }),
};

module.exports = (app) => {
  const router = new Router({
    prefix: "/products",
  });

  router.get("/", hasPermission(), getAll);
  router.post(
    "/",
    hasPermission(),
    upload.single("image"),
    validate(create.validationScheme),
    create
  );
  router.put(
    "/:id",
    hasPermission(),
    upload.single("image"),
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
