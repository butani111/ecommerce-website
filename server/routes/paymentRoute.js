const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthorizedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthorizedUser, processPayment);
router.route("/stripeapikey").post(isAuthorizedUser, sendStripeApiKey);

module.exports = router;
