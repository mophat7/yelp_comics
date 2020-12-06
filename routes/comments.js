const express = require("express");
const route = express.Router();
const Comment = require("../models/comment");
const Comic = require("../models/comic");
const checkCommentOwner = require("../utils/checkCommentsOwner");

route.get("/comics/:id/comments/new", (req, res) => {
  res.render("comments_new", { id: req.params.id });
});

route.post(`/comics/:id/comments`, isLogggedIn, async (req, res) => {
  const comment = {
    user: {
      id: req.user._id,
      username: req.user.username,
    },
    text: req.body.text,
    comicId: req.body.comicId,
  };
  const newComment = await Comment.create(comment);
  try {
    console.log(newComment);
    res.redirect(`/comics/${req.body.comicId}`);
  } catch (error) {
    console.log(error);
    res.redirect(`/comics/${req.body.comicId}`);
  }
});

route.get(
  "/comics/:id/comments/:commentId/edit",
  isLogggedIn,
  checkCommentOwner,
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
  isLogggedIn,
  checkCommentOwner,
  (req, res) => {
    Comment.findByIdAndUpdate(
      req.params.commentid,
      { text: req.body.text },
      { new: true }
    )

      .then((updatedComment) => {
        console.log(updatedComment);
        res.redireclect(`/comics/${req.params.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
route.delete(
  "/comics/:id/comments/:commentId",
  isLogggedIn,
  checkCommentOwner,
  async (req, res) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(
        req.params.commentId
      ).exec();
      console.log(deletedComment);
      res.redirect(`/comics/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  }
);

function isLogggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}
module.exports = route;
