import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createReview,
  getReviewsByTour,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/tour/:id", getReviewsByTour);

export default router;
