const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const SHOP = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION || '2024-01';

console.log('🔧 Configuration:');
console.log('  SHOP:', SHOP ? '✓ Set' : '✗ Missing');
console.log('  TOKEN:', TOKEN ? '✓ Set' : '✗ Missing');

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
          node {
            id
            name
            createdAt
            displayFinancialStatus
            totalPriceSet {
              shopMoney {
                amount
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

    while (hasNextPage) {
        const response = await fetch(
            `https://${SHOP}/admin/api/${VERSION}/graphql.json`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': TOKEN,
                },
                body: JSON.stringify({ query, variables: { first: 250, after: cursor } }),
            }
        );

        const json = await response.json();
        if (json.errors) {
            console.error('❌ Shopify API errors:', JSON.stringify(json.errors, null, 2));
            throw new Error(`Shopify error: ${JSON.stringify(json.errors)}`);
        }

        const orders = json.data.orders.edges.map(e => e.node);
        allOrders.push(...orders);

        hasNextPage = json.data.orders.pageInfo.hasNextPage;
        cursor = json.data.orders.pageInfo.endCursor;

        if (hasNextPage) await new Promise(r => setTimeout(r, 500));
    }

    return allOrders;
}

app.get('/api/dashboard', async (req, res) => {
    try {
        const allOrders = await fetchAllOrders();
        const paidOrders = allOrders.filter(o => o.displayFinancialStatus === 'PAID');

        console.log('📊 Total orders fetched:', allOrders.length);
        console.log('💰 PAID orders:', paidOrders.length);
        console.log('📦 First order sample:', JSON.stringify(paidOrders[0], null, 2));

        const orders = paidOrders.map(order => {
            const total = parseFloat(order.totalPriceSet.shopMoney.amount);
            console.log(`Order ${order.name}: $${total}`);

            return {
                id: order.id,
                order_name: order.name,
                order_date: order.createdAt,
                status: order.displayFinancialStatus,
                total_ex_gst: total,
                items: order.lineItems.edges.map(i => ({
                    id: i.node.id,
                    title: i.node.title,
                    quantity: i.node.quantity,
                    price: parseFloat(i.node.originalUnitPriceSet.shopMoney.amount),
                })),
            };
        });

        console.log('✅ Transformed orders count:', orders.length);
        console.log('💵 Sample transformed order:', orders[0]);

        // Calculate totals
        let lifetimeRevenue = 0;
        orders.forEach(order => {
            lifetimeRevenue += order.total_ex_gst;
        });

        const lifetimeReferralFees = lifetimeRevenue * 0.1;

        console.log('💰 Final calculation:', {
            ordersCount: orders.length,
            lifetimeRevenue,
            lifetimeReferralFees
        });

        res.json({
            orders,
            lifetimeRevenue,
            lifetimeReferralFees
        });
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});