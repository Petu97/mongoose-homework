const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//const Comments = mongoose.model("Comments", commentSchema);

const messageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: [commentSchema],
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model("Messages", messageSchema);
module.exports = Messages;
