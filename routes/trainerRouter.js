const { Router } = require("express");
const trainersRouter = Router();
const trainersController = require("../controller/trainersController");

trainersRouter.get("/:id", trainersController.getTrainerById);
trainersRouter.route("/")
  .get(trainersController.getTrainers)
  .post(trainersController.postTrainer)
  .patch(trainersController.updateTrainer)
  .delete(trainersController.deleteTrainer);

module.exports = trainersRouter;
