const mongoose = require("mongoose");

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    auther: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type:Date,
        default: new Date()
    }
});
const Message = module.exports = mongoose.model("Message", MessageSchema)