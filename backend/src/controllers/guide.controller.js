import { User, GuideProfile } from "../models/index.js";

export const getAllGuides = async (req, res) => {
  try {
    const guides = await User.findAll({
      where: { role: "guide" },
      include: GuideProfile,
    });

    res.json(guides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch guides" });
  }
};
