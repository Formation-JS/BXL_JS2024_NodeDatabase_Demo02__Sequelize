import db from "./models/index.js";


console.log('Demo - Sequelize');
try {
    await db.sequelize.authenticate();

    console.log('Connection DB - Success !');
}
catch (err) {
    console.log('Connection DB - Fail !');
    console.error(err);

    process.exit();
}

if(process.env.NODE_ENV === 'dev') {
    //? Méthode d'initialisation de la database (basic)
    // await db.sequelize.sync();

    //? Méthode d'initialisation et modifier de la database
    //? - Toutes les modifications sont autorisées
    // await db.sequelize.sync({
    //     alter: true
    // });
    //? - Les modifications d'ajout sont autorisées
    // await db.sequelize.sync({
    //     alter: { drop: false }
    // });

    //? Méthode pour forcé le re-création complete (Dernier recours - Uniquement en DEV !!!)
    // await db.sequelize.sync({
    //     force: true
    // })
}

// Utilisation de la DB via Sequelize
// - Raw query
const data = await db.sequelize.query('SELECT * FROM "Plat"');
console.log(data);
console.log();

