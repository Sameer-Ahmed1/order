const getOrderStatus = (trips) => {
  let responseData = {};
  for (let i = 0; i < trips.length; i++) {
    const trip = trips[i];
    responseData = {
      ...trip,
    };
    delete responseData.tripStatus;
    delete responseData.id;
    if (trip.tripStatus === "not started") {
      responseData.orderStatus = "ready for pickup";
      break;
    } else if (trip.tripStatus === "delivered") {
      if (i === trips.length - 1) {
        responseData.orderStatus = trip.tripStatus;
        break;
      }
    } else {
      responseData.orderStatus = trip.tripStatus;
      break;
    }
  }
  return responseData;
};
module.exports = { getOrderStatus };
