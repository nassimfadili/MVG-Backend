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
const { logUser, signupUser } = require("../controllers/controllersUser");
const { checkToken } = require("../middlewares/checkToken");
const { storage } = require("../middlewares/storage");
const multer = require("multer");

const bookRouter = express.Router();
const userRouter = express.Router();

// bookRouter

bookRouter.get("/", getBooks);
bookRouter.get("/bestrating", getBooksWithBestRating);
bookRouter.get("/:id", getBook);

bookRouter.post("/:id/rating", checkToken, postRating);
bookRouter.post(
  "/",
  checkToken,
  multer({ storage: storage }).single("image"),
  postBooks
);

bookRouter.put("/:id", checkToken, putBook);

bookRouter.delete("/:id", checkToken, deleteBook);

//userRouter

userRouter.post("/signup", logUser);
userRouter.post("login", signupUser);

// export Router

module.exports = { bookRouter, userRouter };

// generation d'url d'image

generateImageUrl();
