const Order = require("../models/Order");
const orderRouter = require("express").Router();
orderRouter.get("/", async (request, response, next) => {
  try {
    console.log("inside get");
    const orders = await Order.find({});
    response.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});
orderRouter.post("/", async (request, response, next) => {
  try {
    const order = new Order(request.body);
    const savedOrder = await order.save();
    response.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
});
module.exports = orderRouter;
