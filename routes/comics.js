const express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
const Comic = require("../models/comic");
const Comment = require("../models/comment");
const checkComicOwner = require("../utils/checkComicOwner");
const isLoggedIn = require("../utils/isLoggedIn");

router.get("/", async (req, res) => {
  console.log(req.user);
  try {
    const comics = await Comic.find().exec();
    res.render("comics", { comics });
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
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
router.get("/new", isLoggedIn, (req, res) => {
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
//Genre
router.get("/genre/:genre", async (req, res) => {
  const validGenres = [
    "superhero",
    "manga",
    "slice-of-life",
    "humor",
    "sci-fi",
    "fantasy",
    "horror",
    "action",
    "nonfiction",
  ];
  if (validGenres.includes(req.params.genre.toLowerCase())) {
    const comics = await Comic.find({ genre: req.params.genre }).exec();
    console.log(comics);
    res.render("comics", { comics });
  } else {
    console.log("Enter Valid Genre " + req.params.genre);
  }
});
router.get("/:id", isLoggedIn, async (req, res) => {
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

module.exports = router;
