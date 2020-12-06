const express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
const Comic = require("../models/comic");
const Comment = require("../models/comment");
const checkComicOwner = require("../utils/checkComicOwner");

router.get("/", isLogggedIn, async (req, res) => {
  console.log(req.user);
  try {
    const comics = await Comic.find().exec();
    res.render("comics", { comics });
  } catch (error) {
    console.log(error);
  }
});
router.post("/", isLogggedIn, async (req, res) => {
  //make schema
  const genre = req.body.genre.toLowerCase();
  const newComic = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    title: req.body.title,
    publisher: req.body.publisher,
    date: req.body.date,
    series: req.body.series,
    issue: req.body.issue,
    genre,
    color: !!req.body.color,
    image: req.body.image,
    owner: {
      id: req.user._id,
      username: req.user.username,
    },
  };

  const comic = await Comic.create(newComic);
  try {
    console.log(comic);
    res.redirect("/comics/" + comic._id);
  } catch (error) {
    console.log(error);
  }
});
router.get("/new", isLogggedIn, (req, res) => {
  res.render("comics_new");
});
router.get("/search", async (req, res) => {
  try {
    const comics = await Comic.find({
      $text: {
        $search: req.query.term,
      },
    });
    res.render("comics", { comics });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", isLogggedIn, async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id).exec();
    const comments = await Comment.find({ comicId: req.params.id });

    res.render("comics_show", { comic, comments });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/edit", checkComicOwner, async (req, res) => {
  const comic = await Comic.findById(req.params.id).exec();

  res.render("comic_edit", { comic });
});

router.put("/:id/", checkComicOwner, async (req, res) => {
  const genre = req.body.genre.toLowerCase();
  const comic = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    title: req.body.title,
    publisher: req.body.publisher,
    date: req.body.date,
    series: req.body.series,
    issue: req.body.issue,
    genre,
    color: !!req.body.color,
    image: req.body.image,
  };
  try {
    const updatedComic = await Comic.findByIdAndUpdate(req.params.id, comic, {
      new: true,
    }).exec();
    res.redirect("/comics/" + req.params.id);
    console.log(updatedComic);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id/", checkComicOwner, async (req, res) => {
  try {
    const deletedComic = await Comic.findByIdAndDelete(req.params.id).exec();
    res.redirect("/comics");
    console.log(deletedComic);
  } catch (error) {
    console.log(error);
  }
});
function isLogggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
