const express = require("express");
const { isAuthorizedUser, authorizedRoles } = require("../middleware/auth");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);

router
  .route("/admin/product/new")
  .post(isAuthorizedUser, authorizedRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthorizedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthorizedUser, authorizedRoles("admin"), deleteProduct);

router.route("/review").put(isAuthorizedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthorizedUser, deleteReview);

module.exports = router;
