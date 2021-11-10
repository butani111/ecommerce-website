const express = require("express");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Apifeatures = require("../utils/apifeatures");

// Create Product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.createdBy = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// Get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeature = new Apifeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  const filteredProductCount = products.length;

  const apiFeature1 = new Apifeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  products = await apiFeature1.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
    filteredProductCount,
    resultPerPage,
  });
});

// Get all products (Admin)
exports.getAdminProducts = catchAsyncError(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ success: true, products });
});

// Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({ success: true, product });
});

// Update Product (Admin)
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, product });
});

// Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully." });
});

// Create new Review or Update the Review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let ratingSum = 0;
  product.reviews.forEach((rev) => {
    ratingSum += rev.rating;
  });
  product.ratings = ratingSum / product.reviews.length; // average

  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

// Get all reviews of a Product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  res.status(200).json({ success: true, reviews: product.reviews });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  // console.log(reviews);

  let ratingSum = 0;
  reviews.forEach((rev) => {
    ratingSum += rev.rating;
  });
  const ratings = ratingSum / reviews.length; // average
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({ success: true, reviews: reviews });
});
