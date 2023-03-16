const { Router } = require("express");
const { getRecipeByName } = require("../handlers/getRecipeByName");
const { getRecipeById } = require("../handlers/getRecipeById");
const postRecipe = require("../handlers/postRecipe");

const router = Router();

router.get("/", getRecipeByName);
router.get("/:id", getRecipeById);
router.post("/", postRecipe);

module.exports = router;
