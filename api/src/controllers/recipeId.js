const { getAllRecipes } = require('./data');

const recipeId = async (req, res) => {
  const { id } = req.params;
  const allRecipes = await getAllRecipes();
  try {
    if (id) {
      const recipeId = allRecipes.find((e) => e.id === Number(id));
  
      recipeId
        ? res.status(200).send(recipeId)
        : res.status(404).send('Recipe not found');
    }
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

module.exports = { recipeId };