import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_URL || "postgres://postgres:password@localhost:5432/tink",
  {
    logging: false,
    dialectOptions: {
      // If you need SSL for remote Postgres, set env var DB_SSL=true
      ssl:
        process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    },
  }
);

// Initialize DB
export async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("DB connected ✅");
    await sequelize.sync({ alter: true });
    console.log("DB synced ✅");
  } catch (err) {
    console.error("DB connection failed ❌", err);
    throw err;
  }
}
