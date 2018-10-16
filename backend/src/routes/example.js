const Router = require("koa-router");

const router = new Router();
const example = require("../controllers/example");

/* Fetch all books and display them */
router.get("/", async ctx => {
  try {
    const ex = await example.get();
    ctx.body = {
      status: "success",
      data: ex
    };
  } catch (err) {
    throw err;
  }
});
// router.post("/", example.create);
// router.post("/:id", example.update);
// router.delete("/:id", example.destroy);

module.exports = router.routes();
