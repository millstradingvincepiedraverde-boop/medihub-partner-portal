const client = require("../config/sanityClient");

exports.getLocations = async () => {
    return client.fetch(`
    *[_type == "location"]{
      _id,
      name,
      locationid,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPostcode,
      devices,
    }
  `);
};

exports.getLocationById = async (locationId) => {
    const query = `
    *[_type == "location" && _id == $locationId][0]{
      _id,
      name,
      locationid,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPostcode,
      devices,
    }
  `;

    return client.fetch(query, { locationId });
};