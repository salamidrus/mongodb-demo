const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Env variables
require("dotenv").config();

// cors
app.use(cors());

// Parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MONGO_URI = process.env.MONGO_URI;
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// routes
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/user");
app.use("/api/v1/user", userRoutes);
app.use(errorHandler);

let PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));
