import io from "socket.io";
import { Server } from "http";
import MessageController from "./controllers/messages";

export default (server: Server) => {
    const socket = io(server);
    socket.on("connection", (socketInstance: SocketIO.Socket) => {
        socketInstance.on("getMessages", async ({ token }: { token: string }) => {
            const messages = await MessageController.getMessagesSocket(token);
            socketInstance.emit("getMessages", { messages });
        });

        socketInstance.on("getMessagesWithUser", async (
            { token, receiverId }: { token: string, receiverId: string },
        ) => {
            const messages = await MessageController.getMessagesWithUserSocket(token, receiverId);
            socketInstance.emit("getMessagesWithUser", { messages });
        });

        socketInstance.on("newMessage", async (
            {token, body, receiverId }: { token: string, body: string, receiverId: string },
            ) => {
                const message = await MessageController.createMessageSocket(token, receiverId, body);
                socketInstance.emit("newMessage", { message });
        });
    });
};
