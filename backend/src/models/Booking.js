import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Tour from "./Tour.js";

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("pending", "confirmed", "cancelled", "completed"),
    defaultValue: "pending",
  },

  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Relations
User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

Tour.hasMany(Booking, { foreignKey: "tourId" });
Booking.belongsTo(Tour, { foreignKey: "tourId" });

export default Booking;
