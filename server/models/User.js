import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    image: {type: String, required: true},
    role: {type: String, enum: ["user", "studio"], default: "user"},
    recentSearchedCities: [{type: String, default:[]}],
}, {timestamps: true});


export const User = mongoose.model("User", userSchema);

