import {Studio} from "../models/Studio.js";
import {User} from "../models/User.js"


export const registerStudio = async (req, res) => {
    try {
        const {name, address, contact , city} = req.body;
        const owner = req.user._id;

       const studio = await Studio.findOne({owner});
       if (studio)
       {
        return res.json({success:false, message: "Studio already registered"})
       }
       await Studio.create({name, address, contact, city , owner});
       await User.findByIdAndUpdate(owner, {role: "studio"});

       res.json({success:true, message: "Studio Registered Successfully"});

    } catch (error) {
       res.json({success:false, message: error.message});
        
    }
}