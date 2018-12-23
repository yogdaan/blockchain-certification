const mongoose = require("mongoose");
const path = require("path");
const log = require("../utils/log");

require("dotenv").config({ path: path.resolve(process.cwd(), "../" + ".env") });

const mongoURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
  process.env.DB_HOST
}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

mongoose.Promise = global.Promise;

mongoose
  .connect(
    mongoURL,
    { useNewUrlParser: true }
  )
  .catch(err => log.Error(err));

mongoose.connection.on("connected", err => log.Info("MongoDB Connected"));

mongoose.connection.on("error", err => log.Error("error: " + err));

module.exports = { mongoose };
