import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator/check";
import _ from "lodash";
import { verify } from "jsonwebtoken";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";

export default class MessageController {

    /**
    * @section CRUD operations
    */

    /**
     * @description findAll gets all the messages by a user in the DB
     */
    public static findUserMessages = async (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            return res.status(403);
        }
        try {
            const messages = await Message.find({ user: user.id })
                .populate("receiver", ["_id, username"], "User");
            return res.json({ messages });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description getMessagesOverSocket
     */

    public static async getMessagesSocket(token: string) {
        try {
            const strFromToken = verify(token, process.env.JWT_KEY) as any;

            const user = await User.findById(strFromToken.id);

            if (!user) { return []; }
            const sent = await Message.find({ sender: strFromToken.id })
                .populate("receiver", ["_id", "username", "profileImage"], "User");
            const received = await Message.find({ receiver: strFromToken.id })
                .populate("sender", ["_id", "username", "profileImage"], "User");

            const messages = _.uniqBy(sent, ["sender"]).concat(_.uniqBy(received, ["receiver"]));
            return _.sortBy(messages, ["date"]);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description getMessagesOverSocket
     */

    public static async createMessageSocket(token: string, receiverId: string, body: string) {
        try {
            const strFromToken = verify(token, process.env.JWT_KEY) as any;

            const user = await User.findById(strFromToken.id);
            if (!user) { return {}; }
            const messages = await Message.create({ sender: strFromToken.id, receiver: receiverId, body });
            return messages;
        } catch (error) {
            return error;
        }
    }

    public static async getMessagesWithUserSocket(token: string, receiverId: string) {
        try {
            const strFromToken = verify(token, process.env.JWT_KEY) as any;

            const user = await User.findById(strFromToken.id);

            if (!user) { return []; }
            const messagesByUser = await Message.find({ sender: strFromToken.id, receiver: receiverId })
                .populate("receiver", ["_id, username"], "User")
                .populate("sender", ["_id", "profileImage"], "User");
            const messagesForUser = await Message.find({ sender: receiverId, receiver: strFromToken.id })
                .populate("receiver", "_id, username", "User")
                .populate("sender", ["_id", "profileImage"], "User");
            return messagesByUser.concat(messagesForUser);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description create creates a message from a use to another user
     */

    public static createMessage = async (req: Request, res: Response) => {
        const { receiverId, body } = req.body;
        const user = req.user;
        const message = await Message.create({ receiver: receiverId, sender: user.id, body });
        return res.json({ message });
    }

    /**
     * @description findOne gets a single user by its id
     */
    public static findMessagesWithUser = async (req: Request, res: Response) => {
        const receiverId = req.params.receiverId;
        const user = req.user;
        if (!user) {
            return res.status(403);
        }
        try {
            const messages = await Message.findOne({ user: user.id, receiver: receiverId })
                .populate("receiver", ["_id, username"], "User");
            return res.json({ messages });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description findOne updates a single message by its id
     */
    public static updateMessage = async (req: Request, res: Response) => {
        const id = req.params.id;
        const user = req.user;
        const updateFields = _.pick(req.body, ["body", "read"]);
        if (!user) {
            return res.status(403);
        }
        try {
            const message = await Message.findByIdAndUpdate(id, updateFields, { new: true });
            return res.json({ message });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description findOne updates a single message by its id
     */
    public static deleteMessage = async (req: Request, res: Response) => {
        const id = req.params.id;
        const user = req.user;
        if (!user) {
            return res.status(403);
        }
        try {
            const message = await Message.findByIdAndDelete(id);
            return res.json({ message });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}
