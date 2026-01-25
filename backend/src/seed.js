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
          "		https://i.pinimg.com/736x/6f/dc/a2/6fdca2ab255d68ae4e56d437556fdbae.jpg",
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
          "https://i.pinimg.com/736x/87/b3/56/87b35683c5c3dff82836ce9ee0517b7e.jpg",
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
          "		https://i.pinimg.com/736x/24/35/ed/2435ed7f546ac01a70c57df87f14a07d.jpg",
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
          "https://i.pinimg.com/736x/f7/fa/7f/f7fa7f9a367c61c924284ea29b1e2c3a.jpg",
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
          "https://i.pinimg.com/736x/96/58/a6/9658a6ca8506de28331f9cc44ae82a71.jpg",
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