import { Router } from "express";
import messagesController from "../controllers/messages";
import passport from "passport";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", messagesController.findUserMessages);

router.post("/", messagesController.createMessage);
router.get("/user/:receiverId", messagesController.findMessagesWithUser);

router.put("/:id", messagesController.updateMessage);

router.delete("/:id", messagesController.deleteMessage);

export default router;
