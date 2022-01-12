const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

const spliceAudio = () => {
	return new Promise((resolve, reject) => {
		// Get list of video files
		fs.readdir(`${__dirname}/audio`, (err, files) => {
			if (err) {
				reject({ err: "Unable to get list of downloaded videos" });
			} else {
				files.forEach((file) => {
					console.log(file);
				});
			}
		});

		// Conversion and splice is complete
		resolve();
	});
};

spliceAudio();
