import Product from '../models-schemas/productModel.js';

// @desc    Get all products
// @route   GET /api/products?keyword
// @access  Public
export const getAllProducts = async (req, res) => {
  try {
    // search keyword
    const keyword = req.query.keyword
      ? {
          name: { $regex: req.query.keyword, $options: 'i' },
        }
      : {};

    // items per page
    const pageSize = 8;

    // current page
    const pageNumber = Number(req.query.pageNumber) || 1;

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (pageNumber - 1));

    res.json({ products, pageNumber, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    res.status(404).json({ message: 'Products not found', stack: err.stack });
  }
};

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
  });
};

// @desc    Delete single product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (product) {
      product.remove();
      res.json({ message: 'Product deleted!' });
    } else {
      res.status(404).json({ message: 'Product not found', stack: err.stack });
    }
  });
};

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
    });

    const createdProduct = await sampleProduct.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(404);
    res.json({
      message: 'Failed to create a product',
      error: err.message,
    });
  }
};

// @desc    Update single product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, image, description, brand, category, price, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.image = image;
      product.description = description;
      product.brand = brand;
      product.category = category;
      product.price = price;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.status(201);
      res.json(updatedProduct);
    } else {
      res.status(404);
      res.json({
        message: 'Product not found',
      });
    }
  } catch (err) {
    res.status(404);
    res.json({
      message: 'Failed to create a product',
      error: err.message,
    });
  }
};

// @desc    Create a review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const reviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );

      if (reviewed) {
        res.status(400);
        res.json({
          message: 'Product already has been reviewed by you',
        });
      } else {
        const review = {
          user: req.user._id,
          name: req.user.name,
          rating: Number(rating),
          comment,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, review) => acc + review.rating, 0) /
          product.reviews.length;

        const updatedProduct = await product.save();
        res.status(201);
        res.json(updatedProduct);
      }
    } else {
      res.status(404);
      res.json({
        message: 'Product not found :(',
      });
    }
  } catch (err) {
    res.status(404);
    res.json({
      message: 'Failed to create a reviews :(',
      error: err.message,
    });
  }
};

// @desc    Fetch top products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ numReviews: -1 }).limit(3);

    res.json(products);
  } catch (err) {
    res.status(404);
    res.json({
      message: 'Cannot fetch top products :(',
      error: err.message,
    });
  }
};
