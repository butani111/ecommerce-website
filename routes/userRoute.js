const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUserByAdmin,
} = require("../controllers/userController");
const { isAuthorizedUser, authorizedRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthorizedUser, getUserDetails);
router.route("/me/update").put(isAuthorizedUser, updateProfile);
router.route("/password/update").put(isAuthorizedUser, updatePassword);

router
  .route("/admin/users")
  .get(isAuthorizedUser, authorizedRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthorizedUser, authorizedRoles("admin"), getSingleUser)
  .put(isAuthorizedUser, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthorizedUser, authorizedRoles("admin"), deleteUserByAdmin);

module.exports = router;
