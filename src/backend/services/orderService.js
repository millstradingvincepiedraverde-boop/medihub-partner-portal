const db = require("../db");

async function saveOrdersToDB(orders) {
  console.log("🟡 saveOrdersToDB called with", orders.length, "orders");

  for (const order of orders) {
    if (!Array.isArray(order.items)) {
      console.warn("⚠️ Skipping order without items:", order.id);
      continue;
    }

    // 1️⃣ Insert / Update ORDER (parent)
    await db.query(
      `
      INSERT INTO orders (
        shopify_order_id,
        order_name,
        order_date,
        customer_email,
        status,
        total_ex_gst
      )
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        order_name = VALUES(order_name),
        order_date = VALUES(order_date),
        customer_email = VALUES(customer_email),
        status = VALUES(status),
        total_ex_gst = VALUES(total_ex_gst)
      `,
      [
        order.id,
        order.order_name,
        order.order_date,
        order.customer_email || null,
        order.status,
        order.total_ex_gst,
      ]
    );

    // 2️⃣ Prevent duplicate items on re-sync
    await db.query(
      `
      DELETE FROM order_items
      WHERE order_id = ?
      `,
      [order.id]
    );

    // 3️⃣ Insert ORDER ITEMS (children)
    for (const item of order.items) {
      await db.query(
        `
        INSERT INTO order_items (
          order_id,
          title,
          quantity,
          price
        )
        VALUES (?, ?, ?, ?)
        `,
        [
          order.id,
          item.title,
          item.quantity,
          item.price,
        ]
      );
    }
  }

  console.log("✅ Orders & items saved successfully");
}

module.exports = { saveOrdersToDB };
