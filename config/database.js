// mongo db connection
const mongoose = require("mongoose");
async function connect() {
  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(process.env.MONGO_DB_URI);
  if (db) {
    console.log("🥳 Databse created successfully");
  } else {
    console.log("😕 Unable to create database");
  }
  return db;
}
module.exports = {connect};
