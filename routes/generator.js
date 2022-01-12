const express = require("express");
const router = express.Router();
const { getAccessToken } = require("../scripts/spotifyAuth");
const { getSongNames } = require("../scripts/spotifySearch");
const { searchYoutube } = require("../scripts/youtubeSearch");
const { youtubeDownload } = require("../scripts/youtubeDownload");
const { spliceAudio } = require("../scripts/spliceAudio");

router.get("/generate", (req, res) => {
	return res.json({ message: "Hello from /generate" });
});

// TODO: Should pass genre in req body
router.post("/generate", (req, res) => {
	getAccessToken()
		.then((token) => {
			// TODO: Remove hardcoded ambient genre
			return getSongNames(token, "ambient");
		})
		.then((names) => {
			return searchYoutube(names);
		})
		.then((urls) => {
			return youtubeDownload(urls);
		})
		.then(() => {
			return spliceAudio();
		})
		.then(() => {
			res.json({ msg: "Retrieve audio file now." });
		})
		.catch((err) => console.log(err));
});

module.exports = router;
