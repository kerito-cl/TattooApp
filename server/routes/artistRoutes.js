import express from "express";
import upload from "../middleware/uploadMiddleware.js"
import { protect } from "../middleware/authMiddleware.js";
import { createArtist, getStudioArtist, getArtists, toggleArtistAvailability } from "../controllers/artistController.js";

const artistRouter = express.Router();


artistRouter.post('/', upload.array("images", 4), protect, createArtist);
artistRouter.get('/', getArtists);
artistRouter.get('/', getStudioArtist);
artistRouter.get('/owner', protect ,getStudioArtist);
artistRouter.post('/toggle-availability', protect, toggleArtistAvailability);

export default artistRouter;