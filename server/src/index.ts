import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import session from "express-session";
import { Controller } from "./api/controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
declare module "express-session" {
  interface Session {
    userId: number;
    userType: "patient" | "doctor" | "registrar";
  }
}

// Routes
Controller.registerRoutes(app);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
