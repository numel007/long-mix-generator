const request = require("request");

// Remember to export
getSongNames = (accessToken, genre) => {
	var options = {
		method: "GET",
		url: `https://api.spotify.com/v1/recommendations?limit=5&seed_genres=${genre}`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	return new Promise((resolve, reject) => {
		request(options, function (error, response) {
			if (error) {
				reject({ err: "Failed to retrieve songs" });
			}

			let names = [];
			let tracks = JSON.parse(response.body)["tracks"];
			for (let track in tracks) {
				names.push(`${tracks[track]["name"]} - ${tracks[track]["artists"][0]["name"]}`);
			}
			resolve(names);
		});
	});
};

getSongNames(
	"BQCyIi9h2NFsM-KZ-L4a9rKcYgy30p2YN9aG-ynpM_KaPJvu55UjBZB5GM3z6uzRo-ghg5rz9B9UcxxfhDg",
	"ambient"
).then((res) => {
	console.log(res);
});
