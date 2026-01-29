const db = require("../db");

function getStartDate(period) {
  const now = new Date();

  switch (period) {
    case "daily":
      now.setDate(now.getDate() - 1);
      break;
    case "weekly":
      now.setDate(now.getDate() - 7);
      break;
    case "monthly":
      now.setMonth(now.getMonth() - 1);
      break;
    case "annually":
      now.setFullYear(now.getFullYear() - 1);
      break;
    default:
      now.setMonth(now.getMonth() - 1);
  }

  return now;
}

async function getSalesAnalytics(period) {
  const startDate = getStartDate(period);

  /** 📊 SUMMARY STATS */
  const [summary] = await db.query(
    `
    SELECT
      SUM(total_ex_gst) AS revenue,
      SUM(referral_fee) AS referralFees,
      COUNT(DISTINCT shopify_customer_id) AS customers,
      SUM(oi.quantity) AS unitsSold
    FROM orders o
    JOIN order_items oi ON oi.shopify_order_id = o.shopify_order_id
    WHERE o.order_date >= ?
  `,
    [startDate]
  );

  /** 📦 PRODUCTS */
  const [products] = await db.query(
    `
    SELECT
      oi.product_title AS title,
      SUM(oi.quantity) AS quantity,
      SUM(oi.quantity * oi.price) AS revenue
    FROM orders o
    JOIN order_items oi ON oi.shopify_order_id = o.shopify_order_id
    WHERE o.order_date >= ?
    GROUP BY oi.product_title
  `,
    [startDate]
  );

  return {
    revenue: Number(summary[0].revenue || 0),
    referralFees: Number(summary[0].referralFees || 0),
    customers: Number(summary[0].customers || 0),
    unitsSold: Number(summary[0].unitsSold || 0),
    products,
  };
}

module.exports = { getSalesAnalytics };
