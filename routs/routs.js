const router = require("express").Router({ mergeParams: true })
const bycrypt = require("bcryptjs")
const bodyParser = require("body-parser");
const passport = require("passport")
const session = require("express-session")
const homeControles = require('../controlers/home')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require("mongoose")
mongoose.connect(require("../config/db"))
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.use(require('connect-flash')())
router.use((req,res,next)=>{
    res.locals.messages = require('express-messages')(req,res)
    next()
})
router.get("/",homeControles.isAuth(),homeControles.home);

router.get('/messages',homeControles.isAuth(),homeControles.messages)

router.get('/messages/all',homeControles.isAuth(),homeControles.allMessages)

router.get('/posts/:id',homeControles.isAuth(),homeControles.single)

module.exports = router;