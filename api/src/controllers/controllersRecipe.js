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

//esta función se utiliza para transformar los objetos de receta recuperados de la base de datos en una estructura más fácil de manejar en la interfaz de usuario.
const modifyDietAttributes = (r) => {
  r = r.toJSON();
  r.diets = r.diets.map((diet) => diet.name);
  return r;
};
module.exports = { reduceObjectsRecipes, modifyDietAttributes };
