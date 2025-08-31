const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

const saucesCtrl = require("../controllers/sauces");

router.post("/", auth, multer, saucesCtrl.createSauce);
router.get("/", auth, saucesCtrl.findAllSauces);
router.get("/:id", auth, saucesCtrl.findOneSauce);
router.put("/:id", auth, multer, saucesCtrl.updateOneSauce);
router.delete("/:id", auth, saucesCtrl.deleteOneSauce);
router.post('/:id/like', auth, saucesCtrl.setLike);

module.exports = router;
