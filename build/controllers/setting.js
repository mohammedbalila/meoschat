const User = require('../models/user');
const bycrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: './assests/images',
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 2e6 },
    fileFilter: (req, file, cb) => check(file, cb)
}).single('image');
function check(file, cb) {
    const fileType = /jpg|jpg|png/;
    const ext = fileType.test(path.extname(file.originalname).toLowerCase());
    const mime = fileType.test(file.mimetype);
    if (ext && mime) {
        cb(null, true);
    }
    else {
        cb('Erorr: only imges', false);
    }
}
exports.editUser = function (req, res) {
    if (req.params.type == ':username') {
        let user = req.user;
        user.username = req.body.username;
        User.updateOne({ _id: req.user._id }, user, (err, done) => {
            if (err)
                throw err;
            req.flash('success', `${req.params} updated successfuly!`);
            res.redirect('/setting');
        });
    }
    if (req.params.type == ':password') {
        let old = req.body.password;
        bycrypt.compare(old, req.user.password, (err, match) => {
            if (err)
                throw err;
            if (!match) {
                req.flash('danger', 'wrong password');
                res.redirect('/setting');
            }
            if (match) {
                let user = req.user;
                bycrypt.hash(req.body.newPassword, 10, (err, hash) => {
                    user.password = hash;
                });
                User.updateOne({ _id: req.user._id }, user, (err, done) => {
                    if (err)
                        throw err;
                    req.flash('success', `${req.params} updated successfuly!`);
                    res.redirect('/setting');
                });
            }
        });
    }
};
exports.image = function (req, res) {
    upload(req, res, err => {
        if (err) {
            req.flash('danger', err);
            res.redirect('/setting');
        }
        else {
            console.log(req.file);
            res.send('good');
        }
    });
};
exports.isAuth = function () {
    return (req, res, next) => {
        if (req.isAuthenticated())
            return next();
        res.redirect("auth/login");
    };
};
//# sourceMappingURL=setting.js.map