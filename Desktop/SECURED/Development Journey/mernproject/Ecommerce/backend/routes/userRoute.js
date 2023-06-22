import express from "express";

import { deleteUser, forgotPassword, getAllUser, getSingleUser, getUserDetails, resetPassword, updatePassword, updateProfile, updateUserRole, userLogin, userLogout, userRegister} from "../controllers/userController.js"
import { authorizeRoles, isAuthenticated } from "../utils/auth.js";

const router=express.Router();


router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(userLogout);


router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/me/update").put(isAuthenticated, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

export default router;