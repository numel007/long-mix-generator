const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

const spliceAudio = () => {
	return new Promise((resolve, reject) => {
		// Get list of video files
		fs.readdir(`${__dirname}/audio`, (err, files) => {
			if (err) {
				reject({ err: "Unable to get list of downloaded videos" });
			} else {
				promises = [];
				files.forEach((file) => {
					promises.push(
						new Promise((resolve, reject) => {
							ffmpeg(`./audio/${file}`)
								.format("mp3")
								.save(`./audio/${file.slice(0, -4)}.mp3`)
								.on("err", () => console.log(`Error converting ${file}`))
								.on("start", () => console.log(`Converting ${file}`))
								.on("end", () => {
									console.log(`${file} complete`);
									resolve();
								});
						})
					);
				});

				// Conversions completed
				Promise.allSettled(promises).then(() => resolve(console.log("All conversions finished.")));
			}
		});
	});
};

spliceAudio();
