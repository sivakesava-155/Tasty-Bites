const mongoose = require("mongoose");
const orderService = require("./order.service");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
try {
  const orderResponse = await checkoutOrder({
    items: cartItems.map((item) => ({
      productName: item.name,
      price: item.price,
      quantity: item.quantity,
    })),

    taxAmount: taxCost,
    shippingAmount: shippingCost,
    discountAmount: discountAmount,
    status: "PENDING",
  });

  // Use backend generated order number
  const orderId = orderResponse.orderNumber;

  const templateParams = {
    user_email: userEmail,
    order_id: orderId,

    orders: cartItems.map((item) => ({
      name: item.name,
      price: item.price.toFixed(2),
      units: item.quantity,
    })),

    cost: {
      subtotal: totalAmount.toFixed(2),
      tax: taxCost.toFixed(2),
      shipping: shippingCost.toFixed(2),
      discount: discountAmount.toFixed(2),
      total: estimatedTotal,
    },
  };

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    templateParams,
    PUBLIC_KEY
  );

  clearCart();
  localStorage.removeItem("cartItems");

  setIsCheckedOut(true);
  setCheckoutSuccess(true);
  setCountdown(5);

  toast.success(
    "Order placed successfully! Check your email.",
    {
      position: "top-center",
      autoClose: 3000,
    }
  );

} catch (err) {
  console.error("Checkout Error:", err);

  toast.error(
    "Checkout failed. Please try again.",
    {
      position: "top-center",
    }
  );
} finally {
  setIsCheckingOut(false);
}

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
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
};
