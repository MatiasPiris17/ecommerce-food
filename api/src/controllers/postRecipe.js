const { getAllRecipes } = require("./data");
const { Recipe, Diet } = require("../db");

const validateRecipe = async (req, res, next) => {
  const { title, summary, healthScore, instructions, image } = req.body;

  if (!title || !summary) {
    return res.status(400).json({ msg: "Title and summary are required" });
  } else {
    const getAllInfo = await getAllRecipes();

    const existRecipe = getAllInfo.find(
      (e) => e.title.toLowerCase() === title.toLowerCase()
    ); 

    if (existRecipe) {
      return res.json({ msg: "Recipe already exist" });
    }
  }

  if (
    typeof title !== "string" ||
    typeof summary !== "string" ||
    typeof instructions !== "string" ||
    typeof image !== "string"
  )
    return res.status(400).json({ msg: "will only allow letters" });

  next();
};

const createRecipe = async (req, res) => {
  const { title, summary, healthScore, instructions, image, diets } = req.body;

  try {
    const recipeCreated = await Recipe.create({
      title,
      summary,
      healthScore,
      instructions,
      image,
    });

    const dietsDb = await Diet.findAll({
      where: {
        name: diets
      },
    });
  
    await recipeCreated.addDiets(dietsDb);
    return res.status(201).json("Recipe created successfully");
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

module.exports = {
  validateRecipe,
  createRecipe,
};
