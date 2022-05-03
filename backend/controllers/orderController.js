import Order from "../models-schemas/orderModel.js";


// @desc    Create an order
// @route   POST /api/orders
// @access  Private
export const createOrder = async(req, res, next) => {
    try {
        const {itemsInOrder, shippingInfo, paymentInfo, paymentSummary, taxCost, shippingCost, totalCost} = req.body;

        if (itemsInOrder && itemsInOrder.length === 0) {
            res.status(400);
            next(new Error('No order items'))
            return;
        } else {
            const order = new Order({
                user: req.user._id,
                itemsInOrder, 
                shippingInfo, 
                paymentInfo, 
                paymentSummary, 
                taxCost, 
                shippingCost, 
                totalCost
            })

            const createdOrder = await order.save();

            res.status(201).json(createdOrder);
        }
    } catch(err) {
        console.error(err);
    }
}

// @desc    Fecth an order by id
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async(req, res, next) => {
    try {
        
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order)
        } else {
            res.status(404);
            next(new Error('Order not found :('));
        }
  
    } catch(err) {
        console.error(err);
    }
}

// @desc    Update order with pay status
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderWithPay = async(req, res, next) => {
    try {
        
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentSummary = {
                id: req.body.id,
                status: req.body.status,
                updateTime: req.body.update_time,
                email: req.body.payer.email_address
            }

            const updatedOrder = await order.save();

            res.json(updatedOrder)

        } else {
            res.status(404);
            next(new Error('Order not found :('));
        }
  
    } catch(err) {
        console.error(err);
    }
}

// @desc    Fetch orders of a logged in user
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async(req, res, next) => {
    try {
        
        const orders = await Order.find({user: req.user._id});

        res.json(orders);
  
    } catch(err) {
        console.error(err);
    }
}