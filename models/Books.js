const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  book: { type: String, required: true },
  image: { type: URL, required: true },
});

const Books = mongoose.model("Books", BookSchema);

module.export = { Books };
