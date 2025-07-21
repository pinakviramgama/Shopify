const express = require("express");
const {
  registerUser,
  login,
  logout,
  authMiddleware,
} = require("../../controllers/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/check-auth", authMiddleware, (req, res) => {
  const { email, role, id } = req.user;
  res.status(200).json({
    success: true,
    user: { email, role, id },
  });
});

module.exports = router;
