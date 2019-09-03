require("dotenv").config();
console.log(`---- ${process.env.PROJECT} ----`);

/* Controllers - Mongo database & Express middleware */
const db = require('./controllers/db');
const middleware = require('./controllers/middleware');

db.connect();
db.seed();
middleware.run();


