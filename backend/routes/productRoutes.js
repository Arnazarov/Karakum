import express from "express";
import Product from '../models-schemas/productModel.js';

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get('/', (req, res) => {

    Product.find((err, products) => {
        if (products) {
            res.send(products);
        } else {
            res.status(404).json({ message: 'Products not found', stack: err.stack });
        }
    })
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', (req, res) => {

    Product.findById(req.params.id, (err, product) => {
        if (product) {
            res.send(product);
        } else {
            res.status(404).json({ message: 'Product not found', stack: err.stack });
        }
    })
});

export default router;