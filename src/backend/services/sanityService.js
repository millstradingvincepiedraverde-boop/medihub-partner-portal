const sanityClient = require("../config/sanityClient");

exports.fetchLocations = async () => {
    const query = `
    *[_type == "location"]{
      _id,
      name,
      locationid,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPostcode,
      devices
    }
  `;

    return await sanityClient.fetch(query);
};

exports.fetchProducts = async () => {
    const query = `
    *[_type == "productVariant" && store.isDeleted != true]{
      _id,
      "variantId": store.id,
      "productId": store.productId,
      "title": store.title,
      "sku": store.sku,
      "price": store.price,
      "compareAtPrice": store.compareAtPrice,
      "available": store.inventory.available,
      "isAvailable": store.inventory.isAvailable,
      "images": store.imageUrls,
      "shopDomain": store.shop.domain,
      "status": store.status,
      "updatedAt": store.updatedAt
    }
  `;
    return sanityClient.fetch(query);
};

// exports.getDevicesByLocation = async (locationid) => {
//     const query = `
//     *[
//       _type == "location" &&
//       locationid == $locationid
//     ][0]{
//       _id,
//       name,
//       locationid,
//       "devices": devices[]->{
//         _id,
//         model,
//         name,
//         serialNumber,
//         status
//       }
//     }
//   `;

//     return client.fetch(query, {
//         locationid: Number(locationid),
//     });
// };



// module.exports = {
//     getDevicesByLocation,
// };

