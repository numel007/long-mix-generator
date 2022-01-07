const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
// const spotifyAuth = require("./scripts/spotifyAuth");
// app.use("/", spotifyAuth);

// Server start
app.listen(PORT, () => {
	console.log(`App running on ${PORT}`);
});
