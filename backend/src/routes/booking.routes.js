import express from "express";
import {
  createBooking,
  getAllBookings,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);

export default router;
    