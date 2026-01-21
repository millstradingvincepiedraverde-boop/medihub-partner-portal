const db = require("../db");

async function getSalesAnalytics(startDate, endDate) {
  const [[summary]] = await db.query(
    `
    SELECT
      SUM(o.total_ex_gst) AS revenue,
      COUNT(DISTINCT o.shopify_customer_id) AS customers,
      SUM(oi.quantity) AS units_sold
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.shopify_order_id
    WHERE o.created_at BETWEEN ? AND ?
      AND o.status = 'PAID'
    `,
    [startDate, endDate]
  );

  const [byQuantity] = await db.query(
    `
    SELECT
      title,
      SUM(quantity) AS total_quantity
    FROM order_items
    GROUP BY title
    ORDER BY total_quantity DESC
    LIMIT 10
    `
  );

  const [byRevenue] = await db.query(
    `
    SELECT
      title,
      SUM(quantity * price) AS total_revenue
    FROM order_items
    GROUP BY title
    ORDER BY total_revenue DESC
    LIMIT 10
    `
  );

  return {
    revenue: summary.revenue || 0,
    referralFees: (summary.revenue || 0) * 0.1,
    customers: summary.customers || 0,
    unitsSold: summary.units_sold || 0,
    productsByQuantity: byQuantity,
    productsByRevenue: byRevenue,
  };
}

module.exports = {
  getSalesAnalytics,
};
