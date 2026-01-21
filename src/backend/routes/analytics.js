const express = require("express");
const router = express.Router();

const { getSalesAnalytics } = require("../services/analyticService");

router.get("/analytics", async (req, res) => {
  try {
    const { period = "monthly" } = req.query;

    const now = new Date();
    let startDate;

    switch (period) {
      case "daily":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        break;

      case "weekly":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;

      case "monthly":
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        break;

      case "yearly":
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;

      default:
        startDate = new Date("2000-01-01");
    }

    const data = await getSalesAnalytics(startDate, new Date());
    res.json(data);
  } catch (err) {
    console.error("Analytics route error:", err);
    res.status(500).json({ error: "Analytics failed" });
  }
});

module.exports = router;
