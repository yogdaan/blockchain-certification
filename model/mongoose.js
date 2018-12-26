const mongoose = require("mongoose");
const path = require("path");
const log = require("../utils/log");

require("dotenv").config({ path: path.resolve(process.cwd(), "../" + ".env") });

let dbuser, dbhost, dbpassword, dbname, dbport;

if (process.env.NODE_ENV === "production") {
  dbhost = process.env.DB_PRODUCTION_HOST;
  dbport = process.env.DB_PRODUCTION_PORT;
} else {
  dbhost = process.env.DB_HOST;
  dbport = process.env.DB_PORT;
}

dbuser = process.env.DB_USER;
dbpassword = process.env.DB_PASSWORD;
dbname = process.env.DB_NAME;

const mongoURL = `mongodb://${dbuser}:${dbpassword}@${dbhost}:${dbport}/${dbname}`;

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
