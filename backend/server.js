import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./src/config/database.js";
import apiRoutes from "./src/routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

// Test route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running ✅" });
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
