const { spawn } = require("child_process");

exports.youtubeDownload = (urls) => {
	return new Promise((resolve, reject) => {
		promises = [];
		for (let i in urls) {
			promises.push(
				new Promise((resolve, reject) => {
					let processVideo = spawn("python3", [`${__dirname}/downloader.py`, urls[i]]);

					processVideo.stdout.on("data", () => {
						resolve();
					});
				})
			);
		}

		Promise.allSettled(promises).then(() => {
			resolve(console.log("All audio downloads complete"));
		});
	});
};
