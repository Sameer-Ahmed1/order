const mongoose = require("mongoose");

const Package = new mongoose.Schema({
  length: Number,
  breadth: Number,
  height: Number,
  weight: Number,
  items: {
    type: [
      {
        name: String,
        quantity: Number,
      },
    ],
    required: true,
  },
});

const Trip = new mongoose.Schema({
  shipperName: {
    type: String,
    required: true,
  },
  startLocationCoordinates: String,
  endLocationCoordinates: String,
  tripStatus: {
    type: String,
    enum: [
      "not started",
      "out for pickup",
      "in transit",
      "out for delivery",
      "delivered",
    ],
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderCoordinates: String, // eg. '28.361136640146 N, 81.5087592601776 W'
  recipientName: {
    type: String,
    required: true,
  },
  recipientCoordinates: String,
  packages: { type: [Package], required: true },
  trips: { type: [Trip], required: true },
});

orderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.packages.forEach((package) => {
      package.id = package._id.toString();
      delete package._id;
      package.items.forEach((item) => {
        item.id = item._id.toString();
        delete item._id;
      });
    });
    returnedObject.trips.forEach((trip) => {
      trip.id = trip._id.toString();
      delete trip._id;
    });
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Order", orderSchema);
