import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import prisma from "../prisma";

// Auth
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email: string, password: string, done) => {
      try {
        const account = await prisma.account.findUnique({
          where: { email: email },
        });

        if (!account) {
          return done(null, false, { message: "Account Not Found" });
        }

        const passwordMatch = await bcrypt.compare(password, account.password);

        if (!passwordMatch) {
          return done(null, false, { message: "Invalid Credentials" });
        }

        return done(null, account);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Sessions
passport.serializeUser((user, done) => {
  if (user) {
    done(null, (user as { email: string }).email);
  } else {
    done(null, false);
  }
});

passport.deserializeUser(async (email: string, done) => {
  try {
    const account = await prisma.account.findUnique({
      where: { email: email },
      include: {
        user: true,
      },
    });

    if (!account) return done(null, false);

    const user_account = {
      email: account.email,
      user: {
        name: account.user?.name,
        role: account.user?.role,
        avatarUrl: account.user?.avatarUrl,
      },
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };

    return done(null, user_account);
  } catch (error) {
    return done(error);
  }
});

export default passport;
