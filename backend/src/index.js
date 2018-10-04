// @flow
require("dotenv").config();
const server = require("./server");

const add = (a, b) => a + b;

const port = process.env.PORT || 8000;
server.listen(
  port,
  () => add(1, 2) || console.log(`API server started on ${port}`)
);
