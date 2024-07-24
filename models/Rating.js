const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Rating = mongoose.model("Rating", RatingSchema);

module.export = { Rating };
