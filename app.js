const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");

const indexRouter = require("./routes/index");

const app = express();

// Set up mongoose connection to atlas database
const { connectToDb } = require("./db");
try {
	connectToDb();
} catch (e) {
	console.log(e);
}

// Set up rate limiter: maximum of 10 requests every 10 seconds
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
	windowMs: 1 * 10 * 1000, // 10 seconds
	max: 10,
});
// Apply rate limiter to all requests
app.use(limiter);

// Compress all routes
app.use(compression());

/*
+ set up helmet in middleware chain: Set CSP headers to allow thigns suc has bootstrap or jquery 
  to have served if you use those.
*/
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			"script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
		},
	})
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Starting middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
