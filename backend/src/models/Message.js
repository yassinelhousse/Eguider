import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Booking from "./Booking.js";

const Message = sequelize.define("Message", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Message.belongsTo(User, { foreignKey: "senderId" });
Message.belongsTo(Booking, { foreignKey: "bookingId" });

export default Message;
