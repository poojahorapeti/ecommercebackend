const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { body } = require("express-validator");
const router = express.Router();
router.post(
    "/register", [
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").isLength({ min:8 }).withMessage("Password must be at least 8 characters"),
    ],
    registerUser
);
router.post(
    "/login", [
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    loginUser
);
module.exports = router;  




