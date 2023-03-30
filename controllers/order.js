const Order = require("../models/Order");
const orderRouter = require("express").Router();
const helper = require("../utils/helper");
orderRouter.get("/", async (request, response, next) => {
  try {
    const orders = await Order.find({});
    response.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});
orderRouter.get("/status/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    let orderFound = await Order.findById(id);
    orderFound = orderFound.toJSON();
    console.log(orderFound);
    if (orderFound) {
      const trips = orderFound.trips;
      const responseData = helper.getOrderStatus(trips);
      response.status(200).json(responseData);
    } else {
      response.status(404).send({ error: "Order not found" });
    }
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
