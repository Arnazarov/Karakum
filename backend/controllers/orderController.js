import Order from '../models-schemas/orderModel.js';
import DemoOrder from '../models-schemas/demoOrderModel.js';

// @desc    Create an order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const {
      itemsInOrder,
      shippingInfo,
      paymentInfo,
      paymentSummary,
      taxCost,
      shippingCost,
      totalCost,
    } = req.body;

    if (itemsInOrder && itemsInOrder.length === 0) {
      res.status(400);
      next(new Error('No order items'));
      return;
    } else {
      const order = new DemoOrder({
        user: req.user._id,
        itemsInOrder,
        shippingInfo,
        paymentInfo,
        paymentSummary,
        taxCost,
        shippingCost,
        totalCost,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  } catch (err) {
    console.error(err);
  }
};

// @desc    Fecth an order by id
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res, next) => {
  try {
    const order = await DemoOrder.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      next(new Error('Order not found :('));
    }
  } catch (err) {
    console.error(err);
  }
};

// @desc    Update order with pay status
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderWithPay = async (req, res, next) => {
  try {
    const order = await DemoOrder.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentSummary = {
        id: req.body.id,
        status: req.body.status,
        updateTime: req.body.update_time,
        email: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      next(new Error('Order not found :('));
    }
  } catch (err) {
    console.error(err);
  }
};

// @desc    Fetch orders of a logged in user
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await DemoOrder.find({ user: req.user._id });

    res.json(orders);
  } catch (err) {
    console.error(err);
  }
};

// @desc    Fetch all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');

    res.json(orders);
  } catch (err) {
    console.error(err);
  }
};

// @desc    Update order with delivery status
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderWithDelivery = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      next(new Error('Order not found :('));
    }
  } catch (err) {
    console.error(err);
  }
};
