const express = require("express");
const app = express();
const connectDB = require("./dbConnection");

//connect to db
connectDB(app);

// app.listen(3000, () => {
//   logger.log("info", `Alive on port ${port}`);
// });
