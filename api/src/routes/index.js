const { Router } = require("express");
const recipes = require('./recipes.js');
const diets = require('./diets.js'); 

const router = Router();

router.use('/recipes', recipes);
router.use('/diets', diets);




module.exports = router;
