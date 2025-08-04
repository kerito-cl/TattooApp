import express from "express";
import {checkAvailabilityAPI, createBooking, getStudioBookings, getUserBookings} from '../controllers/bookingController.js'
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();


bookingRouter.post('/check-availability',checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/studio', protect, getStudioBookings);

export default bookingRouter;