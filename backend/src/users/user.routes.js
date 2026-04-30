const express = require("express");
const router = express.Router();

const userController = require("./user.controller");
const { protect, isAdmin } = require("../middlewares/auth.middleware");

/**
 * 👤 CUSTOMER ROUTES
 */

// Get logged-in user profile
router.get("/me", protect, userController.getProfile);

// Update own profile
router.put("/me", protect, userController.updateProfile);


/**
 * 🧑‍💼 ADMIN ROUTES
 */

// Get all users
router.get("/", protect, isAdmin, userController.getUsers);

// Get user by ID
router.get("/:id", protect, isAdmin, userController.getUserById);

// Update any user
router.put("/:id", protect, isAdmin, userController.updateUser);

// Delete user
router.delete("/:id", protect, isAdmin, userController.deleteUser);

module.exports = router;