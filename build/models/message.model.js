"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        minlength: 1,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});
exports.Message = mongoose_1.model("Message", MessageSchema);
//# sourceMappingURL=message.model.js.map