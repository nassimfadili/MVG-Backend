const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();
require("./config/database");

const port = process.env.PORT || 3000; // Utilisez un port par défaut si la variable d'environnement n'est pas définie

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
