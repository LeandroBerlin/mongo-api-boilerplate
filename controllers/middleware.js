require("dotenv").config();

const express = require('express');
const db = require('./db');
const auth = require('./auth');


exports.run = async () => {
    const app = express()
    // parse application/json, basically parse incoming Request Object as a JSON Object 
    app.use(express.json());
    // parse incoming Request Object if object, with nested objects, or generally any type.
    app.use(express.urlencoded({ extended: true }));

    app.get(process.env.MAIN_ROUTE, db.list)

    app.post('/login', auth.login)
    app.get('/protected', auth.verify, async (req, res) => {
        /* if token is valid */
        res.status(200).json({
            auth: true,
            status: "success",
            message: 'token verified',
            user_id: req.userId,
            decoded: req.decoded
        })
    })

    /* CRUD */
    app.route(`/${process.env.DATA_ROUTE}/:data_id?`)
        .get(db.show)
        .post(db.add)
        .put(db.update)
        .delete(db.delete);

    app.listen(process.env.ENDPOINT_PORT)
}