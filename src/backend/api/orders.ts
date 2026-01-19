const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const SHOP = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION || '2024-01';

console.log('🔧 Configuration:');
console.log('  SHOP:', SHOP ? '✓ Set' : '✗ Missing');
console.log('  TOKEN:', TOKEN ? '✓ Set' : '✗ Missing');
console.log('  VERSION:', VERSION);

// Fetch all orders with pagination
async function fetchAllOrders() {
  const allOrders = [];
  let hasNextPage = true;
  let cursor = null;

  const query = `
    query GetOrders($first: Int!, $after: String) {
      orders(first: $first, after: $after, sortKey: CREATED_AT, reverse: true) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            id
            name
            createdAt
            displayFinancialStatus
            displayFulfillmentStatus
            totalPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            lineItems(first: 100) {
              edges {
                node {
                  id
                  title
                  quantity
                  originalUnitPriceSet {
                    shopMoney {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    while (hasNextPage) {
      console.log(`🔄 Fetching orders${cursor ? ' (page ' + (allOrders.length / 250 + 1) + ')' : ''}...`);

      const response = await fetch(
        `https://${SHOP}/admin/api/${VERSION}/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': TOKEN,
          },
          body: JSON.stringify({
            query,
            variables: {
              first: 250,
              after: cursor,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Shopify API returned ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();

      if (json.errors) {
        console.error('❌ Shopify GraphQL errors:', json.errors);
        throw new Error('Failed to fetch orders from Shopify');
      }

      const orders = json.data.orders.edges.map(edge => edge.node);
      allOrders.push(...orders);

      hasNextPage = json.data.orders.pageInfo.hasNextPage;
      cursor = json.data.orders.pageInfo.endCursor;

      console.log(`  Fetched ${allOrders.length} orders so far...`);

      // Small delay to respect rate limits
      if (hasNextPage) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log(`✅ Total orders fetched: ${allOrders.length}`);
    return allOrders;
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    throw error;
  }
}

app.get('/api/dashboard', async (req, res) => {
  try {
    if (!SHOP || !TOKEN) {
      return res.status(500).json({
        error: 'Shopify credentials not configured',
        message: 'Please set SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_ACCESS_TOKEN in .env'
      });
    }

    console.log('📊 Dashboard data requested');

    const allOrders = await fetchAllOrders();

    // Filter for PAID orders only
    const paidOrders = allOrders.filter(order =>
      order.displayFinancialStatus === 'PAID'
    );

    console.log(`💰 Filtered to ${paidOrders.length} PAID orders (from ${allOrders.length} total)`);

    // Transform orders
    const orders = paidOrders.map(order => ({
      id: order.id,
      order_name: order.name,
      order_date: order.createdAt,
      status: order.displayFinancialStatus,
      fulfillment_status: order.displayFulfillmentStatus,
      total_ex_gst: parseFloat(order.totalPriceSet.shopMoney.amount),
      items: order.lineItems.edges.map(item => ({
        id: item.node.id,
        title: item.node.title,
        quantity: item.node.quantity,
        price: parseFloat(item.node.originalUnitPriceSet.shopMoney.amount),
      })),
    }));

    // Calculate metrics (only for PAID orders)
    let lifetimeRevenue = 0;
    let lifetimeReferralFees = 0;

    orders.forEach(order => {
      lifetimeRevenue += order.total_ex_gst;
      lifetimeReferralFees += order.total_ex_gst * 0.1; // 10% commission
    });

    console.log(`💵 Lifetime Revenue (PAID only): $${lifetimeRevenue.toFixed(2)}`);
    console.log(`💸 Lifetime Referral Fees: $${lifetimeReferralFees.toFixed(2)}`);

    res.json({
      orders,
      lifetimeRevenue,
      lifetimeReferralFees,
      totalOrders: orders.length,
      paidOrders: paidOrders.length,
      allOrders: allOrders.length,
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch dashboard data',
      message: error.message
    });
  }
});

app.get('/health', (req, res) => {
  console.log('❤️  Health check requested');
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    shopify: {
      configured: !!(SHOP && TOKEN),
      shop: SHOP || 'not set',
      version: VERSION
    }
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({
    message: 'Backend is working!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════');
  console.log('🚀 SERVER STARTED SUCCESSFULLY');
  console.log('═══════════════════════════════════════');
  console.log(`📍 Local:        http://localhost:${PORT}`);
  console.log(`❤️  Health:       http://localhost:${PORT}/health`);
  console.log(`🧪 Test:         http://localhost:${PORT}/test`);
  console.log(`📊 Dashboard:    http://localhost:${PORT}/api/dashboard`);
  console.log('═══════════════════════════════════════');
  console.log('');
  console.log('✨ Ready to accept requests!');
  console.log('💰 Only PAID orders will be included in calculations');
  console.log('');
});