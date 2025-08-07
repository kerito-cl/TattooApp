import {User} from "../models/User.js";
import { Webhook } from "svix";
import { Studio } from "../models/Studio.js";
import { Artist } from "../models/Artist.js";
import { Booking } from "../models/Booking.js";

const clerkWebHooks = async (req, res) => {
    try {
        const payload = req.rawBody; // Raw body was set by middleware
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const evt = wh.verify(payload, headers);
        const { data, type } = evt;
        if (type === "user.deleted"){
            const user = await User.findById(data.id);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // Delete bookings made by the user
            await Booking.deleteMany({ user: user._id });

            if (user.role === "studio") {
                // Find the studio owned by this user
                const studio = await Studio.findOne({ owner: user._id });

                if (studio) {
                    // Delete all artists working at this studio
                    await Artist.deleteMany({ studio: studio._id });

                    // Delete all bookings with this studio
                    await Booking.deleteMany({ studio: studio._id });

                    // Delete the studio
                    await Studio.findByIdAndDelete(studio._id);
                }
            }

            // Delete the user
            await User.findByIdAndDelete(user._id);
            return res.json({ success: true, message: "User and related data deleted" });
        }

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
            recentSearchedStudios: [],
        };

        switch (type) {
            case "user.created":
                await User.create(userData);
                console.log("User created")
                break;
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                break;
        }

        res.json({ success: true, message: "Webhook Received" });
    } catch (error) {
        console.log("Webhook Error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

export default clerkWebHooks;
