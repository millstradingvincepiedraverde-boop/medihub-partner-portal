// import path from 'path';
// import dotenv from 'dotenv';

// dotenv.config({
//   path: path.resolve(process.cwd(), '.env'),
// });

// console.log('ENV CHECK', {
//   cwd: process.cwd(),
//   shop: process.env.SHOPIFY_STORE_DOMAIN,
//   version: process.env.SHOPIFY_API_VERSION,
// });


// import fetch from 'node-fetch';
// import 'dotenv/config';

// const res = await fetch(
//   `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
//   {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
//     },
//     body: JSON.stringify({
//       query: `
//         {
//           shop {
//             name
//             myshopifyDomain
//           }
//         }
//       `,
//     }),
//   }
// );

// console.log(await res.json());
