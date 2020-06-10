const mongoose =require('mongoose')
const Passenger = require('./passenger')
const BookingSchema=mongoose.Schema({
        image:{
            type:Buffer,
            required:true
        },
        price:Number,
        passengers:[Passenger],
        booked:{
            type:Boolean,
            default:false
        }
})
BookingSchema.methods.toJSON = function () {
    const booking = this
    const bookingObject = booking.toObject()
    delete bookingObject._id
    return bookingObject
}
const Booking = mongoose.model('Booking',BookingSchema)
module.exports= Booking