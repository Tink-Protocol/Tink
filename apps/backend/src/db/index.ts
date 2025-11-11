// src/db/index.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Use Railway's DATABASE_URL if available, fallback to local DB
const connectionString =
  process.env.DATABASE_URL ||
  process.env.DB_URL ||
  "postgres://postgres:password@localhost:5432/tink";

// Enable SSL if DB_SSL=true
const sequelize = new Sequelize(connectionString, {
  logging: false,
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
});

export const db = sequelize;

export async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced");
  } catch (err) {
    console.error("❌ DB connection failed", err);
    throw err;
  }
}
