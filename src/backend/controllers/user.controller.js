function getMe(req, res) {
  res.json({
    uid: req.user.uid,
    email: req.user.email,
  });
}

module.exports = { getMe };
