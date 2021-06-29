const express = require("express");
const app = express();
const logger = require("./configs/logger");
const port = 3000 || process.env.PORT;
app.listen(3000, () => {
  logger.log("info", `Alive on port ${port}`);
});
