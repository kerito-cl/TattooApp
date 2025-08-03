import Artist from "../models/Artist.js";
import User from "../models/User.js"


export const registerArtist = async (req, res) => {
    try {
        const {name, address, contact , city} = req.body;
        const owner = req.user._id;

       const artist = await Artist.findOne({owner});
       if (artist)
       {
        return res.json({success:false, message: "Artist already registered"})
       }
       await Artist.create({name, address, contact, city , owner});
       await User.findByIdAndUpdate(owner, {role: "artist"});

       res.json({success:true, message: "Artist Registered Successfully"});

    } catch (error) {
       res.json({success:false, message: error.message});
        
    }
}