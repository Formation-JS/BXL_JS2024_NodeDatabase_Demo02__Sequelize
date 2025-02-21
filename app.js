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