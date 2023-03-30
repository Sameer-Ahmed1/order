const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const orderRouter = require("./controllers/order");
const middleware = require("./utils/middleware");
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    console.log("error connecting to mongoDB", error.message);
  });
app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);
module.exports = app;
