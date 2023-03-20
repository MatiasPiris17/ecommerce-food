const { Recipe, Diet } = require(`../db.js`);
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { name, image, summary, healthScore, steps, diets } = req.body;
  try {

    if (!name || !summary)
      return res.status(404).send("Creacion Cancelada. Falto Informacion");

    if (!diets || !diets.filter(Boolean).length)
      return res
        .status(404)
        .send("Creacion Cancelada. Se debe proporcionar al menos una dieta.");

    const newRecipe = await Recipe.create({
      name: name.toLowerCase(),
      [/^.+.*\.(jpg|JPG|bmp|BMP|gif|GIF|tif|TIF|png|PNG)$/.test(image)
        ? "image"
        : null]: image,
      summary,
      healthScore,
      steps,
    });

    const dietsToAdd = await Diet.findAll({
      where: {
        name: {
          [Op.in]: diets.filter(Boolean),
        },
      },
    });
    await newRecipe.addDiets(dietsToAdd);
    return res.status(200).send(newRecipe);
  } catch (error) {
    console.log(error)
    return res.status(404).send({error:error.menssage});
  }
};
