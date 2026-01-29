const express = require("express");
const { requireAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/protected", requireAuth, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;
