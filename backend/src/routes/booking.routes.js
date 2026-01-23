import express from "express";
import {
  createBooking,
  
  getAllBookings,
  getMyBookings,
} from "../controllers/booking.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/", getAllBookings);

export default router;
    