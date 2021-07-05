const express = require("express");
const app = express();
// const logger = require("./configs/logger");
const port = 3000 || process.env.PORT;
const route = require("./routes/index");
const connectDB = require("./dbConnection");
const middleware = require("./middlewares/index");

middleware(app);
route(app);

// set up app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to db
connectDB(app);
