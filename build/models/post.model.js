const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    auther: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        day: { type: Date },
        hour: { type: Date },
        min: { type: Date }
    },
});
const Post = module.exports = mongoose.model("Post", PostSchema);
//# sourceMappingURL=post.model.js.map