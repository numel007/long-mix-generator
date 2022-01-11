const youtubeSearchApi = require("youtube-search-api");

let searchYoutube = (keywordsArray) => {
	return new Promise((resolve, reject) => {
		let urls = [];
		let promises = [];

		for (let i in keywordsArray) {
			promises.push(
				new Promise((resolve, reject) => {
					youtubeSearchApi
						.GetListByKeyword(keywordsArray[i], false, 1)
						.then((res) => {
							resolve(urls.push(`www.youtube.com/watch?v=${res["items"][0]["id"]}`));
						})
						.catch((err) => reject(err));
				})
			);
		}

		Promise.allSettled(promises).then(() => {
			resolve(urls);
		});
	});
};

searchYoutube([
	"BEcause - Dreamcatcher",
	"Bossfight - Flirt Flirt Oh It Hurts",
	"Jay Wolf - Telepathy",
	"Overwerk - Daybreak",
]).then((res) => console.log(res));
