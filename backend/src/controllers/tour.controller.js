import { Tour, User } from "../models/index.js";

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.findAll({
      include: {
        model: User,
        attributes: ["id", "name", "email"],
      },
    });

    res.json(tours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tours" });
  }
};

export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ["id", "name", "email"],
      },
    });

    if (!tour) return res.status(404).json({ message: "Tour not found" });

    res.json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tour" });
  }
};
