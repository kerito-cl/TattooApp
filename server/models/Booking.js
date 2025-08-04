import mongoose, { mongo } from "mongoose";

const bookingSchema = new mongoose.Schema({
    user:{type:String, ref:"User", required:true},
    artist:{type:String, ref:"Artist", required:true},
    studio:{type:String, ref:"Studio", required:true},
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }, 
    totalPrice: {type:Number, required:true},
    status: {
        type:String,
        enum:["pending", "confirmed", "cancelled"],
        default: "pending",
    },
    paymentMethod : {
        type:String,
        required:true,
        default:"Pay At The Studio"},
    isPaid: {type:Boolean, default:false}
}, {timestamps: true});


const Booking = mongoose.model("Booking", bookingSchema);


export default Booking;