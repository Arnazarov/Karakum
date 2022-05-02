import Order from "../models-schemas/orderModel";

// @desc    Create an order
// @route   POST /api/orders
// @access  Private

const createOrder = async(req, res, next) => {
    const {itemsInOrder, shippingInfo, paymentInfo, paymentSummary, taxCost, shippingCost, totalCost} = req.body;

    if (itemsInOrder && itemsInOrder.length === 0) {
        res.status(400);
        next(new Error('No order items'))
        return;
    } else {
        const order = new Order({
            user: req.user_id,
            itemsInOrder, 
            shippingInfo, 
            paymentInfo, 
            paymentSummary, 
            taxCost, 
            shippingCost, 
            totalCost
        })

        const createdOrder = await order.save();

        res.status(201).json(createOrder);
    }
}