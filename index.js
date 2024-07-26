const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/database");
const { userRouter, bookRouter } = require("./routes/routes");

const app = express();

// routers

app.use("/api/auth", userRouter);
app.use("/api/books", bookRouter);

// Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("pictures"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
