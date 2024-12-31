import express, { Express } from "express";
import dotenv from "dotenv";
import { Router } from "./api/router";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
Router.registerRoutes(app);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
