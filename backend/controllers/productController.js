import Product from '../models-schemas/productModel.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = (req, res) => {

    Product.find((err, products) => {
        if (products) {
            res.send(products);
        } else {
            res.status(404).json({ message: 'Products not found', stack: err.stack });
        }
    })
}

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = (req, res) => {

    Product.findById(req.params.id, (err, product) => {
        if (product) {
            res.send(product);
        } else {
            res.status(404).json({ message: 'Product not found', stack: err.stack });
        }
    })
}

// @desc    Delete single product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = (req, res) => {

    Product.findById(req.params.id, (err, product) => {
        if (product) {
            product.remove();
            res.json({message: 'Product deleted!'});
        } else {
            res.status(404).json({ message: 'Product not found', stack: err.stack });
        }
    })
}