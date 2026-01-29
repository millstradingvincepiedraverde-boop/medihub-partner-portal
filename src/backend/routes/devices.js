const express = require('express');
const router = express.Router();
const sanityClient = require('../config/sanityClient'); // adjust path

router.get('/', async (req, res) => {
    try {
        const { locationId } = req.query;

        if (!locationId) {
            return res.status(400).json({ success: false, data: [] });
        }

        const query = `
      *[_type == "location" && _id == $locationId][0]{
        devices[]->{
          _id,
          deviceId,
          model,
          deviceType
        }
      }
    `;

        const result = await sanityClient.fetch(query, { locationId });

        res.json({
            success: true,
            data: result?.devices || [],
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: [] });
    }
});

module.exports = router;
