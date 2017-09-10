"use strict";

var express = require("express");
var app = express();
var routes = require("./routes");

var logger = require("morgan");
var jsonParser = require("body-parser");
var markdown = require("markdown").markdown;

app.use(logger("dev"));
app.use(jsonParser());

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/qa");

var db = mongoose.connection;

db.on("error", function(err){
	console.error("connection error:", err);
});

db.once("open", function(){
	console.log("db connection successful");
});

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
		return res.status(200).json({});
	}
	next();
});

app.use("/posts",routes);

app.use(function(req, res, next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.status + " " + err.message
		}
	});
});

var port = process.env.PORT || 3000;

app.listen(port,function(){
	console.log("Server is listening on port", port);
});
