import { Sequelize } from "sequelize";
import ingredientBuilder from "./ingredient.model.js";
import recetteBuilder from "./recette.model.js";
import platBuilder from "./plat.model.js";
import recetteIngredientBuilder from "./recette-ingredient.model.js";


//! Chargement des variables d'environnement
const { DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

//! Initialisation de l'instance de Sequelize
const sequelize = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT
});

//! Objet « db » qui contient l'instance de sequelize et les infos des Models
export const db = {};
db.sequelize = sequelize;

//! Définition des models
db.Ingredient = ingredientBuilder(sequelize);
db.Recette = recetteBuilder(sequelize);
db.Plat = platBuilder(sequelize);
db.RecetteIngredient = recetteIngredientBuilder(sequelize);

//! Définition des relations
//? [One to Many] Recette - Plat
db.Plat.hasMany(db.Recette, { foreignKey: { allowNull: false } });
db.Recette.belongsTo(db.Plat);

//? [Many to Many] Recette - Ingredient
//?  - Simple: Sans attributs !
/*
db.Recette.belongsToMany(db.Ingredient, { through : 'Recette_Ingredient' });
db.Ingredient.belongsToMany(db.Recette, { through : 'Recette_Ingredient' });
*/
//?  - Via un modele: Permet de customiser la table intermediaire
db.Recette.belongsToMany(db.Ingredient, { through : db.RecetteIngredient });
db.Ingredient.belongsToMany(db.Recette, { through : db.RecetteIngredient });


//! Export par default de l'objet « db »
export default db;