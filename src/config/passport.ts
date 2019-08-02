import passport from "passport";
import passportLocal from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { User } from "../models/user.model";
import { Error } from "mongoose";

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

const LocalStrategy = passportLocal.Strategy;

passport.use(new JWTStrategy(opts, (jwtPayload, done) => {
    User.findOne({ _id: jwtPayload.id })
        .then((user) => {
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        })
        .catch((err) => done(err, false));

}));

passport.use(new LocalStrategy((username, password, done: any) => {
    User.findOne({ username })
        .then((user) => {
            if (!user) {
                return done(null, false, { message: "Wrong username" });
            }
            user.comparePassword(password, (err: Error, isMatch: boolean) => {
                if (err) {
                    return done(err.message, false, { message: err.message });
                }
                if (isMatch) {
                    return done(null, user);
                }
                return done(null, false, { message: "Wrong password" });
            });
        })
        .catch((err) => done(err));
}));