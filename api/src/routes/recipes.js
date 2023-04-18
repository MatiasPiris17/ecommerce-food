const { Router } = require("express");
const { recipeId } = require("../controllers/recipeId");
const { validateRecipe, createRecipe } = require('../controllers/postRecipe')
const {recipeName} = require('../controllers/recipeName')

const router = Router();

router.get("/", recipeName);
router.get("/:id", recipeId);
router.post("/create", validateRecipe, createRecipe);

module.exports = router;
