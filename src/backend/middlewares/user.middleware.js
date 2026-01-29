const db = require("../db");

async function userMiddleware(req, res, next) {
  const [rows] = await db.query(
    `
    SELECT u.id, u.company_id, u.role
    FROM users u
    WHERE u.firebase_uid = ?
    `,
    [req.user.uid]
  );

  if (!rows.length) {
    return res.status(403).json({ error: "User not registered" });
  }

  req.user = {
    ...req.user,
    ...rows[0]
  };

  next();
}

module.exports = userMiddleware;
