import { Review, Tour, User } from "../models/index.js";

export const createReview = async (req, res) => {
  try {
    const { tourId, rating, comment } = req.body;

    if (!tourId || !rating) {
      return res
        .status(400)
        .json({ message: "tourId and rating are required" });
    }

    const tour = await Tour.findByPk(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    const review = await Review.create({
      tourId,
      userId: req.user.id,
      rating,
      comment,
    });

    return res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.log("❌ create review error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getReviewsByTour = async (req, res) => {
  try {
    const { id } = req.params; // tourId

    const reviews = await Review.findAll({
      where: { tourId: id },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.json(reviews);
  } catch (error) {
    console.log("❌ get reviews error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
