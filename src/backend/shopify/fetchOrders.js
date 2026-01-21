const fetch = require('node-fetch');

const SHOP = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION;

async function fetchAllOrders() {
  let orders = [];
  let cursor = null;
  let hasNextPage = true;

  const query = `
  query ($first: Int!, $after: String) {
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

          customer {
            id
            displayName
          }

          subtotalPriceSet {
            shopMoney { amount }
          }

          totalTaxSet {
            shopMoney { amount }
          }

          totalDiscountsSet {
            shopMoney { amount }
          }

          totalPriceSet {
            shopMoney { amount }
          }

          lineItems(first: 100) {
            edges {
              node {
                title
                quantity
                originalUnitPriceSet {
                  shopMoney { amount }
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
    const res = await fetch(
      `https://${SHOP}/admin/api/${VERSION}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: { first: 250, after: cursor },
        }),
      }
    );

    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));

    const fetched = json.data.orders.edges.map(e => e.node);
    orders.push(...fetched);

    hasNextPage = json.data.orders.pageInfo.hasNextPage;
    cursor = json.data.orders.pageInfo.endCursor;
  }

  return orders;
}

module.exports = { fetchAllOrders };
