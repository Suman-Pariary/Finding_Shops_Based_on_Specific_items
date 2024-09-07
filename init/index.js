const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://localhost:27017/store";

//Call to main function For Database Connection
main()
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    });

//connect Database
async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
         ...obj, 
         owner: "6633a3618a3f8eccb66c0aa0", 
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();