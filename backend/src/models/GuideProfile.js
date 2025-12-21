import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const GuideProfile = sequelize.define("GuideProfile", {
  bio: {
    type: DataTypes.TEXT,
  },

  city: {
    type: DataTypes.STRING,
  },

  languages: {
    type: DataTypes.STRING,
  },

  pricePerDay: {
    type: DataTypes.FLOAT,
  },
});


User.hasOne(GuideProfile, { foreignKey: "userId" });
GuideProfile.belongsTo(User, { foreignKey: "userId" });

export default GuideProfile;
