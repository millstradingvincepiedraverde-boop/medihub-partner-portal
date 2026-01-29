const express = require("express");
const router = express.Router();
const sanityController = require("../controllers/sanityController");

// test route
router.get("/test", sanityController.test);

// get locations from sanity
router.get("/locations", sanityController.getLocations);
router.get("/products", sanityController.getProducts);

module.exports = router; // ✅ THIS FIXES YOUR ERROR
