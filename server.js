const express = require("express");
const app = express();
const logger = require('./config/logger');
const port = 3000 || process.env.PORT;
const route = require("./routes/index");
const connectDB = require("./dbConnection");
const middleware = require("./middlewares/index");
const requestRoute = require('./routes/userRoute')
//const userRequestController = require('./controllers/user-controller/userRequestController')

middleware(app);
route(app);

// set up app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', requestRoute);
// app.use('/api/v1/user/user:id/history/requestsummary', async (req, res)=>{
//     userRequestController.getUniqId


//connect to db
connectDB(app);

app.listen(port, () => {
    console.log(`listening on port:${port}`)
})
