const { Router } = require("express");
const {getDiets} = require("../controllers/getDiets");

const router = Router();

router.get("/", getDiets);

module.exports = router;
