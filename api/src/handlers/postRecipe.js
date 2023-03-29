const { getAllRecipes } = require("../controllers/controllersPostRecipe");
const { Recipe, Diet } = require("../db");

const validateRecipe = async (req, res, next) => {
  const { name, summary, healthScore, steps, image } = req.body;

  if (!name || !summary) {
    return res.status(400).json({ msg: "Title and summary are required" });
  } else {
    const getAllInfo = await getAllRecipes();

    const existRecipe = getAllInfo.find(
      (e) => e && e.name && e.name.toLowerCase() === name.toLowerCase()
    );

    if (existRecipe) {
      return res.json({ msg: "Recipe already exist" });
    }
  }

  if (
    typeof name !== "string" ||
    typeof summary !== "string" ||
    typeof steps !== "string" ||
    typeof image !== "string"
  )
    return res.status(400).json({ msg: "will only allow letters" });

  next();
};

const createRecipe = async (req, res) => {
  const { name, summary, healthScore, steps, image, diets } = req.body;

  try {
    const recipeCreated = await Recipe.create({
      name,
      summary,
      healthScore,
      steps,
      image,
    });

    const dietsDb = await Diet.findAll({
      where: {
        name: diets,
      },
    });

    await recipeCreated.addDiet(dietsDb);
    return res.status(201).json("Recipe created successfully");
  } catch (err) {
    return res.status(400).json({ err: err });
  }
};

module.exports = {
  validateRecipe,
  createRecipe,
};