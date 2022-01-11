const youtubeSearchApi = require("youtube-search-api");

const testFunc = (keywordsArray) => {
	return new Promise((resolve, reject) => {
		let urls = [];
		let promises = [];

		for (let i in keywordsArray) {
			promises.push(
				new Promise((resolve, reject) => {
					youtubeSearchApi.GetListByKeyword(keywordsArray[i], false, 1).then((res) => {
						console.log(res["items"][0]["id"]);
						resolve(urls.push(res["items"][0]["id"]));
					});
				})
			);
		}

		Promise.all(promises).then(() => {
			resolve(urls);
		});
	});
};

testFunc([
	"BEcause - Dreamcatcher",
	"Bossfight - Flirt Flirt Oh It Hurts",
	"Jay Wolf - Telepathy",
	"Overwerk - Daybreak",
]).then((res) => console.log(res));
