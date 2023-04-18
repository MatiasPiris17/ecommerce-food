const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db.js");

const getApiData = async () => {
  const {results} = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    )
  ).data;

  const apiInfo = await results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      summary: e.summary,
      healthScore: e.healthScore,
      instructions: e.analyzedInstructions
        .map((e) => e.steps.map((e) => e.step))
        .flat(),
      image: e.image,
      diets: e.diets.map((e) => e + " "),
    };
  });

  return apiInfo;
};

const getDbData = async () => {
  const dbInfo = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return dbInfo;
};

const getAllRecipes = async () => {
  const apiInfo = await getApiData();
  const dbInfo = await getDbData();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

module.exports = {
  getAllRecipes,
};
