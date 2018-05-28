const mongoose = require("mongoose");
const app = require("express")();
const routs = require("./routs")
const path = require('path')
let User = require("./user")
let Message = require("./message")
const io = require("socket.io");
const passport = require("passport")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
// const flash = require("flash-messages")
require("./config/passport")(passport);

const store = new MongoDBSession({
    uri:require("./config/db"),
    database:'komwledge_stream',
    collection: 'Sessions'
})
app.use(session({
    secret: '__AvGenRate__',
    resave: true,
    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
    store:store,
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
    .use('/assests', require("express").static(path.join(__dirname, 'assests')))

const server = app.listen(port);
const socket = io(server);
let users = []
socket.on("connection", (instance) => {
    users.push(instance.id)
    instance.emit('users_connected',users.length)
    instance.on("message", (data) => {
        socket.sockets.emit("msg", data);
        return new Promise((resolve,reject)=>{
        const msg = new Message({auther:data.user,body:data.message})
        resolve(msg)
        }).then((msg)=>{
            msg.save((err)=>{
            if (err) throw err;
            console.log('saved')
        })
        }).catch((err)=>{
            if (err) throw err
        })
    });

    instance.on("typing", (data) => {
        instance.broadcast.emit("typing", data);
    });
    instance.on('disconnect',(socket_)=>{
        users.pop(instance.id)
        instance.emit('users_connected',users.length)
    })

});