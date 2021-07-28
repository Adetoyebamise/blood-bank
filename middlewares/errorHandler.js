const errorHandler = (err, req, res, next) => {
  if (err) {
    //catches all errors although it is catching only duplicate email errors for now
    console.log(err);
    res
      .status(400)
      .json({ status: "Bad request", err: "Something went wrong" });
  }
};

module.exports = (app) => {
  app.use(errorHandler);
};
