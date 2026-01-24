import sequelize from "../config/database.js";

import User from "./User.js";
import GuideProfile from "./GuideProfile.js";
import Tour from "./Tour.js";
import Booking from "./Booking.js";
import Review from "./Review.js";
import Message from "./message.js";



const syncDB = async () => {
  await sequelize.sync({ force: true });
  console.log("📦 Database synced");
};
// Review belongs to user + tour
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

Tour.hasMany(Review, { foreignKey: "tourId" });
Review.belongsTo(Tour, { foreignKey: "tourId" });

export {
  sequelize,
  User,
  GuideProfile,
  Tour,
  Booking,
  Review,
  Message,
  syncDB,
};
