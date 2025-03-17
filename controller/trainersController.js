const db = require("../db/queries");

async function getTrainers(req, res) {
  const trainers = await db.getTrainers();

  if (!trainers) {
    res.status(404).send("No trainers found");
  }

  res.send(trainers);
}

async function getTrainerById(req, res) {
  const { trainerIdText } = req.params;
  const id = trainerIdText;

  const trainer = await db.getTrainerById({ id });

  if (!trainer) {
    res.status(404).send("Trainer not found");
  }

  res.send(trainer);
}

async function postTrainer(req, res) {
  const { name, url } = req.body;

  await db.postTrainer({ name, url });

  res.redirect("/");
}

async function updateTrainer(req, res) {
  const { name, url, trainerIdText } = req.body;
  const id = Number(trainerIdText);

  const author = await db.updateTrainer({ name, url, id });

  res.redirect("/");
}

async function deleteTrainer(req, res) {
  const { trainerIdText } = req.params;
  const id = Number(trainerIdText);

  const author = await db.deleteTrainer({ id });

  res.redirect("/");
}

module.exports = {
  getTrainers,
  getTrainerById,
  postTrainer,
  updateTrainer,
  deleteTrainer,
};
