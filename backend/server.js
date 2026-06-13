const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const session = require("express-session");
const passport = require("passport");

require("./config/passport");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const protect = require("./middleware/authMiddleware");

const summaryRoutes = require("./routes/summaryRoutes");
const statsRoutes = require("./routes/statsRoutes");

const accountRoutes = require("./routes/accountRoutes");

const guildRoutes =
  require("./routes/guildRoutes");

require("./jobs/summaryCron");

const guildConnectionRoutes =
  require(
    "./routes/guildConnectionRoutes"
  );

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-summarizer-swart.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      maxAge:
        1000 * 60 * 60 * 24,

      httpOnly: true,
      secure: true,
      sameSite: "none"
    }
  })
);

app.use(
  passport.initialize()
);

app.use(
  passport.session()
);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use("/api/auth", authRoutes);
app.get("/api/auth/check", (req, res) => {
  res.json({
    authenticated:
      req.isAuthenticated
        ? req.isAuthenticated()
        : false,

    user: req.user || null,

    session: req.session
  });
});
app.use("/api/messages", messageRoutes);

app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user
  });
});

app.use("/api/summaries", summaryRoutes);
app.use("/api/stats", statsRoutes);


app.get("/test-session", (req, res) => {
  console.log(req.user);

  res.json({
    user: req.user || null
  });
});

app.use(
  "/api/accounts",
  accountRoutes
);

app.use(
  "/api/guilds",
  guildRoutes
);

app.use(
  "/api/guild-connections",
  guildConnectionRoutes
);


app.get("/test-auth", (req, res) => {

  console.log("USER:", req.user);

  res.json({
    authenticated:
      req.isAuthenticated
        ? req.isAuthenticated()
        : false,

    user: req.user || null,

    session: req.session
  });

});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

