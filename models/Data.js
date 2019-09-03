const mongoose = require("mongoose");
require("dotenv").config();

/* Schema - https://mongoosejs.com/docs/guide.html#definition */
const dataSchema = new mongoose.Schema(
  JSON.parse(process.env.DATA_SCHEMA),
  {
    strict: "throw", timestamps: true
  }
);

/* Increment Versioning */

// https://stackoverflow.com/questions/35288488/easy-way-to-increment-mongoose-document-versions-for-any-update-queries

dataSchema.pre('save', function (next) {
  this.increment();
  return next();
});

dataSchema.pre('update', function (next) {
  this.update({}, { $inc: { __v: 1 } }, next);
});

const dataModel = mongoose.model(process.env.DATA_OBJ, dataSchema);
module.exports = dataModel;
