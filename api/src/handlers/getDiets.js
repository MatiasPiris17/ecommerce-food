const { Diet } = require(`../db.js`);
const axios = require('axios')
const { API_KEY } = process.env;

module.exports = async (req, res) => {
  try {
    const dietsApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data
    
    const diets = await dietsApi.results
    .map((e)=> e.diets).flat(Infinity)
    const dietsUnique = [...new Set(diets)]
    dietsUnique?.forEach((diet)=> {
      Diet.findOrCreate({
        where:{
          name:diet
        }
      })
    })
    const dietsSave = await Diet.findAll()

    res.send(dietsSave)
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
