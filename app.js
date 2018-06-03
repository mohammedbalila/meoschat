const mongoose = require("mongoose");
const app = require("express")();
const homeRoute = require("./routs/routs")
const authRoute = require('./routs/auth')
const settingRoute = require('./routs/setting')
const path = require('path')
const User = require("./models/user")
const Message = require("./models/message")
const Post = require('./models/post')
const io = require("socket.io");
const passport = require("passport")
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
require("./config/passport")(passport);

const store = new MongoDBSession({
    uri: require("./config/db"),
    database: 'komwledge_stream',
    collection: 'Sessions'
})
app.use(session({
    secret: '__AvGenRate__',
    resave: true,
    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
    store: store,
    saveUninitialized: true

}));

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(require("./config/db"))
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use("/", homeRoute)
app.use('/auth', authRoute)
app.use('/setting', settingRoute)
const port = process.env.PORT || 3000
app
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use('/assests', require("express").static(path.join(__dirname, 'assests')))
    .use('/auth', require("express").static(path.join(__dirname, 'assests')))

const server = app.listen(port);
const socket = io(server);
let users = []
socket.on("connection", (instance) => {
    instance.on('user', (user) => {
        users.push(user)
        instance.broadcast.emit('user', user)
        instance.emit('users_connected', users.length)
    })

    instance.on("message", (data) => {
        socket.send(JSON.stringify(data));
        return new Promise((resolve, reject) => {
            const msg = new Message({ auther: data.user, body: data.message , date:data.date})
            resolve(msg)
            reject(null)
        }).then((msg) => {
            msg.save((err) => {
                if (err) throw err;
                console.log('saved')
            })
        }).catch((err) => {
            if (err) throw err
        })
    });

    instance.on("typing", (data) => {
        instance.broadcast.emit("typing", data);
    });
    instance.on('disconnect', (socket_) => {
        users.pop()
        instance.emit('users_connected', users.length)
    })

    instance.on('post', (postInfo) => {
        return new Promise((res, rej) => {
            const post = new Post({ auther: postInfo.username, body: postInfo.data, date: postInfo.date })
            res(post)
            rej(null)
        }).then((post) => {
            post.save()
            console.log('saved')
            instance.emit('post', postInfo)
        }).catch((err) => {
            if (err) throw err
        })
    })

    instance.on('like', (id) => {
        console.log(id)
        Post.findById(id, (err, res) => {
            console.log(res)
        })
        Post.update({ _id: id }, { $inc: { likes: 1 } }, (err, done) => {
            console.log(done)
        })
    })
    instance.on('unlike', (id) => {
        Post.update({ _id: id }, { $inc: { likes: -1 } })
    })
});