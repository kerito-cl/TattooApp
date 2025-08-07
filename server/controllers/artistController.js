import {Studio} from "../models/Studio.js";
import {Artist} from "../models/Artist.js";
import {v2 as cloudinary } from "cloudinary";


export const createArtist = async (req, res) => {
    try {
        console.log("Studio Found")
        const {name,styles, pricePerHour} = req.body;
        const studio = await Studio.findOne({owner: req.auth.userId})

        if (!studio){
            return res.json({success:false, message: "Studio not Found"});
        }
        const uploadImages = req.files.map(async(file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })
        
        const images = await Promise.all(uploadImages);

        const parsedStyles = JSON.parse(styles);
        await Artist.create({
            name:name,
            studio:studio._id,
            styles:parsedStyles,
            pricePerHour:+pricePerHour,
            images,
        })
        res.json({success:true, message:"Artist added succesfully"})
        
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }

}

export const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find({isAvailable:true}).populate({
            path:'studio',
            populate:{
                path:'owner',
                select:'image'
            }
        }).sort({createdAt:-1})
        res.json({success:true, artists})

    } catch (error) {
        res.json({success:false, message:error.message});
    }

}

export const getStudioArtist = async (req, res) => {
    try {
        const studioData = await Studio.findOne({owner: req.auth.userId})
        const artists = await Artist.find({studio:studioData._id.toString()}).populate("studio");
        res.json({success:true, artists})
        
    } catch (error) {
        res.json({success:false, message:error.message});
        
    }

}

export const toggleArtistAvailability = async (req, res) => {
    try {
        const {artistId} = req.body
        const artistData = await Artist.findById(artistId);

        artistData.isAvailable = !artistData.isAvailable;
        await artistData.save();
        res.json({success:true, message:"Artist availability Updated"});
     
    } catch (error) {
        res.json({success:false, message:error.message});
    }

}