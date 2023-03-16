require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diet } = require(`../db.js`);
const {
  reduceObjectsRecipes,
  modifyDietAttributes,
} = require("../controllers/controllersRecipe");
const { Op } = require("sequelize");

const getRecipeByName = async (req, res) => {
  try {
    const { name } = req.query;

    const { results } = (await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      )).data

    //Filtra las recetas a solo las que tengan el valor de la query "name" incluida en su titulo
    let recipesApi = !!name
      ? results.filter((recipe) =>
          recipe.title.toLowerCase().includes(name.toLowerCase())
        )
      : results;

    //Objeto de cada receta solo con las propiedades necesarias
    recipesApi = recipesApi.map((recipe) => reduceObjectsRecipes(recipe));

    let recipesDB = await Recipe.findAll({
      where: !!name
        ? {
            name: {
              [Op.substring]: name.toLowerCase(),
            },
          }
        : {},
      include: {
        model: Diet,
        as: "diets",
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    recipesDB = recipesDB.map((recipe) => modifyDietAttributes(recipe));

    const recipesAll = recipesApi.concat(recipesDB);

    return recipesAll.length ? res.json(recipesAll) : res.json([]);
  } catch (err) {
    return res.status(404).json(err);
  }
};

module.exports = { getRecipeByName };
