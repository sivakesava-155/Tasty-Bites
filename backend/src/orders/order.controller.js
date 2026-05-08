const mongoose = require("mongoose");
const orderService = require("./order.service");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const createRequestTag = () => `order-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const getErrorDetails = (error) => {
  if (!error) return {};

  if (error.name === "ValidationError" && error.errors) {
    return Object.fromEntries(
      Object.entries(error.errors).map(([field, value]) => [
        field,
        value.message,
      ])
    );
  }

  return {};
};

const createOrder = async (req, res) => {
  const requestTag = createRequestTag();
  try {
    const payload = { ...req.body };
    const order = await orderService.createOrder(payload);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

const getAllOrders = async (_req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?.id;
    if (!userId || !isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const orders = await orderService.getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId || !isValidObjectId(userId)) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const orders = await orderService.getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const updatedOrder = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const deletedOrder = await orderService.deleteOrder(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder,
};
