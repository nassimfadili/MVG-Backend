const express = require("express");
require("dotenv").config();
require("./config/database");
const { userRouter, bookRouter } = require("./routes/routes");

const app = express();

// routers

app.use("/api/auth", userRouter);
app.use("/api/books", bookRouter);

const port = process.env.PORT || 3000; // Utilisez un port par défaut si la variable d'environnement n'est pas définie

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
