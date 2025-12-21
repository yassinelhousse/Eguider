import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Tour = sequelize.define("Tour", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  durationHours: {
    type: DataTypes.INTEGER,
  },

  images: {
    
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

// Relations
User.hasMany(Tour, { foreignKey: "guideId" });
Tour.belongsTo(User, { foreignKey: "guideId" });

export default Tour;
