import { Document, Schema, Error, model } from "mongoose";

export type MessageDocument = Document & {
    sender: any;
    receiver: any;
    body: string;
    date: Date;
    read: boolean;
};

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        minlength: 1,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});
export const Message = model<MessageDocument>("Message", MessageSchema);
