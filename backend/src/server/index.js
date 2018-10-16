// @flow
require("dotenv").config();
const Koa = require("koa");
const Router = require("koa-router");
const BodyParser = require("koa-bodyparser");
const Helmet = require("koa-helmet");
const KoaStatic = require("koa-static");

const app = new Koa();
const router = new Router();

const PORT =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_PORT || 4001
    : process.env.PORT || 4000;
app.use(Helmet());

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

if (process.env !== "test") app.use(KoaStatic("./build"));

const server = app.listen(
  PORT,
  () => console.log(`API server started on ${PORT}`) // eslint-disable-line
);

module.exports = server;
