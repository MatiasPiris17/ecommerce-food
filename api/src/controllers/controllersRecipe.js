const reduceObjectsRecipes = (r) => {
  return {
    id: r.id,
    name: r.title,
    summary: r.summary,
    healthScore: r.healthScore,
    steps: r.analyzedInstructions[0]
      ? r.analyzedInstructions[0].steps.reduce((obj, s) => {
          obj[s.number] = s.step;
          return obj;
        }, {})
      : {},
    createdInDb:false,
    image: r.image,
    diets: r.diets,
  };
};
const modifyDietAttributes = (r) => {
  r = r.toJSON();
  r.diets = r.diets.map((diet) => diet.name);
  return r;
};
module.exports = { reduceObjectsRecipes, modifyDietAttributes };