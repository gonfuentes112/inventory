const db = require("../db/queries");

async function getTypes(req, res) {
  const types = await db.getTypes();

  if (!types) {
    res.status(404).send("No Types found");
  }

  res.send(types);
}

async function getTypesById(req, res) {
  const { id } = req.params;

  const types = await db.getTypesById(number(id));

  if (!types) {
    res.status(404).send("Pokemon not found");
  }

  res.send(types);
}

module.exports = {
  getTypes,
  getTypesById,
};
