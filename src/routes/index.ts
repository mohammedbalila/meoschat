import { Router } from "express";
import users from "./users";
import messages from "./messages";

const router = Router();

router.use("/users", users);
router.use("/messages", messages);

export default router;
