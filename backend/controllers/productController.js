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


// @desc    Create single product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {

    try {
        const sampleProduct = new Product({
            user: req.user._id,
            name: 'Sample name',
            image: '../images/sample.jpg',
            description: 'Sample desc',
            brand: 'Sample brand',
            category: 'Sample category',
            price: 0,
            countInStock: 0,
            numReviews: 0,
        })

        const createdProduct = await sampleProduct.save();
        res.status(201).json(createdProduct);

    } catch(err) {
        res.status(404);
        res.json({
            message:'Failed to create a product',
            error: err.message
        })
    }
}

// @desc    Update single product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {

    try {
        const {
            name,
            image,
            description,
            brand,
            category,
            price,
            countInStock,
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name
            product.image = image
            product.description = description
            product.brand = brand
            product.category = category
            product.price = price
            product.countInStock = countInStock

            const updatedProduct = await product.save();
            res.json(updatedProduct);

        } else {
            res.status(404);
            res.json({
                message:'Product not found'
            })
        }
    } catch(err) {
        res.status(404);
        res.json({
            message:'Failed to create a product',
            error: err.message
        })
    }
}