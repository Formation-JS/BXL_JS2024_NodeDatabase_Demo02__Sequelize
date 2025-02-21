import { Sequelize } from "sequelize";

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













//! Export par default de l'objet « db »
export default db;