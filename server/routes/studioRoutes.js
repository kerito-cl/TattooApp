import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerStudio } from "../controllers/studioController.js";

const studioRouter = express.Router();

studioRouter.post("/", protect, registerStudio);



export default studioRouter;