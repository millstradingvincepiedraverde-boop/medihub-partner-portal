const admin = require("firebase-admin");

/**
 * Verifies Firebase ID token sent from frontend
 * Header: Authorization: Bearer <token>
 */
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing auth token" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // attach user info to request
    req.user = decodedToken;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { requireAuth };
