"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
require("./config/passport");
const app = express_1.default();
mongoose_1.default.connect(process.env.DB_URI, { useNewUrlParser: true })
    .then(() => {
    // tslint:disable-next-line: no-console
    console.log("Connected to the DB");
}).catch((error) => {
    // tslint:disable-next-line: no-console
    console.log(error.message);
});
app.use(passport_1.default.initialize());
app.use(compression_1.default());
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(morgan_1.default("common"));
app.use("/", express_1.default.static("assests"));
app.use("/api", routes_1.default);
exports.default = app;
/*
let users = []
socket.on("connection", (instance) => {
    instance.on("user", (user) => {
        users.push(user)
        instance.broadcast.emit("user", user)
        instance.emit("users_connected", users.length)
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
                console.log("saved")
            })
        }).catch((err) => {
            if (err) throw err
        })
    });

    instance.on("typing", (data) => {
        instance.broadcast.emit("typing", data);
    });
    instance.on("disconnect", (socket_) => {
        users.pop()
        instance.emit("users_connected", users.length)
    })

    instance.on("post", (postInfo) => {
        return new Promise((res, rej) => {
            const post = new Post({ auther: postInfo.username, body: postInfo.data, date: postInfo.date })
            res(post)
            rej(null)
        }).then((post) => {
            post.save()
            console.log("saved")
            instance.emit("post", postInfo)
        }).catch((err) => {
            if (err) throw err
        })
    })

    instance.on("like", (id) => {
        console.log(id)
        Post.findById(id, (err, res) => {
            console.log(res)
        })
        Post.update({ _id: id }, { $inc: { likes: 1 } }, (err, done) => {
            console.log(done)
        })
    })
    instance.on("unlike", (id) => {
        Post.update({ _id: id }, { $inc: { likes: -1 } })
    })
});
*/
//# sourceMappingURL=app.js.map