const express = require("express");
const {
  postRating,
  getBooksWithBestRating,
  putBook,
  deleteBook,
  getBook,
  postBooks,
  getBooks,
} = require("../controllers/controllerBooks");
const { logUser, signupUser } = require("../controllers/controllersUser");
const { checkToken } = require("../middlewares/checkToken");
const upload = require("../middlewares/storage");

const bookRouter = express.Router();
const userRouter = express.Router();

// bookRouter

bookRouter.get("/", getBooks);
bookRouter.get("/bestrating", getBooksWithBestRating);
bookRouter.get("/:id", getBook);

bookRouter.post("/:id/rating", checkToken, postRating);
bookRouter.post("/", checkToken, upload, upload.resizeImage, postBooks);

bookRouter.put("/:id", checkToken, upload, upload.resizeImage, putBook);

bookRouter.delete("/:id", checkToken, deleteBook);

//userRouter

userRouter.post("/signup", signupUser);
userRouter.post("/login", logUser);

// export Router

module.exports = { bookRouter, userRouter };
