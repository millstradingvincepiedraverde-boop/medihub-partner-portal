import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

import type {ShopifyOrdersResponse} from "../dashboard/types/ShopifyOrdersResponse"

dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
});

const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;
const VERSION = process.env.SHOPIFY_API_VERSION!;

const GRAPHQL_URL = `https://${SHOP}/admin/api/${VERSION}/graphql.json`;

async function fetchLifetimeRevenue() {
    let hasNextPage = true;
    let cursor: string | null = null;
    let totalRevenue = 0;

    while (hasNextPage) {
        const res = await fetch(GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': TOKEN,
            },
            body: JSON.stringify({
                query: `
          query PaidOrders($first: Int!, $after: String, $query: String!) {
            orders(first: $first, after: $after, query: $query) {
              edges {
                node {
                  totalPriceSet {
                    shopMoney {
                      amount
                    }
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        `,
                variables: {
                    first: 100,
                    after: cursor,
                    query: "financial_status:paid",
                },
            }),
        });


        const json = (await res.json()) as ShopifyOrdersResponse;

        const orders = json.data.orders.edges;

        for (const edge of orders) {
            totalRevenue += parseFloat(
                edge.node.totalPriceSet.shopMoney.amount
            );
        }

        hasNextPage = json.data.orders.pageInfo.hasNextPage;
        cursor = json.data.orders.pageInfo.endCursor;
    }

    console.log('✅ Lifetime Revenue:', totalRevenue.toFixed(2));
}

fetchLifetimeRevenue();
