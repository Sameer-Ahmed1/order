const mongoose = require("mongoose");

const Package = new mongoose.Schema({
  length: Number,
  breadth: Number,
  height: Number,
  weight: Number,
  items: [
    {
      name: String,
      quantity: Number,
    },
  ],
});

const Trip = new mongoose.Schema({
  shipperName: String,
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
  },
});

const orderSchema = new mongoose.Schema({
  senderName: String,
  senderCoordinates: String, // eg. '28.361136640146 N, 81.5087592601776 W'
  recipientName: String,
  recipientCoordinates: String,
  packages: [Package],
  trips: [Trip],
});

// orderSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = mongoose.model("Order", orderSchema);
