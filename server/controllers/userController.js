const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const User = require("../models/userModel");

// Register User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "profilepicurl",
    },
  });

  res.status(201).json({ success: true, user });
});
