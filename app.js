const mongoose = require("mongoose");
const app = require("express")();
const routs = require("./routs")
const path = require('path')
let User = require("./user")
const io = require("socket.io");
const passport = require("passport")
const bcrypt = require("bcryptjs")
const session = require("express-session")
// const flash = require("flash-messages")
require("./config/passport")(passport);

app.use(session({
    secret: '__AvGenRate__',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(require("./config/db"))
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use("/", routs)
const port = process.env.PORT || 3000
app
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use('/', require("express").static('assests'));

const server = app.listen(port);
const socket = io(server);

socket.on("connection", (instance) => {

    instance.on("msg", (data) => {
        socket.sockets.emit("msg", data);
    });

    instance.on("typing", (data) => {
        instance.broadcast.emit("typing", data);
    });

});