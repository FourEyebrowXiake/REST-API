"use strict";

var express = require('express');
var router = express.Router();
var Post = require("./models").Post;

router.param("qID", function(req,res,next,id){
	Post.findById(id,function (err, doc){
		if(err) return next(err);
		if(!doc) {
			err = new Error("Not Found Id: "+ id);
			err.status = 404;
			return next (err);
		}
		req.post = doc;
		return next();
	});
});

router.param("aID", function(req,res,next,id){
	req.comment = req.post.comments.id(id);
	if(!req.comment) {
		err = new Error("Not Found");
		err.status = 404;
		return next(err);
	}
	next();
});

//GET /posts
router.get("/", function(req, res, next) {
	Post.find({})
				.sort({createdAt: -1})
				.exec(function(err, posts){
					if(err) return next(err);
					res.json(posts);
				});
});

//POST /posts
router.post("/", function(req, res) {
	var post = new Post(req.body);
	post.save(function(err, post){
		if(err) return next(err);
		res.status(201);
		res.json(post);
	});
});

//GET /posts/:id
router.get("/:qID", function(req, res, next) {
	res.json(req.post)
});

//POST /post/:id/comments
router.post("/:qID/comments", function(req, res) {
	if(req.body instanceof Array){
		req.post.comments = req.post.comments.concat(req.body);
	} else {
			req.post.comments.push(req.body);
	}

	req.post.save(function(err, post){
		if(err) return next(err);
		res.status(201);
		res.json(post);
	});
});

//PUT /questions/:qID/comments/:aID
// edit a specific comment
router.put("/:qID/comments/:aID",function(req, res){
	req.comment.update(req.body, function(err, result){
			if(err) return next(err);
			res.json(result);
	});
});

//DELETE /questions/:qID/comments/:aID
// delete a specific comment
router.delete("/:qID/comments/:aID",function(req, res){
	req.comment.remove(function(err){
			req.post.save(function(err, post){
				if(err) return next(err);
				res.json(post);
			});
	});
});

//POST /questions/:qID/comments/:aID/vote-up
//POST /questions/:qID/comments/:aID/vote-down
// vote on a specific comment
router.post("/:qID/comments/:aID/vote-:dir",
	function(req, res, next){
		if(req.params.dir.search(/^(up|down)$/) === -1) {
			var err = new Error("Not Found");
			err.status = 404;
			next(err);
		} else {
			req.vote = req.params.dir;
			next();
		}
	},
	function(req, res, next){
		req.comment.vote(req.vote, function(err, post){
			if(err) return next(err);
			res.json(post);
		});
});

module.exports = router;
