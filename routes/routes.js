const express = require("express");
const {} = require("../controllers/controllerBooks");
const {} = require("../controllers/controllersUser");

const bookRouter = express.Router();
const userRouter = express.Router();

// bookRouter

bookRouter.get("/");
bookRouter.get("/bestrating");
bookRouter.get("/:id");

bookRouter.post("/:id/rating");
bookRouter.post("/");

bookRouter.put("/:id");

bookRouter.delete("/:id");

//userRouter

userRouter.post("/signup");
userRouter.post("login");

// export Router

module.exports = { bookRouter, userRouter };
