const Order = require("./order.model");

const STATUS_VALUES = ["PENDING", "ACCEPTED", "DECLINED", "CANCELLED"];

const normalizeItems = (orderData = {}) => {
  if (Array.isArray(orderData.items) && orderData.items.length > 0) {
    return orderData.items.map((item) => {
      const product = item.product || {};
      return {
        product: {
          productId: product.productId || item.productId,
          productName: product.productName || item.productName,
          productImage: product.productImage || item.productImage || "",
          category: product.category || item.category || "",
          description: product.description || item.description || "",
          price: Number(product.price ?? item.price ?? 0),
        },
        quantity: Number(item.quantity || 1),
      };
    });
  }

  if (Array.isArray(orderData.cartItems) && orderData.cartItems.length > 0) {
    return orderData.cartItems.map((item) => ({
      product: {
        productId: item.productId || item._id || item.id,
        productName: item.productName || item.name,
        productImage: item.productImage || item.image || "",
        category: item.category || "",
        description: item.description || "",
        price: Number(item.price ?? 0),
      },
      quantity: Number(item.quantity || 1),
    }));
  }

  return [];
};

const calculateSubtotal = (items = []) =>
  items.reduce((total, item) => total + item.product.price * item.quantity, 0);

const createOrder = async (orderData) => {
  const items = normalizeItems(orderData);
  if (items.length === 0) {
    throw new Error("Order must contain at least one item");
  }

  const subtotal = calculateSubtotal(items);
  const taxAmount = Number(orderData.taxAmount || 0);
  const shippingAmount = Number(orderData.shippingAmount || 0);
  const discountAmount = Number(orderData.discountAmount || 0);
  const totalAmount = subtotal + taxAmount + shippingAmount - discountAmount;

  const orderNumber = `TB${Date.now()}`;
  const status = STATUS_VALUES.includes(orderData.status)
    ? orderData.status
    : "PENDING";

  return Order.create({
    ...orderData,
    items,
    orderNumber,
    subtotal,
    taxAmount,
    shippingAmount,
    discountAmount,
    totalAmount,
    status,
  });
};

const getAllOrders = async () => Order.find().sort({ createdAt: -1 });

const getOrderById = async (id) => Order.findById(id);

const getOrdersByUser = async (userId) =>
  Order.find({ userId }).sort({ createdAt: -1 });

const updateOrderStatus = async (id, status) => {
  if (!STATUS_VALUES.includes(status)) {
    throw new Error("Invalid order status");
  }

  return Order.findByIdAndUpdate(id, { status }, { new: true });
};

const deleteOrder = async (id) => Order.findByIdAndDelete(id);

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder,
};
