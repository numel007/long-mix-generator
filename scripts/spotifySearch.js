const request = require("request");

exports.getSongNames = (accessToken, genre) => {
	var options = {
		method: "GET",
		url: `https://api.spotify.com/v1/recommendations?limit=1&seed_genres=${genre.genre}`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	return new Promise((resolve, reject) => {
		request(options, function (error, response) {
			let names = [];
			let tracks = JSON.parse(response.body)["tracks"];

			if (tracks.length == 0) {
				reject({ err: "Bad genre" });
			}

			for (let track in tracks) {
				names.push(`${tracks[track]["name"]} - ${tracks[track]["artists"][0]["name"]}`);
			}
			resolve({ names: names });
		});
	});
};
