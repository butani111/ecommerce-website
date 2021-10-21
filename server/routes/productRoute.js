const express = require("express");
const { isAuthorizedUser, authorizedRoles } = require("../middleware/auth");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthorizedUser, authorizedRoles("admin"), createProduct);
router
  .route("/product/:id")
  .get(getProductDetails)
  .put(isAuthorizedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthorizedUser, authorizedRoles("admin"), deleteProduct);

module.exports = router;
