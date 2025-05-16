const express = require("express");
const passport = require("passport");
const router = express.Router();

// Start Google auth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback URL after Google login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    successRedirect: `${process.env.CLIENT_URL}/dashboard`,
  })
);

// Get current user
router.get("/user", (req, res) => {
  if (req.user) res.json(req.user);
  else res.status(401).json({ message: "Not authenticated" });
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    // Respond with JSON instead of redirecting
    res.json({ message: "Logged out successfully" });
  });
});



module.exports = router;
