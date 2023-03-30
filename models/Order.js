const mongoose = require("mongoose");

const Package = new mongoose.Schema({
  length: {
    type: Number,
    required: true,
  },
  breadth: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Trip = new mongoose.Schema({
  shipperName: {
    type: String,
    required: true,
  },
  startLocationCoordinates: {
    type: String,
    required: true,
  },
  endLocationCoordinates: {
    type: String,
    required: true,
  },
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
  senderCoordinates: {
    type: String, // eg. '28.361136640146 N, 81.5087592601776 W'
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  recipientCoordinates: {
    type: String,
    required: true,
  },
  packages: {
    type: [Package],
    required: true,
    validate: [(val) => val.length >= 1, "Must have minimum one package"],
  },
  trips: {
    type: [Trip],
    required: true,
  },
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
