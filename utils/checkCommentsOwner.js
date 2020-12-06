const Comment = require("../models/comment");

const checkCommentOwner = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const Commment = await Comment.findById(req.params.commentId).exec();

    if (Commment.user.id.equals(req.user._id)) {
      next();
    } else {
      res.redirect("back");
    }
  } else {
    res.redirect("/login");
  }
};

module.exports = checkCommentOwner;
