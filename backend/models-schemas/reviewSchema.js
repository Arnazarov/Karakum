import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

export default reviewSchema;