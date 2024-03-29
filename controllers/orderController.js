const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create New Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({ success: true, order });
});

// Get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return new ErrorHandler("Order not found with this Id", 404);
  }
  res.status(200).json({ success: true, order });
});

// Get Logged-In User Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({ success: true, orders });
});

// Get All Orders (Admin)
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({ success: true, totalAmount, orders });
});

// Update Order status (Admin)
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return new ErrorHandler("Order not found with this Id", 404);
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order has been delivered already", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (ordr) => {
      if (ordr.product.stock < ordr.quantity) {
        return new ErrorHandler(`Product's stock is not enough`, 400);
      }
      await updateStock(ordr.product, ordr.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order (Admin)
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return new ErrorHandler("Order not found with this Id", 404);
  }

  await order.remove();
  res.status(200).json({ success: true });
});
