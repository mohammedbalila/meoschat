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
const lodash_1 = __importDefault(require("lodash"));
const jsonwebtoken_1 = require("jsonwebtoken");
const message_model_1 = require("../models/message.model");
const user_model_1 = require("../models/user.model");
class MessageController {
    /**
     * @description getMessagesOverSocket
     */
    static getMessagesSocket(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const strFromToken = jsonwebtoken_1.verify(token, process.env.JWT_KEY);
                const user = yield user_model_1.User.findById(strFromToken.id);
                console.log(user, strFromToken);
                if (!user) {
                    return [];
                }
                const messages = yield message_model_1.Message.find({ sender: strFromToken.id })
                    .populate("receiver", ["_id, username"], "User");
                return messages;
            }
            catch (error) {
                return error;
            }
        });
    }
    /**
     * @description getMessagesOverSocket
     */
    static createMessageSocket(token, receiverId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const strFromToken = jsonwebtoken_1.verify(token, process.env.JWT_KEY);
                const user = yield user_model_1.User.findById(strFromToken.id);
                if (!user) {
                    return {};
                }
                const messages = yield message_model_1.Message.create({ sender: strFromToken.id, receiver: receiverId, body });
                return messages;
            }
            catch (error) {
                return error;
            }
        });
    }
    static getMessagesWithUserSocket(token, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const strFromToken = jsonwebtoken_1.verify(token, process.env.JWT_KEY);
                const user = yield user_model_1.User.findById(strFromToken.id);
                if (!user) {
                    return [];
                }
                const messagesByUser = yield message_model_1.Message.find({ sender: strFromToken.id, receiver: receiverId })
                    .populate("receiver", ["_id, username"], "User");
                const messagesForUser = yield message_model_1.Message.find({ sender: receiverId, receiver: strFromToken.id })
                    .populate("receiver", "_id, username", "User");
                return messagesByUser.concat(messagesForUser);
            }
            catch (error) {
                return error;
            }
        });
    }
}
/**
* @section CRUD operations
*/
/**
 * @description findAll gets all the messages by a user in the DB
 */
MessageController.findUserMessages = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(403);
    }
    try {
        const messages = yield message_model_1.Message.find({ user: user.id })
            .populate("receiver", ["_id, username"], "User");
        return res.json({ messages });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description create creates a message from a use to another user
 */
MessageController.createMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { receiverId, body } = req.body;
    const user = req.user;
    const message = yield message_model_1.Message.create({ receiver: receiverId, sender: user.id, body });
    return res.json({ message });
});
/**
 * @description findOne gets a single user by its id
 */
MessageController.findMessagesWithUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const receiverId = req.params.receiverId;
    const user = req.user;
    if (!user) {
        return res.status(403);
    }
    try {
        const messages = yield message_model_1.Message.findOne({ user: user.id, receiver: receiverId })
            .populate("receiver", ["_id, username"], "User");
        return res.json({ messages });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
 * @description findOne updates a single message by its id
 */
MessageController.updateMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    const updateFields = lodash_1.default.pick(req.body, ["body", "read"]);
    if (!user) {
        return res.status(403);
    }
    try {
        const message = yield message_model_1.Message.findByIdAndUpdate(id, updateFields, { new: true });
        return res.json({ message });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
/**
* @description findOne updates a single message by its id
*/
MessageController.deleteMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    if (!user) {
        return res.status(403);
    }
    try {
        const message = yield message_model_1.Message.findByIdAndDelete(id);
        return res.json({ message });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.default = MessageController;
//# sourceMappingURL=messages.js.map