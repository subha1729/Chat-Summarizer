const express = require("express");
const passport = require("passport");

const {
  register,
  login
} = require("../controllers/authController");

const router = express.Router();

// Existing Routes
router.post("/register", register);
router.post("/login", login);

// Discord OAuth Login
router.get(
  "/discord",
  passport.authenticate("discord")
);

// Discord OAuth Callback
router.get(
  "/discord/callback",
  passport.authenticate(
    "discord",
    {
      failureRedirect: "/"
    }
  ),
  (req, res) => {

    console.log("Session After Login:");
    console.log("OAuth User:", req.user);
    res.redirect(
     `${process.env.FRONTEND_URL}/dashboard`
    )

  }
);

// =====================
// GOOGLE OAUTH
// =====================

router.get(
  "/google",
  passport.authenticate(
    "google",
    {
      scope: ["profile", "email"]
    }
  )
);

router.get(
  "/google/callback",
  passport.authenticate(
    "google",
    {
      failureRedirect: "/"
    }
  ),
  (req, res) => {

    console.log("Google Login Success");
    console.log(req.user);

    res.redirect(
      `${process.env.FRONTEND_URL}/dashboard`
    );

  }
);


router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not logged in"
    });
  }

  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    avatar: req.user.avatar
  });
});

router.get("/test-session", (req, res) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);

  res.json({
    session: req.session,
    user: req.user || null
  });
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({
      message: "Logged out"
    });
  });
});

router.get(
  "/linked-accounts",
  (req, res) => {

    if (!req.user) {
      return res.status(401).json({
        message: "Not logged in"
      });
    }

    res.json({
      google: !!req.user.googleId,
      discord: !!req.user.discordId
    });

  }
);

router.get(
  "/whoami",
  (req, res) => {
    console.log(
      "WHOAMI USER:",
      req.user
    );

    res.json({
      user:
        req.user || null
    });
  }
);

module.exports = router;