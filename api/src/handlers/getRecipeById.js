require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diet } = require(`../db.js`);
const {
  reduceObjectsRecipes,
  modifyDietAttributes,
} = require("../controllers/controllersRecipe");

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(404).send("No hay id");
    if (!id.includes("-")) {
      const recipeApi = (
        await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        )
      ).data;

      if (recipeApi.hasOwnProperty("id")) {
        return res.json(reduceObjectsRecipes(recipeApi));
      }
    } else {
      const recipeDb = await Recipe.findByPk(id, {
        include: {
          model: Diet,
          as: "diets",
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      res.json(modifyDietAttributes(recipeDb));
    }
    return res.status(404).send("No se encontro receta");
  } catch (error) {
    return res.status(404).json(error);
  }
};

module.exports = { getRecipeById };
