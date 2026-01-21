const cron = require('node-cron');
const { fetchAllOrders } = require('../services/shopifyService');
const { saveOrdersToDB } = require('../services/orderService');

cron.schedule('* * * * *', async () => {
  console.log('⏱️ Syncing Shopify orders...');

  try {
    const orders = await fetchAllOrders();
    await saveOrdersToDB(orders);
    console.log('✅ Shopify sync complete');
  } catch (err) {
    console.error('❌ Shopify sync failed', err);
  }
});
