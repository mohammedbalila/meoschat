import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator/check';
import _ from 'lodash';
import { Message } from '../models/message.model';

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
                .populate('receiver', ['_id, username'], 'User');
            return res.json({ messages });
        } catch (error) {
            return res.status(500).json({ error });
        }
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
                .populate('receiver', ['_id, username'], 'User');
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
        const updateFields = _.pick(req.body, ['body', 'read']);
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
