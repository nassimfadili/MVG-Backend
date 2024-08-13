const express = require("express");
require("dotenv").config();
require("./config/database");
const { userRouter, bookRouter } = require("./routes/routes");
const path = require("path");

const app = express();
app.use(express.json());

// Middlewares

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/images", express.static(path.join(__dirname, "images")));

// routers

app.use("/api/auth", userRouter);
app.use("/api/books", bookRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
