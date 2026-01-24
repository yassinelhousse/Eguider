import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Tour from "./Tour.js";

const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },

  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});






export default Review;
