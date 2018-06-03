const router = require("express").Router()
const bycrypt = require("bcryptjs")
const bodyParser = require("body-parser");
const passport = require("passport")
const session = require("express-session")
const mongoose = require("mongoose")
const db = mongoose.connection;
const User = require('../models/user')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(require("../config/db"))
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get("/login",(req,res)=>{
    res.render("login")
});
router.post("/login",passport.authenticate('local', { failureRedirect: '/auth/login' }),(req,res)=>{
    res.redirect("/")
})

router.get("/logout",(req,res)=>{
    req.logout();
    req.session.destroy()
    res.redirect('/');
});
let msg;
router.get("/register",(req,res)=>{
    res.render("register",{msg:msg})
});
router.post("/register",(req,res)=>{
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username
    User.findOne({username:username},(err,uer)=>{
        if (uer) {
            req.flash("danger", "username is already taken")
            res.redirect('/auth/register')
        } else {
            bycrypt.hash(password,10,(err,hash)=>{
                if (err) console.log(err);throw Error()
                let user = new User({
                    username:username,
                    email:email,
                    password:hash
                }); 
                user.save((err)=>{
                    if (err) throw Error()
                    req.login(user,(err)=>{
                    if (err) console.log(err);
                    res.redirect("/")
                    });
                })
            });
        }
    });
});

module.exports = router
// var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

// var tagOrComment = new RegExp(
//     '<(?:'
//     // Comment body.
//     + '!--(?:(?:-*[^->])*--+|-?)'
//     // Special "raw text" elements whose content should be elided.
//     + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
//     + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
//     // Regular name
//     + '|/?[a-z]'
//     + tagBody
//     + ')>',
//     'gi');
// function removeTags(html) {
//   var oldHtml;
//   do {
//     oldHtml = html;
//     html = html.replace(tagOrComment, '');
//   } while (html !== oldHtml);
//   return html.replace(/</g, '&lt;');
// }