var http = require("http"),
	path = require("path"),
	express = require("express"),
	logger = require("morgan"),
	bodyParser = require("body-parser");

var app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];

//make the entries array available in all view
app.locals.entries = entries;

app.use(logger("dev"));

//populate a variable called req.body if the user is submitting a form(Extended option is required)
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/new-entry", function(req, res) {
	res.render("new-entry");
});

app.post("/new-entry", function(req, res) {
	if (!req.body.title || !req.body.body) {
		res.status(400).send("Entries must have a title and a body");
	}

	entries.push({
		title: req.body.title,
		content: req.body.body,
		published: new Date()
	});
	res.redirect("/");
});

app.use(function(req, res) {
	res.status(404).render("404");
});

http.createServer(app).listen(app.get("port"), function(err) {
	if (err) {
		return console.log(err);
	}
	console.log("Guest book app started on port " + app.get("port"));
});
