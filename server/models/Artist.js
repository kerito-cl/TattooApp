import mongoose, { mongo } from "mongoose";

const artistSchema = new mongoose.Schema({
    name: {type: String, required: true},
    studio: {type: String,ref: "Studio" ,required: true},
    styles: {type: Array,required: true},
    pricePerHour: {type: Number,required: true},
    images : [{type:String}],
    isAvailable : {type:Boolean, default:true},
}, {timestamps: true});


export const Artist = mongoose.model("Artist", artistSchema);

