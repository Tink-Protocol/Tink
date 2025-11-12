import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

export class Tip extends Model {
  declare id: number;
  declare session: string;
  declare merchantId: string;
  declare amount: string;
  declare currency: string;
  declare status: "pending" | "confirmed" | "failed";
  declare tx_hash?: string | null;
  declare created_at: Date;
}

Tip.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    session: { type: DataTypes.STRING, allowNull: false, unique: true },
    merchantId: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.STRING, allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "failed"),
      defaultValue: "pending",
    },
    tx_hash: { type: DataTypes.STRING, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: "Tip",
    tableName: "tips",
    timestamps: false,
  }
);

export default Tip;
