"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_1 = __importDefault(require("../controllers/messages"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
router.use(passport_1.default.authenticate("jwt", { session: false }));
router.get("/", messages_1.default.findUserMessages);
router.post("/", messages_1.default.createMessage);
router.get("/user/:receiverId", messages_1.default.findMessagesWithUser);
router.put("/:id", messages_1.default.updateMessage);
router.delete("/:id", messages_1.default.deleteMessage);
exports.default = router;
//# sourceMappingURL=messages.js.map