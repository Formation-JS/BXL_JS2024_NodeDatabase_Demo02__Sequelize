import { DataTypes, Sequelize } from "sequelize";


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
db.Ingredient = sequelize.define(
    // Nom du Model
    'ingredient',
    // Attributs
    {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: 'UK_Ingredient__Name'
        },
        allergen: DataTypes.BOOLEAN
    },
    // Options
    {
        tableName: "Ingredient",
        timestamps: false
    }
);

db.Recette = sequelize.define(
    // Nom du model
    'recette',
    // Les attributs
    {
        id: {
            // Rappel, la clef primaire est "auto-généré" si elle n'est pas défini dans le model
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true
        }
    },
    // Les options
    {
        tableName: 'Recette',
        updatedAt: false,
        indexes: [
            {
                name: 'IDX_Recette__Name',
                fields: ['name'],
                unique: false
            }
        ]
    }
);

db.Plat = sequelize.define(
    'plat',
    {
        name: {
            type: DataTypes.STRING(50),
            unique: 'UK_Plat__Name',
            allowNull: false
        }
    },
    {
        tableName: 'Plat',
        timestamps: false
    }
);

db.RecetteIngredient = sequelize.define(
    'Recette_Ingredient',
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#per-attribute-validations
                isPositive(value) {
                    if(value <= 0) throw new Error('Negative quantity is not allow !');
                } 
            }
        },
        unite: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        tableName: 'Recette_Ingredient',
        timestamps: false
    }
);

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