const express = require("express");
const router = express.Router();
const { getAccessToken } = require("../scripts/spotifyAuth");
const { getSongNames } = require("../scripts/spotifySearch");
const { searchYoutube } = require("../scripts/youtubeSearch");
const { youtubeDownload } = require("../scripts/youtubeDownload");
const { spliceAudio } = require("../scripts/spliceAudio");
const fs = require("fs");
var path = require("path");

router.get("/generate", (req, res) => {
	return res.json({ message: "Hello from /generate" });
});

// TODO: Should pass genre in req body
router.post("/generate", (req, res) => {
	// Delete mergedAudio.mp3 before running new conversion
	fs.unlink(`${__dirname}/../scripts/output/mergedAudio.mp3`, (err) => {
		if (err && err.code == "ENOENT") {
			console.log("mergedAudio.mp3 doesn't exist. Nothing to remove.");
		} else {
			console.log("mergedAudio.mp3 deleted");
		}
	});

	getAccessToken()
		.then((token) => {
			return getSongNames(token, req.query);
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
			console.log("Sending file");
			res.sendFile(path.resolve(`${__dirname}/../scripts/output/mergedAudio.mp3`));
		})
		.catch((err) => res.json({ error: err }));
});

module.exports = router;
