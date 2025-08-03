import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./controllers/clerkWebHooks.js";
import getRawBody from "raw-body";
import User from "./models/User.js";
import artistRouter from "./routes/artistRoutes.js";



connectDB();
connectCloudinary();

const app = express();
app.use(cors());
app.use(clerkMiddleware());

// Apply express.json() to everything EXCEPT /api/clerk
app.use((req, res, next) => {
    if (req.originalUrl === "/api/clerk") {
        getRawBody(req)
            .then((buf) => {
                req.rawBody = buf;
                next();
            })
            .catch((err) => {
                console.error("Error parsing raw body:", err);
                res.status(400).send("Invalid body");
            });
    } else {
        express.json()(req, res, next);
    }
});

// Now add your routes
app.post("/api/clerk", clerkWebHooks);
app.use("/api/artists", artistRouter)
app.get("/", (req, res) => res.send("API is working fine"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
