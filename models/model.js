const mongoose = require("mongoose");


const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "/default.avif",
        set: (v) => v === "" || v === null ? "/default.avif" : v
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    BestTimetoVisit: {
        type:String
    }
});

const Listing=mongoose.model("Listing",ListingSchema);

module.exports = Listing;