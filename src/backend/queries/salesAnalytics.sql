-- Revenue
SELECT
  SUM(total_ex_gst) AS revenue
FROM orders
WHERE order_date BETWEEN ? AND ?;

-- Referral Fees (example 10%)
SELECT
  SUM(total_ex_gst * 0.10) AS referral_fees
FROM orders
WHERE order_date BETWEEN ? AND ?;

-- Customers
SELECT
  COUNT(DISTINCT shopify_customer_id) AS customers
FROM orders
WHERE shopify_customer_id IS NOT NULL
AND order_date BETWEEN ? AND ?;

-- Units Sold
SELECT
  SUM(quantity) AS units_sold
FROM order_items oi
JOIN orders o ON o.shopify_order_id = oi.order_id
WHERE o.order_date BETWEEN ? AND ?;

-- Products Sold by Quantity
SELECT
  title,
  SUM(quantity) AS total_quantity
FROM order_items oi
JOIN orders o ON o.shopify_order_id = oi.order_id
WHERE o.order_date BETWEEN ? AND ?
GROUP BY title
ORDER BY total_quantity DESC
LIMIT 10;

-- Products Sold by $
SELECT
  title,
  SUM(quantity * price) AS total_sales
FROM order_items oi
JOIN orders o ON o.shopify_order_id = oi.order_id
WHERE o.order_date BETWEEN ? AND ?
GROUP BY title
ORDER BY total_sales DESC
LIMIT 10;
