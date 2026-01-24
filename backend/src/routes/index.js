import express from "express";
import tourRoutes from "./tour.routes.js";
import guideRoutes from "./guide.routes.js";
import bookingRoutes from "./booking.routes.js";
import authRoutes from "./auth.routes.js";
import reviewRoutes from "./review.routes.js";


const router = express.Router();

router.use("/tours", tourRoutes);
router.use("/guides", guideRoutes);
router.use("/bookings", bookingRoutes);
router.use("/auth", authRoutes);
router.use("/reviews", reviewRoutes);


export default router;
