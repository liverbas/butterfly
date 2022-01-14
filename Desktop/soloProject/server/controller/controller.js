/* eslint-disable quotes */
const DBModels = require("../database/model");

function postWelcome(req, res) {
  res.send("welcome, " + req.body.username);
}

async function getAssociation(req, res) {
  const asso = await DBModels.Association.find({});
  try {
    res.status(200).send(asso);
  } catch (e) {
    res.status(500).send(e)
  }
}

module.exports = { postWelcome, getAssociation };
