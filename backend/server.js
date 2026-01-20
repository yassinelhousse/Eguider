import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "../backend/src/config/database.js";
import apiRoutes from "../backend/src/routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API is running ✅" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
