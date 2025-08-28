const Sauce = require("../models/sauce");

exports.createSauce = (req, res, next) => {
  const sauce = new Sauce({
    userId: req.auth.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
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
  const sauce = new Sauce({
    _id: req.params.id,
    userId: req.auth.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
  });
  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() =>
      res.status(201).json({ message: "Sauce updated successfully!" })
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
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Deleted!" }))
      .catch((err) => res.status(400).json({ error: err }));
  });
};

exports.setLike = (req, res, next) => {};
