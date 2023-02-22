const express = require("express");
const router = express.Router();
const { isAuthorizedUser, authorizedRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthorizedUser, newOrder);
router.route("/orders/me").get(isAuthorizedUser, myOrders);
router.route("/order/:id").get(isAuthorizedUser, getSingleOrder);

router
  .route("/admin/orders")
  .get(isAuthorizedUser, authorizedRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthorizedUser, authorizedRoles("admin"), updateOrder)
  .delete(isAuthorizedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
