const request = require("request");
require("dotenv").config();

exports.getAccessToken = () => {
	var authOptions = {
		url: "https://accounts.spotify.com/api/token",
		headers: {
			Authorization:
				"Basic " +
				new Buffer(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64"),
		},
		form: {
			grant_type: "client_credentials",
		},
		json: true,
	};

	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var token = body.access_token;
			return token;
		} else {
			console.log("Something broke...");
		}
	});
};
