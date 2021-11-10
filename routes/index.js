const bloodbankRoutes = require("./bloodBankRoutes");
const userRoutes = require("./userRoutes");

module.exports = (app) => {
  app.use("/api/v1/user", userRoutes);   // user routes
  app.use("/api/v1/bloodbank", bloodbankRoutes);    // bloodbank routes
};
