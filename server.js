const express = require("express");
const app = express();
const logger = require('./config/logger');
const port = 3000 || process.env.PORT;
const route = require("./routes/index");
const connectDB = require("./dbConnection");

//connect to db
connectDB(app);

app.listen(port, () => {
    console.log(`listening on port:${port}`)
})