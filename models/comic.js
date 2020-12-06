const mongoose = require("mongoose");
const comicShchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  publisher: String,
  date: Date,
  series: String,
  issue: Number,
  genre: String,
  color: Boolean,
  image: String,
  owner: {
    id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    username: String,
  },
});
comicShchema.index({
  "$**": "text",
});

module.exports = mongoose.model("comic", comicShchema);
