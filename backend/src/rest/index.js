const Router = require("@koa/router");

const productsRouter = require("./_products");
const categoriesRouter = require("./_categories");
const ordersRouter = require("./_orders");

module.exports = (app) => {
  const router = new Router({ prefix: "/api" });

  productsRouter(router);
  categoriesRouter(router);
  ordersRouter(router);

  app.use(router.routes());
  app.use(router.allowedMethods());
};
