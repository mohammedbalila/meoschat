const router = require("express").Router()
const bodyParser = require("body-parser");
const passport = require("passport")
const session = require("express-session")
const mongoose = require("mongoose")
const authControll = require('../controlers/auth')
const db = mongoose.connection;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(require("../config/db"))
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get("/login", (req, res) => {
    res.render("login")
});
router.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'auth/login',
    failureFlash: true
}))

router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy()
    res.redirect('/');
});
let msg;
router.get("/register", (req, res) => {
    res.render("register", { msg: msg })
});

router.post("/register",authControll.register);

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