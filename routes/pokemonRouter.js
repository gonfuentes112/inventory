const { Router } = require("express");
const pokemonRouter = Router();
const pokemonsController = require("../controller/pokemonsController");

pokemonRouter
  .route("/:id")
  .get(pokemonsController.getPokemonById)
  .delete(pokemonsController.deletePokemon);

pokemonRouter.get("/type/:id", pokemonsController.getPokemonsByType);
pokemonRouter.get("/trainer/:id", pokemonsController.getPokemonsByTrainer);

pokemonRouter
  .route("/")
  .get(pokemonsController.getPokemons)
  .post(pokemonsController.postPokemon)
  .patch(pokemonsController.updatePokemon);

module.exports = pokemonRouter;
