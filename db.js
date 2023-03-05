const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {console.log("Database Connected")})
  .catch((err) => {
    console.error("Database connection error",err);
  });