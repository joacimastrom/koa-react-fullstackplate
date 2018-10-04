// @flow
const Koa = require("koa");
const Router = require("koa-router");
const BodyParser = require("koa-bodyparser");
const Helmet = require("koa-helmet");

const app = new Koa();
const router = new Router();

app.use(Helmet());

app.use(ctx => {
  ctx.body = "Waddup world";
});

app.use(
  BodyParser({
    enableTypes: ["json"],
    jsonLimit: "5mb",
    strict: true,
    onerror(err, ctx) {
      ctx.throw("body parse error", 422);
    }
  })
);

require("../routes")(router);

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
