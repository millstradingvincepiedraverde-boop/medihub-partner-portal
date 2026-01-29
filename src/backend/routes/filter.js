const express = require("express");
const db = require("../db");

const router = express.Router();

/**
 * GET /api/filters
 * Returns available date ranges from DB
 */
router.get("/filters", async (_req, res) => {
  try {
    const [[row]] = await db.query(`
      SELECT
        MIN(YEAR(order_date)) AS minYear
      FROM orders
    `);

    const today = new Date();
    const currentYear = today.getFullYear();

    // If DB has no rows, fallback to current year
    const minYear = row.minYear || currentYear;

    const years = [];
    for (let y = minYear; y <= currentYear; y++) {
      years.push(y);
    }

    res.json({
      minYear,
      years,
      months: Array.from({ length: 12 }, (_, i) => i + 1),
      days: Array.from({ length: 31 }, (_, i) => i + 1),
      weeks: Array.from({ length: 53 }, (_, i) => i + 1),
      defaults: {
        year: currentYear,
        month: today.getMonth() + 1,
        day: today.getDate(),
      },
    });
  } catch (err) {
    console.error("Filter error:", err);
    res.status(500).json({ error: "Filter fetch failed" });
  }
});

module.exports = router;
