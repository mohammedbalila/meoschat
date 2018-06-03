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
        day: {type: Date},
        hour: {type: Date},
        min: {type: Date}
    }
});
const Message = module.exports = mongoose.model("Message", MessageSchema)