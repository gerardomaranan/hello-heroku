const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api.js");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


apiRoutes(app);

let server = app.listen(process.env.PORT || 5000, () => {
    console.log("App [hello-heroku] is running ...");
});