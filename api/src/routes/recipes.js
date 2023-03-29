const { Router } = require("express");
const { getRecipeByName } = require("../handlers/getRecipeByName");
const { getRecipeById } = require("../handlers/getRecipeById");
const {validateRecipe, createRecipe} = require("../handlers/postRecipe")

const router = Router();

router.get("/", getRecipeByName);
router.get("/:id", getRecipeById);
router.post("/create", validateRecipe,createRecipe );

module.exports = router;
