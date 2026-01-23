import { Booking, Tour, User } from "../models/index.js";

export const createBooking = async (req, res) => {
  try {
    const { tourId, date } = req.body;
    const userId = req.user.id; // from token

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



export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Tour,
          attributes: ["id", "title", "city", "price", "images"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(bookings);
  } catch (error) {
    console.log("❌ getMyBookings error:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // booking must belong to logged user
    const booking = await Booking.findOne({
      where: { id: bookingId, userId: req.user.id },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // prevent cancel if already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.log("❌ cancel booking error:", error);
    return res.status(500).json({ message: "Server error" });
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
          attributes: ["id", "title", "city", "price", "images"],
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
