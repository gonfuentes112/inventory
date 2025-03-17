const { Router } = require("express");
const pokemonRouter = Router();
const pokemonsController = require("../controller/pokemonsController");

pokemonRouter
  .get("/:id", pokemonsController.getPokemonById)
  .delete(pokemonsController.deletePokemon);

pokemonRouter.get("/type/:id", pokemonsController.getPokemonsByType);
pokemonRouter.get("/trainer/:id", pokemonsController.getPokemonsByTrainer);

pokemonRouter
  .get(pokemonsController.getPokemons)
  .post(pokemonsController.postPokemon)
  .patch(pokemonsController.updatePokemon);

  module.exports = pokemonRouter;