const Order = require("../../models/Order");


async function createOrder(req, res) {

  console.log("===== createOrder called =====");
  console.log("User:", req.user);
  console.log("Body:", req.body);
     const {
  table,
  restaurant,
  items,
  subtotal,
  tax,
  fee,
  total,
  transit,
  arrivalEta,
} = req.body;
     if (!table || !restaurant || !items) {
  return res.status(400).json({
    success: false,
    message: "Table, restaurant and items are required.",
  });
}

  console.log("Table:", table);
  console.log("Restaurant:", restaurant);
  console.log("Items:", items);

     console.log(req.body);
     console.log("Saving order...");
    const savedOrder = await Order.create({
  table,
  restaurant,
  items,
  subtotal,
  tax,
  fee,
  total,
  transit,
  arrivalEta,
  user: req.user.id,
});
  res.status(201).json({
  success: true,
  message: "Order received successfully! 🎉",
  data: savedOrder,
});
}

async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
module.exports = {
  createOrder,
  getMyOrders,
};