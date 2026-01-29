// const db = require("../db");

// async function companyMiddleware(req, res, next) {
//   try {
//     const [rows] = await db.query(
//       "SELECT company_id, name FROM companies WHERE email = ? LIMIT 1",
//       [req.user.email]
//     );

//     if (!rows.length) {
//       return res.status(403).json({ error: "Company not found" });
//     }

//     req.company = rows[0]; // { id, name }
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Company lookup failed" });
//   }
// }

// module.exports = companyMiddleware;
