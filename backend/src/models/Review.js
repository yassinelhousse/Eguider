import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Booking from "./Booking.js";

const Review = sequelize.define("Review", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: DataTypes.TEXT,
});

Review.belongsTo(User, { foreignKey: "authorId" });
Review.belongsTo(Booking, { foreignKey: "bookingId" });

export default Review;
