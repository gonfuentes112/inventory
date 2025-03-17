const db = require("../db/queries");

async function getPokemons(req, res) {
  const pokemons = await db.getPokemons();

  if (!pokemons) {
    res.status(404).send("No Pokemons found");
  }

  res.send(pokemons);
}

async function getPokemonById(req, res) {
  const { id } = req.params;

  const pokemon = await db.getPokemonById(number(id));

  if (!pokemon) {
    res.status(404).send("Pokemon not found");
  }

  res.send(pokemon);
}

async function getPokemonsByType(req, res) {
  const { id } = req.params;

  const pokemons = await db.getPokemonsByType(Number(id));

  if (!pokemons) {
    res.status(404).send("No Pokemons found for that Type");
  }

  res.send(pokemons);
}

async function getPokemonsByTrainer(req, res) {
  const { id } = req.params;

  const pokemons = await db.getPokemonsByTrainer(Number(id));

  if (!pokemons) {
    res.status(404).send("No Pokemon found for that trainer");
  }

  res.send(pokemons);
}

async function postPokemon(req, res) {
  const { name, type_id, url, type2_id } = req.body;
  const numberTypeId = Number(type_id);
  const numberType2Id = type2_id != null ? Number(type2_id) : type2_id;

  await db.postPokemon({
    name,
    type_id: numberTypeId,
    url,
    type2_id: numberType2Id,
  });

  res.redirect("/");
}

async function updatePokemon(req, res) {
  const { name, type_id, url, type2_id, id } = req.body;
  const numberTypeId = Number(type_id);
  const numberType2Id = type2_id != null ? Number(type2_id) : type2_id;
  const numberId = Number(id);

  const author = await db.updatePokemon({
    name,
    type_id: numberTypeId,
    url,
    type2_id: numberType2Id,
    id: numberId,
  });

  res.redirect("/");
}

async function deletePokemon(req, res) {
  const { id } = req.params;

  await db.deletePokemon(Number(id));

  res.redirect("/");
}

module.exports = {
  getPokemons,
  getPokemonById,
  getPokemonsByType,
  getPokemonsByTrainer,
  postPokemon,
  updatePokemon,
  deletePokemon,
};
