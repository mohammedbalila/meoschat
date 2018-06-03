const User = require("../models/user")
const Message = require("../models/message")
const Post = require("../models/post")
const passport = require("passport")

const mongoose = require("mongoose")
mongoose.connect(require("../config/db"))

exports.home = function (req,res,next){
    let posts;
    let username = req.user.username
    Post.find({},(err,posts)=>{
        if (err) throw err
    res.render("home",{username:username,posts:posts})
    })
}

exports.messages = function (req,res){
    let username = req.user.username
    Message.find({},(err,docs)=>{
    console.log(docs)
    res.render("messages",{username:username,docs:docs})
}).limit(7)
}

exports.allMessages = function (req,res) {
    let username = req.user.username
    Message.find({},(err,docs)=>{
    console.log(docs)
    res.render("messages",{username:username,docs:docs})
})   
}

exports.single = function (req,res) {
    let username = req.user.username
    let id = req.params.id
    id = id.replace(':','')
    Post.find({_id:id},(err,post)=>{
        res.render('post',{username:username,posts:post})
    })
    
}

exports.isAuth = function () {
    return (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect("auth/login");
    }
}