import { Document, Schema, Error, model } from "mongoose";
import bcrypt from 'bcryptjs';

export type UserDocument = Document & {
    // user defenition
    username: string;
    password: string;
    dateOfBirth: Date;
    profileImage: string;
    comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

// tslint:disable: object-literal-sort-keys
const userScheam = new Schema({
    // user shcema
    username: {
        type: String,
        minlength: 5,
        required: true,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    profileImage: {
        type: String,
        default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTETr9ViMXvaUiHz_Nwq2lYSO94WQJNUuFwiIJhNHKno_wmLolT",
    },
    password: {
        type: String,
        required: true,
    },
});

const comparePassword: comparePasswordFunction = function (password: string, cb: Function) {
    bcrypt.compare(password, this.password, (err: Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userScheam.methods.comparePassword = comparePassword;

userScheam.pre("save", function (next) {
    const user = this as UserDocument;
    if (!user.isModified()) {
        return next();
    }

    bcrypt.hash(user.password, 8, async (err: Error, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        next();
    });

});

const User = model<UserDocument>("User", userScheam);
User.createIndexes((err) => {
    if (err) {
        // tslint:disable:no-console
        console.error(err);
    } else {
        console.log("Index was created - User");
    }
});

export { User };
