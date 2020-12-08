const express = require("express");
const route = express.Router();
const Comment = require("../models/comment");
const Comic = require("../models/comic");
const checkCommentOwner = require("../utils/checkCommentsOwner");
const isLoggedIn = require("../utils/isLoggedIn");

route.get("/comics/:id/comments/new", (req, res) => {
  res.render("comments_new", { id: req.params.id });
});

route.post(`/comics/:id/comments`, isLoggedIn, async (req, res) => {
  const comment = {
    user: {
      id: req.user._id,
      username: req.user.username,
    },
    text: req.body.text,
    comicId: req.body.comicId,
  };
  const newComment = await Comment.create(comment);
  req.flash("success", "Your Comment has been posted");
  try {
    res.redirect(`/comics/${req.body.comicId}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/comics/${req.body.comicId}`);
  }
});

route.get(
  "/comics/:id/comments/:commentId/edit",
  isLoggedIn,

  async (req, res) => {
    try {
      const comic = await Comic.findById(req.params.id).exec();
      const comment = await Comment.findById(req.params.commentId).exec();
      res.render("comments_edit", { comic, comment });
    } catch (error) {
      console.log(error);
    }
  }
);

route.put(
  "/comics/:id/comments/:commentid",

  async (req, res) => {
    try {
      await Comment.findByIdAndUpdate(
        req.params.commentid,
        { text: req.body.text },
        { new: true }
      );
      req.flash("success", "Updated Comment Successfully");
      res.redirect(`/comics/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  }
);
route.delete(
  "/comics/:id/comments/:commentId",

  async (req, res) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(
        req.params.commentId
      ).exec();
      req.flash("success", "Deleted comment successfully");
      res.redirect(`/comics/${req.params.id}`);
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = route;
