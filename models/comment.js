const mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  user: {
            id: {
              type: mongoose.SchemaTypes.ObjectId,
              ref: "User",
            },
    username: String,
  },
  text: String,
  comicId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Comic",
  },
});

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
