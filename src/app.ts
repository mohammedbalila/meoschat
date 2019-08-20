import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import router from "./routes";
import "./config/passport";

const app = express();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
    .then(() => {
        // tslint:disable-next-line: no-console
        console.log("Connected to the DB");
    }).catch((error: Error) => {
        // tslint:disable-next-line: no-console
        console.log(error.message);
    });

app.use(passport.initialize());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"));

app.use("/", express.static("assests"));
app.use("/api", router);

export default app;

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
