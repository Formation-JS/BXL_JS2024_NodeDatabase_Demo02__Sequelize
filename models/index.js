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
export const db = {
    sequelize
};

//! Définition des models

sequelize.define(
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
)






//! Export par default de l'objet « db »
export default db;