import {
  sequelize,
  User,
  GuideProfile,
  Tour,
  Booking,
} from "./models/index.js";

const seed = async () => {
  try {
    console.log("🌱 Starting seed...");

    // Reset database
    await sequelize.sync({ force: true });

    // 1️⃣ Create normal user (tourist)
    const user = await User.create({
      name: "John Tourist",
      email: "user@test.com",
      role: "user",
    });

    // 2️⃣ Create guide (same User table)
    const guide = await User.create({
      name: "Ali Guide",
      email: "guide@test.com",
      role: "guide",
    });

    // 3️⃣ Create guide profile (extra info)
    await GuideProfile.create({
      bio: "Certified local guide with 5 years of experience",
      city: "Marrakech",
      languages: "English, French",
      pricePerDay: 50,
      userId: guide.id,
    });

    // 4️⃣ Create tour with images
    const tour = await Tour.create({
      title: "Marrakech Medina Walking Tour",
      description: "Discover souks, history and hidden places",
      city: "Marrakech",
      price: 40,
      durationHours: 4,
      images: [
        "https://images.unsplash.com/photo-1548013146-72479768bada",
        "https://images.unsplash.com/photo-1580747470167-06a66b3c7f82",
      ],
      guideId: guide.id,
    });

    // 5️⃣ Create booking
    await Booking.create({
      date: "2025-01-15",
      status: "confirmed",
      totalPrice: tour.price,
      userId: user.id,
      tourId: tour.id,
    });

    console.log("✅ Seed completed successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seed();
