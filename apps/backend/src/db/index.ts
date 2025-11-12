import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  logging: false,
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
});

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
