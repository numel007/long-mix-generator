const { spawn } = require("child_process");

const youtubeDownload = (urls) => {
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

youtubeDownload([
	"www.youtube.com/watch?v=ygzNypLvBjA",
	"www.youtube.com/watch?v=xduIjhAhVek",
	"www.youtube.com/watch?v=Bc0VofBKva0",
	"www.youtube.com/watch?v=gOZkoalCoHc",
	"www.youtube.com/watch?v=0pCoAA8JNYI",
]).then(() => console.log("done"));
