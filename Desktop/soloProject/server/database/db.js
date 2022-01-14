/* eslint-disable quotes */
const mongoose = require("mongoose");

const USER = "basiled";
const PWD = "basile0489";
const database = "Codeworks_solo";

const CONNECTION_URI = `mongodb+srv://${USER}:${PWD}@cluster-solo-codeworks.53pf3.mongodb.net/${database}?retryWrites=true&w=majority`;



const mongoDBClient = async () => {
  try {
    await mongoose
      .connect(CONNECTION_URI, {
        useNewURLParser: true,
        useUnifiedTopology: true,
      })
      console.log("connection successful");
  } catch (e) {
    console.log("error" + e);
  }
};

module.exports = mongoDBClient;
