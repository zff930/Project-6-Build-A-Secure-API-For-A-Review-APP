const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const saucesCtrl = require("../controllers/sauces");

router.post("/", auth, saucesCtrl.createSauce);
router.get("/", auth, saucesCtrl.findAllSauces);
router.get("/:id", auth, saucesCtrl.findOneSauce);
router.put("/:id", auth, updateOneSauce);
router.delete("/:id", auth, deleteOneSauce);
router.post('/:id/like', auth, saucesCtrl.setLike);

module.exports = router;
