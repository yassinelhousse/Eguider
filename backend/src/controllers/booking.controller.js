import { Booking, Tour, User } from "../models/index.js";

export const createBooking = async (req, res) => {
  try {
    const { userId, tourId, date } = req.body;

    // Validate required fields
    if (!userId || !tourId || !date) {
      return res.status(400).json({
        message: "userId, tourId and date are required",
      });
    }

    // cheeck if user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // check if tour exists
    const tour = await Tour.findByPk(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // Create booking
    const booking = await Booking.create({
      userId,
      tourId,
      date,
      totalPrice: tour.price,
      status: "pending",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "role"],
        },
        {
          model: Tour,
          attributes: ["id", "title", "city", "price"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
