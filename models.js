"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sortComment = function(a, b){
	if(a.votes === b.votes){
		return b.updatedAt - a.updatedAt;
	}
	return b.votes - a.votes;
}

var CommentSchema = new Schema({
	text: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	votes: {type: Number, default:0}
});

CommentSchema.method("update", function(updates, callback) {
	Object.assign(this, updates, {updatedAt: new Date()});
	this.parent().save(callback);
});

CommentSchema.method("vote",function(vote, callback) {
	if(vote === "up"){
		this.votes +=1;
	} else {
		this.votes -=1;
	}
	this.parent().save(callback);
});


var PostSchema = new Schema({
	text: String,
	createdAt: {type: Date, default: Date.now},
	comments:[CommentSchema]
});


PostSchema.pre("save", function(next){
	this.comments.sort(sortComment);
	next();
});

var Post = mongoose.model("Post",PostSchema);

module.exports.Post = Post;
