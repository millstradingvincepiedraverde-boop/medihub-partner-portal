// const sanityClient = require('../config/sanityClient');

// const getCompanies = async (req, res) => {
//   try {
//     const query = `
//       *[_type == "company"]{
//         _id,
//         name,
//         abn,
//         companyid
//       }
//     `;

//     const companies = await sanityClient.fetch(query);

//     return res.status(200).json({
//       success: true,
//       data: companies
//     });
//   } catch (error) {
//     console.error('Sanity getCompanies error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch companies'
//     });
//   }
// };

// module.exports = {
//   getCompanies
// };

const db = require("../db");

/* GET all companies */
const getCompanies = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM companies");
  res.json({ success: true, data: rows });
};

/* GET company by email */
const getCompanyByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    res.json({ data: rows[0] || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getCompanies,
  getCompanyByEmail, // 👈 THIS MUST EXIST
};

