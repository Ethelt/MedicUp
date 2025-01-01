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
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// Routes
Controller.registerRoutes(app);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
