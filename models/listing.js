const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

// To create a schema 
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    }, 
    description: String,
    image: {
       url: String,
       filename: String,
    },
    license: {
        type: String,
        unique: true,
    },
    location: String,
    storeType: {
        type:String, 
        // enum: ["Grocery","x-rox","book","meat","fish","electrical","shoe","machine","cycle","salon","mobile","medicine","cloth","jewelry","stationary","food","oil","atm"],
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({ _id: {
            $in: listing.reviews }});
    }
});

//using this schema create a model
const Listing =mongoose.model("Listing", listingSchema);

// To export listing
module.exports = Listing;