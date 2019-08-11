const router = require("express").Router();
const bycrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const User = require("../models/user");
const passport = require("passport");
const session = require("express-session");
const flash = require('req-flash');
const settingControl = require('../controlers/setting');
require("express")().use(bodyParser.json());
require("express")().use(bodyParser.urlencoded({ extended: false }));
const mongoose = require("mongoose");
const Message = require("../models/message");
const Post = require("../models/post");
mongoose.connect(require("../config/db"));
router.get('/', settingControl.isAuth(), (req, res) => {
    let id = req.user.id;
    let username = req.user.username;
    res.render('setting', { id: id, username: username });
});
router.post('/edit:type', settingControl.editUser);
router.post('/image:id', settingControl.image);
module.exports = router;
//# sourceMappingURL=setting.js.map