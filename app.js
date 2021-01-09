const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");




const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,

      status: "subscribed",

      merge_fields: {

        FNAME: firstName,

        LNAME: lastName
      }

    }]
  }

  var jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/b9bdfea767";
  const options = {
    method: "POST",
    auth: "dikshant1:556c46d545b179aa8904d57952cdb70e-us7"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })

  })

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/")
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server Started");
});

// API apiKey
// 556c46d545b179aa8904d57952cdb70e-us7

// unique id
// b9bdfea767
