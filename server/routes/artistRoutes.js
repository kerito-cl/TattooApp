import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerArtist } from "../controllers/artistController.js";

const artistRouter = express.Router();

artistRouter.post("/", protect, registerArtist);



export default artistRouter;