const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name"],
    maxlength: [30, "Name cannot exceed 30 charactors"],
    minlength: [4, "Name shold have more than 4 charactors"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    minlength: [8, "Password shold have more than 8 charactors"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);
