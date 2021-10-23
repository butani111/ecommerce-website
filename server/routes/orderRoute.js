const express = require("express");
const router = express.Router();
const { isAuthorizedUser, authorizedRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthorizedUser, newOrder);
router.route("/orders/me").get(isAuthorizedUser, myOrders);
router.route("/order/:id").get(isAuthorizedUser, getSingleOrder);

module.exports = router;
