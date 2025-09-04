const Sauce = require("../models/sauce");
const fs = require("fs");

/**
 * fjfjfk
 */
exports.createSauce = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  req.body.sauce = JSON.parse(req.body.sauce);

  const sauce = new Sauce({
    userId: req.auth.userId,
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + "/images/" + req.file.filename,
    heat: req.body.sauce.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Post saved successfully!" }))
    .catch((err) => res.status(400).json({ error: err }));
};

exports.findAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((err) => res.status(400).json({ error: err }));
};

exports.findOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((err) => res.status(400).json({ error: err }));
};

exports.updateOneSauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params.id });
  let sauceBody;
  let imageUrl;

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    sauceBody = JSON.parse(req.body.sauce);
    imageUrl = url + "/images/" + req.file.filename;
  } else {
    sauceBody = req.body;
    imageUrl = sauceBody.imageUrl;
  }
  sauce = {
    _id: req.params.id,
    userId: req.auth.userId,
    name: sauceBody.name,
    manufacturer: sauceBody.manufacturer,
    description: sauceBody.description,
    mainPepper: sauceBody.mainPepper,
    imageUrl,
    heat: sauceBody.heat,
    likes: sauceBody.likes,
    dislikes: sauceBody.dislikes,
    usersLiked: sauceBody.usersLiked,
    usersDisliked: sauceBody.usersDisliked,
  };

  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() =>
      res.status(200).json({ message: "Sauce updated successfully!" })
    )
    .catch((err) => res.status(400).json({ error: err }));
};

exports.deleteOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({
        error: new Error("No such sauce!"),
      });
    }
    if (sauce.userId != req.auth.userId) {
      return res.status(401).json({
        error: new Error("Unauthorized request!"),
      });
    }

    const filename = sauce.imageUrl.split("/images/")[1];

    fs.unlink("images/" + filename, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Deleted!" }))
        .catch((err) => res.status(400).json({ error: err }));
    });
  });
};

exports.setLike = (req, res, next) => {
  const userId = req.auth.userId;
  const like = req.body.like;

  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({ error: new Error("No such sauce!") });
    }

    const resetUserPreference = () => {
      if (sauce.usersLiked.includes(userId)) {
        sauce.usersLiked = sauce.usersLiked.filter((id) => id !== userId);
        sauce.likes--;
      }
      if (sauce.usersDisliked.includes(userId)) {
        sauce.usersDisliked = sauce.usersDisliked.filter((id) => id !== userId);
        sauce.dislikes--;
      }
    };

    if (like === 1) {
      resetUserPreference();
      sauce.usersLiked.push(userId);
      sauce.likes++;
    }

    if (like === 0) {
      resetUserPreference();
    }

    if (like === -1) {
      resetUserPreference();
      sauce.usersDisliked.push(userId);
      sauce.dislikes++;
    }

    sauce
      .save()
      .then(() => res.status(200).json({ message: "Preference updated!" }))
      .catch((err) => res.status(400).json({ error: err }));
  });
};
