"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// tslint:disable: object-literal-sort-keys
const userScheam = new mongoose_1.Schema({
    // user shcema
    username: {
        type: String,
        minlength: 5,
        required: true,
        index: true,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    profileImage: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTETr9ViMXvaUiHz_Nwq2lYSO94WQJNUuFwiIJhNHKno_wmLolT",
    },
    password: {
        type: String,
        required: true,
    },
});
const comparePassword = function (password, cb) {
    bcryptjs_1.default.compare(password, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
userScheam.methods.comparePassword = comparePassword;
userScheam.pre("save", function (next) {
    const user = this;
    if (!user.isModified()) {
        return next();
    }
    bcryptjs_1.default.hash(user.password, 8, (err, hash) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    }));
});
const User = mongoose_1.model("User", userScheam);
exports.User = User;
User.createIndexes((err) => {
    if (err) {
        // tslint:disable:no-console
        console.error(err);
    }
    else {
        console.log("Index was created - User");
    }
});
//# sourceMappingURL=user.model.js.map