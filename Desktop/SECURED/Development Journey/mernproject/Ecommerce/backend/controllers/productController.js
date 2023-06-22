import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFeatures from "../utils/apiFeatures.js";

//only for admin
export const createProduct = asyncErrorHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//only for admin
export const updateProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params._id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//only for admin
export const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params._id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndDelete(req.params._id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product,
  });
});

export const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const pagelimit = 5;

  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(pagelimit);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

export const getProductDetails = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params._id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});




export const getAdminProducts=()=>{};
export const createProductReview=()=>{};
export const getProductReviews=()=>{};
export const deleteReview=()=>{};