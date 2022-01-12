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
				filenames = [];
				files.forEach((file) => {
					promises.push(
						new Promise((resolve, reject) => {
							// Convert video file to mp3
							ffmpeg(`./audio/${file}`)
								.audioFilters("silenceremove=stop_periods=2")
								.format("mp3")
								.save(`./audio/${file.slice(0, -4)}.mp3`)
								.on("err", (err) => console.log(`Error converting ${file}`))
								.on("start", () => console.log(`Converting ${file}`))
								.on("end", () => {
									// Delete unconverted video file
									fs.unlink(`${__dirname}/audio/${file}`, (err) => {
										if (err) throw err;
									});

									filenames.push(`${file.slice(0, -4)}.mp3`);
									resolve();
								});
						})
					);
				});

				Promise.allSettled(promises).then(() => {
					// Begin splicing audio together

					// Get list of mp3s and add to input
					let mergedAudio = ffmpeg();
					filenames.forEach((filename) => {
						mergedAudio.addInput(`${__dirname}/audio/${filename}`);
					});

					// Merge input files, output to ./output/mergedAudio.mp3
					mergedAudio
						.mergeToFile(`${__dirname}/output/mergedAudio.mp3`, "./tmp/")
						.on("err", (err) => console.log(err))
						.on("start", () => console.log("Merging audio tracks."))
						.on("end", () => {
							console.log("Finished merging audio.");

							// Delete mp3s
							fs.readdir(`${__dirname}/audio`, (err, files) => {
								files.forEach((file) => {
									fs.unlink(`${__dirname}/audio/${file}`, (err) => {
										if (err) throw err;
									});
								});
							});

							// All operations have completed
							resolve();
						});
				});
			}
		});
	});
};

spliceAudio().then((res) => console.log(res));
