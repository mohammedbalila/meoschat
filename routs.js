const router = require("express")()
const bycrypt = require("bcryptjs")
const bodyParser = require("body-parser");
const User = require("./user")
const passport = require("passport")
const session = require("express-session")
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require("mongoose")
const Message = require("./message")
mongoose.connect(require("./config/db"))
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


router.get("/",authenticatedMiddleWare(),(req,res,next)=>{
    Message.find({},(err,docs)=>{
    let username = req.user.username
    // console.log(d)
    // let doc = docs.slice(docs.length - docs.length + 10, docs.length)
    // let _doc = docs
    
    res.render("home",{username:username,docs:docs})
});
})
router.get("/login",(req,res)=>{
    res.render("login")
});
router.post("/login",passport.authenticate('local', { failureRedirect: '/login' }),(req,res)=>{
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
            msg = "username is already taken"
        } else {
            bycrypt.hash(password,10,(err,hash)=>{
                if (err) throw Error()
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

router.use(session({
    secret: '__AvGenRate__',
    resave: false,
    saveUninitialized: false
  }));

function authenticatedMiddleWare() {
    return (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect("/login");
    }
}
module.exports = router;