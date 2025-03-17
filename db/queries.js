const pool = require("./pool");

async function getTrainers() {
  const { rows } = await pool.query("SELECT * FROM trainers");
  return rows;
}

async function getTrainerById(id) {
  const { rows } = await pool.query("SELECT * FROM trainers WHERE id=$1", [id]);
  return rows;
}

async function postTrainer(params) {
  const values = [params.name, params.url];
  await pool.query("INSERT INTO trainers (name, url) VALUES($1, $2)", values);
}

async function updateTrainer(params) {
  const values = [params.name, params.url, params.id];
  await pool.query("UPDATE trainers SET name=$1, url=$2 WHERE id=$3", values);
}

async function deleteTrainer(id) {
  await pool.query("DELETE FROM trainers WHERE id=$1", [id]);
}

async function getPokemons() {
  const { rows } = await pool.query("SELECT * FROM pokemons");
  return rows;
}

async function getPokemonById(id) {
  const { rows } = await pool.query("SELECT * FROM pokemons WHERE id=$1", [id]);
  return rows;
}

async function getPokemonsByType(type) {
  const { rows } = await pool.query(
    `
        SELECT *
        FROM pokemons p
        LEFT JOIN types t1 ON p.type_id = t1.id
        LEFT JOIN types t2 ON p.type2_id = t2.id
        WHERE t1.id = $1 OR t2.id = $1`,
    [type]
  );
  return rows;
}

async function getPokemonsByTrainer(trainer_id) {
  const { rows } = await pool.query(
    `
        SELECT *        
        FROM pokemons p
        JOIN pokemonsbytrainers b ON p.id = b.pokemon_id
        JOIN trainers t ON b.trainer_id = t.id
        WHERE t.id = $1`,
    [trainer_id]
  );
  return rows;
}

async function postPokemon(params) {
  const values = [params.name, params.type_id, params.url, params.type2_id];
  await pool.query(
    "INSERT INTO pokemons (name, type_id, url, type2_id) VALUES($1, $2, $3, $4)",
    values
  );
}

async function updatePokemon(params) {
  const values = [
    params.name,
    params.type_id,
    params.url,
    params.type2_id,
    params.id,
  ];
  await pool.query(
    "UPDATE pokemons SET name=$1, type_id=$2, url=$3, type2_id=$4 WHERE id=$5",
    values
  );
}

async function deletePokemon(id) {
  await pool.query("DELETE FROM pokemons WHERE id=$1", [id]);
}

async function getTypes() {
  const { rows } = await pool.query("SELECT * FROM types");
  return rows;
}

async function getTypeById(id) {
  const { rows } = await pool.query("SELECT * FROM types WHERE id=$1", [id]);
  return rows;
}
