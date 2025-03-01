const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct, getProductById } = require( "../controllers/productController");
const protect = require("../middleware/authMiddleware");
const { create } = require('../models/productModel');
//define a Get routes for products
router.get("/", protect, getProducts);
router.get("/", protect, getProductById);
router.post("/", protect, createProduct);
router.get("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;