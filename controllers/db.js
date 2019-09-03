require("dotenv").config();
const mongoose = require('mongoose');


/* Models - https://mongoosejs.com/docs/guide.html#models */

const Data = require('../models/Data');
const User = require('../models/User');


/* Helper function to check if ID is valid */
const isID = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id))
        res.json({
            status: "error",
            message: 'ID not valid',
            id
        })
}

module.exports = {

    connect: async () => {
        /* Mongose connect - https://mongoosejs.com/docs/connections.html */

        mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true }).then(
            () => {
                console.log(`Ready to go: connected to MongoDB ${process.env.DB_NAME}`)
            },
            err => { //handle initial connection error
                console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
                process.exit(1);
            }
        )
    }
    ,
    seed: async () => {

        const data = await Data.find({})
        if (data.length == 0) {
            console.log(`No item found... seeding db`);
            const newData = new Data();
            const sampleData = JSON.parse(process.env.DATA_SAMPLE_OBJ);
            for (var key in sampleData) {
                newData[key] = sampleData[key]

            }

            newData.save((err) => {
                if (err)
                    console.log(err);
                else
                    console.log("Movie in DB!")
            });
        }


        const users = await User.find({})
        if (users.length == 0) {
            console.log(`No users found, we need to create an admin`);
            User.create({
                email: process.env.DEFAULT_USER,
                password: process.env.DEFAULT_PASS,
                role: 0
            })
        }
        console.log(`Check your ${process.env.DB_NAME} collection on http://localhost:3000${process.env.MAIN_ROUTE}`);
    },
    list: async (req, res) => {
        const data = await Data.find({})
        console.log(data);
        res.status(200).json(data)
    },
    show: async (req, res) => {

        isID(req.params.data_id, res)

        const data = await Data.findById(req.params.data_id)
        if (!data) {
            res.status(500).json({
                status: "error",
                message: `${data} not found`,
            })
        } else {
            console.log(data);
            res.json(data)
        }
    },
    add: async (req, res) => {
        const newData = new Data();
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                //console.log(`${data[key]} =  ${req.body[key]}`)
                newData[key] = req.body[key]
            }
        }
        // save the Data and check for errors
        newData.save((err) => {
            if (err)
                res.json(err);
            else
                res.status(200).json({
                    message: 'New Data created!',
                    data: newData
                });
        });
    },
    update: async (req, res) => {

        isID(req.params.data_id, res)

        const data = await Data.findOne({ "_id": req.params.data_id })
        if (!data) {
            res.status(500).json({
                status: "error",
                message: 'Data not found',
            })
        } else {
            // update the data and check for errors
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    //console.log(`${data[key]} =  ${req.body[key]}`)
                    data[key] = req.body[key]
                }
            }

            data.save((err) => {
                if (err)
                    res.status(500).json(err);

                res.status(200).json({
                    status: "success",
                    message: 'Data updated!',
                    data: data
                });
            });
        }
    },
    delete: async (req, res) => {

        isID(req.params.data_id, res)

        Data.deleteOne({
            _id: req.params.data_id
        }, function (err, data) {
            if (err)
                res.send(err);
            res.status(200).json({
                status: "success",
                message: 'Data deleted',
                data
            });
        })
    }

}
