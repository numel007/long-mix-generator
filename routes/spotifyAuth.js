const express = require("express");
const router = express.Router();
const querystring = require("querystring");
const encodeFormData = require("../scripts/encodeFormData")

router.get("/login", (req, res) => {
	let scope = "";
	res.redirect(
		`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=${scope}&show_dialog=true`
	);
});

router.get("/logged", (req, res) => {
  let body = {
    grant_type="authorization_code",
    code: req.query.code,
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  }

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    body: encodeFormData(body)
  })
  .then(resp => resp.json())
  .then(data => {
    let query = quertystring.stringify(data)
    res.redirect(`http://localhost:3000/${query}`)
  })

})
