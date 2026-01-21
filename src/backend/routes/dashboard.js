const express = require('express');
const router = express.Router(); // ✅ THIS WAS MISSING

const { fetchAllOrders } = require('../services/shopifyService');
const { saveOrdersToDB } = require('../services/orderService');

router.get('/dashboard', async (req, res) => {
  try {
    const shopifyOrders = await fetchAllOrders();
    console.log('🟢 Shopify orders:', shopifyOrders.length);

    const paidOrders = shopifyOrders.filter(
      o => o.displayFinancialStatus === 'PAID'
    );

    // 🔄 Transform Shopify → internal format
    const orders = paidOrders.map(order => ({
      id: order.id,
      order_name: order.name,
      order_date: order.createdAt,
      status: order.displayFinancialStatus,

      shopify_customer_id: order.customer?.id || null,
      customer_name: order.customer?.displayName || 'Wews',

      total_ex_gst: parseFloat(
        order.totalPriceSet.shopMoney.amount
      ),

      items: order.lineItems.edges.map(i => ({
        title: i.node.title,
        quantity: i.node.quantity,
        price: parseFloat(
          i.node.originalUnitPriceSet.shopMoney.amount
        ),
      })),
    }));

    // 💾 Save to MySQL
    await saveOrdersToDB(orders);

    const lifetimeRevenue = orders.reduce(
      (sum, o) => sum + o.total_ex_gst,
      0
    );

    res.json({
      orders,
      lifetimeRevenue,
      lifetimeReferralFees: lifetimeRevenue * 0.1,
    });
  } catch (err) {
    console.error('❌ Dashboard error:', err);
    res.status(500).json({ error: 'Dashboard failed' });
  }
});

module.exports = router; // ✅ ALSO REQUIRED
