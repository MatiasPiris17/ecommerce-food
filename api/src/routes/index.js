const { Router } = require("express");
const recipes = require('./recipes.js');
const diets = require('./diets.js'); 
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipes);
router.use('/diets', diets);




module.exports = router;
