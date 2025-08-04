import Booking from "../models/Booking.js"
import Artist from "../models/Artist.js"
import Studio from "../models/Studio.js"
import transporter from "../configs/nodemailer.js";


const checkAvailability = async ({ date, startTime, endTime, artist }) => {
  try {
    const bookings = await Booking.find({
      artist,
      date: new Date(date),
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    return bookings.length === 0;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};


// API to check availability ofartistm
//POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { artist, date, startTime, endTime } = req.body;
    const isAvailable = await checkAvailability({ date, startTime, endTime, artist });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const createBooking = async (req, res) => {
  try {
    const { artist, date, startTime, endTime } = req.body;
    const user = req.user._id;

    const isAvailable = await checkAvailability({ date, startTime, endTime, artist });

    if (!isAvailable) {
      return res.json({ success: false, message: "Artist is not available during this time" });
    }

    const artistData = await Artist.findById(artist).populate("studio");
    const studioId = artistData.studio._id;

    // Price calculation based on hourly rate (optional)
    let totalPrice = artistData.hourlyRate || artistData.pricePerHour || 100;

    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
    const hours = (end - start) / (1000 * 60 * 60);

    totalPrice *= hours;

    const bookings = await Booking.create({
      user,
      artist,
      studio: studioId,
      date,
      startTime,
      endTime,
      totalPrice
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "Tattoo Booking Confirmation",
      html: `
        <h2>Your Booking Details</h2>
        <p>Dear ${req.user.username},</p>
        <p>Thank you for your booking! Here are your details:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${bookings._id}</li>
          <li><strong>Studio:</strong> ${artistData.studio.name}</li>
          <li><strong>Location:</strong> ${artistData.studio.address}</li>
          <li><strong>Date:</strong> ${new Date(date).toDateString()}</li>
          <li><strong>Time Slot:</strong> ${startTime} - ${endTime}</li>
          <li><strong>Price:</strong> ${process.env.CURRENCY || '$'}${totalPrice}</li>
        </ul>
        <p>We look forward to seeing you!</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// API to check availability ofartistm
//GET /api/bookings/user

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate([{path:"artist"},{path:"studio"}]).sort({createdAt: -1})
        res.json({success:true, bookings})
        
    } catch (error) {
        res.json({success:false, message:error.message})
        
    }
}


export const getStudioBookings = async (req,res) => {

    try {
        const studio = await Studio.findOne({owner:req.auth().userId});
        if (!studio){
            return res.json({success:false, message:"No studio found"})
        }
        const bookings = await Booking.find({studio: studio._id}).populate("artist studio user").sort({createdAt: -1});
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
        res.json({success:true, dashboardData: {totalBookings, totalRevenue,bookings}})
    }
    catch(error){
        res.json({success:false, message:error.message})
    }
}