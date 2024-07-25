const mongoose = require("mongoose");

const RatingsSchema = new mongoose.Schema({
  userId: String,
  grade: Number,
});

const BookSchema = new mongoose.Schema({
  userId: String,
  title: String,
  author: String,
  imageUrl: String,
  year: Number,
  genre: String,
  ratings: [RatingsSchema],
  averageRating: Number,
});

const Book = mongoose.model("Book", BookSchema);

module.exports = { Book };
