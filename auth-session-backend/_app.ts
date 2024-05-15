import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import nocache from "nocache";
import prisma from "./prisma";
import express from "express";
import "./utils/envValidator";
import passport from "passport";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "./types/express-types";

import SessionConfig from "./lib/sessionConfig";

const app = express();

async function connectPrisma() {
  await prisma.$connect();
}
async function disconnectPrisma() {
  await prisma.$disconnect();
}

const imagePath = path.join(process.cwd(), "uploads");

app.get("/uploads/:imageName", (req, res) => {
  const { imageName } = req.params;
  res.sendFile(path.join(imagePath, imageName));
});

SessionConfig(app);

app.use(helmet());
app.use(nocache());
app.use(express.json());
app.use(morgan("dev"));
app.disable("x-powered-by");
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.set("trust proxy", 1) // Uncomment if using http
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: [
      process.env.FRONTEND_BASE_URL as string,
      process.env.FRONTEND_BASE_URL as string,
    ],
    credentials: true,
  })
);

import "./lib/passport";

import authRoutes from "./routes/auth";
import apiRoutes from "./routes/api";

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(500).send("Internal Server Error");
  next();
});

connectPrisma()
  .then(() => {
    console.log("Prisma Connected");
    app.listen(process.env.BACKEND_PORT as number, () => {
      console.log(`Server is running: ${process.env.BACKEND_BASE_URL}`);
    });
  })
  .catch(async (e) => {
    console.log("Prisma connection failed:", e);
    await disconnectPrisma();
    process.exit(1);
  });
