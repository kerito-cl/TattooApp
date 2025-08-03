import mongoose, { mongo } from "mongoose";

const artistSchema = new mongoose.Schema({
    studio: {type: String,ref: "Studio" ,required: true},
    styles: {type: Array,required: true},
    pricePerHour: {type: Number,required: true},
    images : [{type:String}],
    isAvailable : {type:Boolean, default:true},
}, {timestamps: true});


const Artist = mongoose.model("Artist", artistSchema);


export default Artist;