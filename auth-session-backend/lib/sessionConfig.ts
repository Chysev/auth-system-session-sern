import { Express } from "express";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import prisma from "../prisma";

// Session Config
const SessionConfig = (app: Express) => {
  app.use(
    session({
      secret: process.env.SECRET as string,
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 60 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),

      cookie: {
        secure: false, // Set to true if using https
        httpOnly: true, // Set to false if using https
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 2, // 2h Cookie Expiration
      },
    })
  );
};

export default SessionConfig;
