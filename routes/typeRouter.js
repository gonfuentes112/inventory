const { Router } = require("express");
const typeRouter = Router();
const typesController = require("../controller/typesController");

typeRouter.get("/:id", typesController.getTypesById);
typeRouter.get("/", typesController.getTypes);

module.exports = typeRouter;