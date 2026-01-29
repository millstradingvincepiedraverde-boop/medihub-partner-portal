const express = require("express");
const {
  getCompanies,
  getCompanyByEmail,
} = require("../controllers/companyController");

const router = express.Router();

router.get("/", getCompanies);
router.get("/by-email", getCompanyByEmail);

module.exports = router;
