import User from "../models/User.js";
import { Webhook } from "svix";

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
            await User.findByIdAndDelete(data.id);
            return res.json({ success: true, message: "Webhook Received" });
        }
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
            recentSearchedArtists: [],
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
