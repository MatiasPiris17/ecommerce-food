const axios = require("axios");
const { Diet } = require("../db.js");
const { API_KEY } = process.env;

const getDiets = async (req, res) => {
  try {
    const dietsApi = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      )
    ).data;
    const diets = await dietsApi.results.map((e) => e.diets).flat(Infinity);

    const dietsUnique = [...new Set(diets)];
    dietsUnique?.forEach((e) => {
      Diet.findOrCreate({
        where: {
          name: e,
        },
      });
    });
    const dietsDb = await Diet.findAll();

    res.send(dietsDb);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getDiets };
