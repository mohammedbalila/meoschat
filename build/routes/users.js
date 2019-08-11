"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
router.post("/login", user_1.default.login);
router.post("/signup", user_1.default.signup);
router.get("/", user_1.default.findAll);
router.get("/:id", user_1.default.findOne);
router.put("/:id", passport_1.default.authenticate('jwt', { session: false }), user_1.default.updateOne);
router.delete("/:id", passport_1.default.authenticate('jwt', { session: false }), user_1.default.deleteOne);
exports.default = router;
//# sourceMappingURL=users.js.map