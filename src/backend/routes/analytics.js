const express = require("express");
const db = require("../db");

const router = express.Router();

/**
 * GET /api/analytics
 * Query params:
 * - period: daily | weekly | monthly | annually
 * - year
 * - month
 * - day
 * - week
 */
router.get("/analytics", async (req, res) => {
  try {
    const { period, year, month, day, week } = req.query;

    let where = "1=1";
    let params = [];

    switch (period) {
      case "daily":
        where = "DATE(order_date) = DATE(?)";
        params = [`${year}-${month}-${day}`];
        break;

      case "weekly":
        where = "YEAR(order_date) = ? AND WEEK(order_date, 1) = ?";
        params = [year, week];
        break;

      case "monthly":
        where = "YEAR(order_date) = ? AND MONTH(order_date) = ?";
        params = [year, month];
        break;

      case "annually":
        where = "YEAR(order_date) = ?";
        params = [year];
        break;
    }

    /* ---------------- KPIs ---------------- */

    const [[stats]] = await db.query(
      `
      SELECT
        COALESCE(SUM(total_ex_gst), 0) AS revenue,
        COUNT(DISTINCT shopify_customer_id) AS customers
      FROM orders
      WHERE ${where}
      `,
      params
    );

    const [[units]] = await db.query(
      `
      SELECT
        COALESCE(SUM(oi.quantity), 0) AS unitsSold
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.shopify_order_id
      WHERE ${where}
      `,
      params
    );

    const referralFees = stats.revenue * 0.1;

    /* ---------------- Products by Quantity ---------------- */

    const [productsByQuantity] = await db.query(
      `
      SELECT
        oi.title,
        SUM(oi.quantity) AS quantity
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.shopify_order_id
      WHERE ${where}
      GROUP BY oi.title
      ORDER BY quantity DESC
      `,
      params
    );

    /* ---------------- Products by Revenue ---------------- */

    const [productsByRevenue] = await db.query(
      `
      SELECT
        oi.title,
        SUM(oi.quantity * oi.price) AS revenue
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.shopify_order_id
      WHERE ${where}
      GROUP BY oi.title
      ORDER BY revenue DESC
      `,
      params
    );

    res.json({
      revenue: stats.revenue,
      referralFees,
      customers: stats.customers,
      unitsSold: units.unitsSold,
      products: productsByQuantity.map(p => {
        const rev = productsByRevenue.find(r => r.title === p.title);
        return {
          title: p.title,
          quantity: p.quantity,
          revenue: rev ? rev.revenue : 0,
        };
      }),
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ error: "Analytics failed" });
  }
});

module.exports = router;
