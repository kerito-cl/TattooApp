import mongoose, { mongo } from "mongoose";

const studioSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    contact: {type: String, required: true},
    owner: {type: String, required:true ,ref:"User"},
    city: {type: String, required: true},
}, {timestamps: true});


export const Studio = mongoose.model("Studio", studioSchema);
