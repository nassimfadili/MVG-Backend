const express = require("express");
const {
  postRating,
  getBooksWithBestRating,
  putBook,
  deleteBook,
  getBook,
  postBooks,
  getBooks,
  generateImageUrl,
} = require("../controllers/controllerBooks");
const {} = require("../controllers/controllersUser");

const bookRouter = express.Router();
const userRouter = express.Router();

// bookRouter

bookRouter.get("/", getBooks);
bookRouter.get("/bestrating", getBooksWithBestRating);
bookRouter.get("/:id", getBook);

bookRouter.post("/:id/rating", postRating);
bookRouter.post("/", postBooks);

bookRouter.put("/:id", putBook);

bookRouter.delete("/:id", deleteBook);

//userRouter

userRouter.post("/signup");
userRouter.post("login");

// export Router

module.exports = { bookRouter, userRouter };

// generation d'url d'image

generateImageUrl();
