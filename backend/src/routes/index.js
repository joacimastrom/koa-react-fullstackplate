const example = require("./example.js");

module.exports = router => {
  router.prefix("/v1");
  router.use("/example", example);
};
