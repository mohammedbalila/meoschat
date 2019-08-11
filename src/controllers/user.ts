import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { validationResult } from "express-validator";
import _ from "lodash";
import { User } from "../models/user.model";

export default class UserController {

    /**
     * @section CRUD operations
     */

    /**
     * @description findAll gets all the users in the DB
     */
    public static findAll = async (req: Request, res: Response) => {
        try {
            const username = req.query.username;
            const users = await User.find({}, { password: 0 });
            return res.json({ users });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description findOne gets a single user by its id
     */
    public static findOne = async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const user = await User.findOne({ _id: id }, { password: 0, })
                .populate({ path: "cart", select: "_id, books" });
            return res.json({ user });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description updateOne updates an authenticated user by its id
     * the id is not required in this fucntion but it"s used only for
     * code consistensy
     */

    public static updateOne = async (req: Request, res: Response) => {
        const body = req.body;
        const user = req.user;
        const updatedFields = _.pick(body, ["email", "phone", "points",]);

        if (!user) {
            return res.sendStatus(403);
        }
        try {
            const doc = await User.
                findByIdAndUpdate(user.id, updatedFields);
            return res.json({ message: "updated successfuly", user: doc });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @description deleteOne deletes an authenticated user by its id
     * the id is not required in this fucntion but it"s used only for
     * code consistensy
     */
    public static deleteOne = async (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            return res.sendStatus(403);
        }
        try {
            const doc = await User.findByIdAndDelete(user.id);
            return res.json({ message: "deleted successfuly", user: doc });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    /**
     * @section Authentication
     */

    /**
     * @description login authenticate an exsidting user and generates a jwt
     */
    public static login = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("local",
            { session: false }, async (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.json({ info });
                }

                const payload = {
                    cart: user.cart,
                    email: user.email,
                    id: user.id,
                };
                const token = jwt.sign(payload, process.env.JWT_KEY);
                return res.json({ user, token });
            })(req, res, next);

    }

    /**
     * @description signup Creates a new user and save to the DB
     */
    public static signup = async (req: Request, res: Response) => {
        const fields = _.pick(req.body, [
            "username", "password", "dateOfBirth",
        ]);
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        try {
            const exsistedUser = await User.findOne({
                username: fields.username,
            });
            if (exsistedUser) {
                return res.status(400)
                    .json({ message: "This email is already in use" });
            }
            const user = await User.create(fields);
            return res.json({ message: "Account was created" }).status(201);
        } catch (error) {
            return res.status(500).json({ error });
        }

    }

}
