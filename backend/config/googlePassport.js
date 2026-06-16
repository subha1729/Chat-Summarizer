const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
        profile.emails?.[0]?.value;

        let user =
        await User.findOne({
            email
        });

        if (!user) {

        user =
            await User.create({
            googleId: profile.id,
            username:
                profile.displayName,
            email,
            avatar:
                profile.photos?.[0]?.value
            });

        } else {

        user.googleId =
            profile.id;

        await user.save();
        }

        return done(null, user);
      } catch (error) {
         console.error("GOOGLE ERROR:");
         console.error(error);
        return done(error, null);
      }
    }
  )
);