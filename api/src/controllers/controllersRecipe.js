const reduceObjectsRecipes = (r) => {
  return {
    id: r.id,
    name: r.title,
    summary: r.summary,
    healthScore: r.healthScore,
    steps: r.analyzedInstructions
      .map((e) => e.steps.map((steps) => steps.step))
      .flat(),
    createdInDb: false,
    image: r.image,
    diets: r.diets.map((e) => e + ', '),
  };
};
const modifyDietAttributes = (r) => {
  r = r.toJSON();
  r.diets = r.diets.map((diet) => diet.name);
  return r;
};
module.exports = { reduceObjectsRecipes, modifyDietAttributes };
