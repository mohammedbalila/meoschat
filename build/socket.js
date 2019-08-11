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
const socket_io_1 = __importDefault(require("socket.io"));
const messages_1 = __importDefault(require("./controllers/messages"));
exports.default = (server) => {
    const socket = socket_io_1.default(server);
    socket.on("connection", (socketInstance) => {
        socketInstance.on("getMessages", ({ token }) => __awaiter(this, void 0, void 0, function* () {
            const messages = yield messages_1.default.getMessagesSocket(token);
            socketInstance.emit("getMessages", { messages });
        }));
        socketInstance.on("getMessagesWithUser", ({ token, receiverId }) => __awaiter(this, void 0, void 0, function* () {
            const messages = yield messages_1.default.getMessagesWithUserSocket(token, receiverId);
            socketInstance.emit("getMessagesWithUser", { messages });
        }));
        socketInstance.on("newMessage", ({ token, body, receiverId }) => __awaiter(this, void 0, void 0, function* () {
            const message = yield messages_1.default.createMessageSocket(token, receiverId, body);
            socketInstance.emit("newMessage", { message });
        }));
    });
};
//# sourceMappingURL=socket.js.map