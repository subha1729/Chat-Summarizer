const passport = require("passport");
const DiscordStrategy =
  require("passport-discord").Strategy;

const ConnectedAccount =
  require("../models/ConnectedAccount");

console.log("DISCORD_CLIENT_ID =", process.env.DISCORD_CLIENT_ID);
console.log("DISCORD_CLIENT_SECRET =", process.env.DISCORD_CLIENT_SECRET);
passport.use(
  new DiscordStrategy(
    {
      clientID:
        process.env.DISCORD_CLIENT_ID,

      clientSecret:
        process.env.DISCORD_CLIENT_SECRET,

      callbackURL:
        process.env.DISCORD_CALLBACK_URL,

      scope: ["identify", "email"],

      passReqToCallback: true
    },

    async (
      req,
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {

        console.log("Discord Login:");
        console.log(profile);

        if (!req.user) {
          return done(
            new Error(
              "Login with Google first"
            ),
            null
          );
        }

        const existingAccount =
          await ConnectedAccount.findOne({
            userId:
              req.user._id,
            platform: "discord"
          });

        if (existingAccount) {
          existingAccount.platformUserId =
            profile.id;
          existingAccount.username =
            profile.username;
          existingAccount.accessToken =
            accessToken;
          existingAccount.refreshToken =
            refreshToken;

          await existingAccount.save();

          console.log(
            "Discord account updated for current user"
          );

          return done(
            null,
            req.user
          );
        }

        await ConnectedAccount.create({
          userId:
            req.user._id,

          platform:
            "discord",

          platformUserId:
            profile.id,

          username:
            profile.username,

          accessToken,

          refreshToken
        });

        console.log(
          "Discord linked successfully"
        );

        return done(
          null,
          req.user
        );

      } catch (error) {

        console.error(error);

        return done(
          error,
          null
        );
      }
    }
  )
);

passport.serializeUser(
  (user, done) => {

    console.log(
      "Serialize User:",
      user.username
    );

    done(
      null,
      user.id
    );
  }
);

passport.deserializeUser(
  async (id, done) => {

    console.log(
      "DESERIALIZE ID:",
      id
    );

    try {

      const User =
        require("../models/User");

      const user =
        await User.findById(id);

      console.log(
        "DESERIALIZED USER:",
        user
      );

      done(
        null,
        user
      );

    } catch (error) {

      console.log(error);

      done(
        error,
        null
      );
    }
  }
);

require("./googlePassport");

module.exports = passport;