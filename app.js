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
// - Raw query (En vrai -> On fera jamais ça :o)
const data = await db.sequelize.query('SELECT * FROM "Plat"');
console.log(data);
console.log();

// - Utilisation de l'ORM
console.log('Ajouter des plats');

const p1 = { name: 'Salade' };
await db.Plat.create(p1);

await db.Plat.bulkCreate([
    { name: 'Sushi'},
    { name: 'Frites'},
    { name: 'Pizza'},
    { name: 'Burger'}
]);


console.log('Tous les plats');
const r1 = await db.Plat.findAll();
for(const plat of r1) {
    console.log(plat.dataValues);
}
console.log();

console.log('Tous les plats + Pagination');
const r2 = await db.Plat.findAll({
    limit: 3,
    offset: 3
});
for(const plat of r2) {
    console.log(plat.dataValues);
}
console.log();

