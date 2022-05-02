import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    itemsInOrder: [
        {
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    shippingInfo: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        zipCode: {type: String, required: true},
        country: {type: String, required: true}
    },
    paymentInfo: {
        type: String,
        required: true
    },
    paymentSummary: {
        id: String,
        status: String,
        updateTime: String,
        email: String
    },
    taxCost: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingCost: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalCost: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    }

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

const Order = mongoose.model('Order', orderSchema);
export default Order;