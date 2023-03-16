const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      summary: {
        //Resumen del plato.
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthScore: {
        //Nivel de comida saludable
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
      },
      steps: {
        //Paso a paso
        //type: DataTypes.ARRAY(DataTypes.TEXT),
        type: DataTypes.JSON,
        defaultValue: {},
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "https://i.postimg.cc/t4F6nM5b/324.png",
        validate: { isUrl: true },
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
