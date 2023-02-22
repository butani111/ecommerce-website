const catchAsyncError = require("../middleware/catchAsyncError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async (req, res, next) => {
  // Uncomment below code for actual payment process

  // const myPayment = await stripe.paymentIntnents.create({
  //   amount: req.body.amount,
  //   currency: "inr",
  //   metadata: { company: "SB Store" },
  // });
  // Temp
  const myPayment = { client_secret: "paymentSucceed" };

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
