const express = require("express");
const app = express();
// const logger = require("./configs/logger");
const port = 3000 || process.env.PORT;
const route = require('./route/index')
const connectDB = require('./dbConnection')

route(app)

//connect to db
connectDB(app);

app.listen(port, () => {
  console.log("info", `Alive on port ${port}`);
});
