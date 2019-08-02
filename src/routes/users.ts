import { Router } from 'express';
import userController from '../controllers/user';
import passport from "passport";

const router = Router();

router.post("/login", userController.login);

router.post("/register", userController.signup);

router.get("/", userController.findAll);

router.get("/:id", userController.findOne);

router.put("/:id", passport.authenticate('jwt',
    { session: false }), userController.updateOne);

router.delete("/:id", passport.authenticate('jwt',
    { session: false }), userController.deleteOne);

export default router;
