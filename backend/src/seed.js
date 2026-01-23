import { sequelize, User, GuideProfile, Tour } from "./models/index.js";
import bcrypt from "bcryptjs";

const seed = async () => {
  try {
    console.log("🌱 Starting seed...");

    await sequelize.sync({ force: true });

    const hashed = await bcrypt.hash("123456", 10);

    // 1️⃣ Create tourist user
    const user = await User.create({
      name: "John Tourist",
      email: "user@test.com",
      role: "user",
      password: hashed,
    });

    // 2️⃣ Create guides
    const guide1 = await User.create({
      name: "Ali Guide",
      email: "guide@test.com",
      role: "guide",
      password: hashed,
    });

    const guide2 = await User.create({
      name: "Sara Guide",
      email: "guide2@test.com",
      role: "guide",
      password: hashed,
    });

    // 3️⃣ Guide profiles
    await GuideProfile.bulkCreate([
      {
        bio: "Certified local guide with 5 years of experience",
        city: "Marrakech",
        languages: "English, French",
        pricePerDay: 50,
        userId: guide1.id,
      },
      {
        bio: "Friendly guide specialized in culture & food tours",
        city: "Fes",
        languages: "Arabic, English",
        pricePerDay: 45,
        userId: guide2.id,
      },
    ]);

    // 4️⃣ Many tours (different cities + images)
    await Tour.bulkCreate([
      {
        title: "Marrakech Medina Walking Tour",
        description: "Discover souks, history and hidden places",
        city: "Marrakech",
        price: 40,
        durationHours: 4,
        images: [
          "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200",
          "https://images.unsplash.com/photo-1580747470167-06a66b3c7f82?w=1200",
        ],
        guideId: guide1.id,
      },
      {
        title: "Chefchaouen Blue City Tour",
        description: "Walk through the blue streets with amazing views",
        city: "Chefchaouen",
        price: 35,
        durationHours: 3,
        images: [
          "https://images.unsplash.com/photo-1542326237-94b1c5a538d4?w=1200",
        ],
        guideId: guide1.id,
      },
      {
        title: "Fes Old Medina Cultural Tour",
        description: "Explore one of the oldest cities with a local guide",
        city: "Fes",
        price: 45,
        durationHours: 4,
        images: [
          "https://images.unsplash.com/photo-1600267185393-e158a98703de?w=1200",
        ],
        guideId: guide2.id,
      },
      {
        title: "Sahara Desert Experience (Merzouga)",
        description: "Camel ride, sunset dunes, and desert camp night",
        city: "Merzouga",
        price: 120,
        durationHours: 8,
        images: [
          "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200",
        ],
        guideId: guide2.id,
      },
      {
        title: "Casablanca Hassan II Mosque Tour",
        description: "Visit Morocco’s iconic mosque with a local guide",
        city: "Casablanca",
        price: 25,
        durationHours: 2,
        images: [
          "https://images.unsplash.com/photo-1596993160804-20e4b57a64c2?w=1200",
        ],
        guideId: guide1.id,
      },
    ]);

    console.log("✅ Seed completed successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seed();
export default seed;