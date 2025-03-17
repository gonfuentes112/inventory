require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const host = process.env.HOST + ":" + process.env.DBPORT;
const connectionString = `postgres://${process.env.USER}:${process.env.PASSWORD}@${host}/${process.env.DATABASE}`;

const { Client } = require("pg");
const CREATE_TRAINERS = `
    CREATE TABLE IF NOT EXISTS trainers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    url TEXT);
    `;
const CREATE_TYPES = `
    CREATE TABLE IF NOT EXISTS trainers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT
    );
    `;
const CREATE_POKEMONS = `
    CREATE TABLE IF NOT EXISTS pokemons (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    type_id INT NOT NULL,
    url TEXT,
    type2_id INT,
    FOREIGN KEY (type_id) REFERENCES types(id) ON DELETE CASCADE,
    FOREIGN KEY (type2_id) REFERENCES types(id) ON DELETE CASCADE
    );
    `;

const CREATE_POKEMONSBYTRAINERS = `
    CREATE TABLE IF NOT EXISTS pokemonsbytrainers (
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
    pokemon_id INTEGER REFERENCES pokemons(id) ON DELETE CASCADE,
    PRIMARY KEY(trainer_id, pokemon_id)
    );
    `;

const INSERT_TYPES = `
INSERT INTO types (name)
SELECT * FROM unnest($1::text[])
`;

const INSERT_TRAINERS = `
INSERT INTO trainers (name, url)
SELECT * FROM unnest($1::text[], $2::text[])
`;

const INSERT_POKEMONS = `
INSERT INTO pokemons (name, type_id, url, type2_id)
SELECT * FROM unnest($1::text[], $2::int[], $3::text[], $4::int[])
`;

const INSERT_POKEMONSBYTRAINERS = `
INSERT INTO pokemonsbytrainers (trainer_id, pokemon_id)
SELECT * FROM unnest($1::int[], $2::int[])
`;

const TYPES = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
];

const TRAINER_NAMES = [
  ["Brock"],
  ["Misty"],
  ["Surge"],
  ["Erika"],
  ["Koga"],
  ["Sabrina"],
  ["Blaine"],
  ["Giovanni"],
  ["Lorelei"],
  ["Bruno"],
  ["Agatha"],
  ["Lance"],
  ["Blue"],
];
const TRAINER_URLS = [
  ["../public/Brock.png"],
  ["../public/Misty.png"],
  ["../public/Surge.png"],
  ["../public/Erika.png"],
  ["../public/Koga.png"],
  ["../public/Sabrina.png"],
  ["../public/Blaine.png"],
  ["../public/Giovanni.png"],
  ["../public/Lorelei.png"],
  ["../public/Bruno.png"],
  ["../public/Agatha.png"],
  ["../public/Lance.png"],
  ["../public/Blue.png"],
];

const POKEMON_NAMES = [
  ["Aerodactyl"],
  ["Alakazam"],
  ["Arbok"],
  ["Arcanine"],
  ["Blastoise"],
  ["Charizard"],
  ["Cloyster"],
  ["Dewgong"],
  ["Dragonair"],
  ["Dragonite"],
  ["Dugtrio"],
  ["Exeggutor"],
  ["Gengar"],
  ["Geodude"],
  ["Golbat"],
  ["Growlithe"],
  ["Gyarados"],
  ["Haunter"],
  ["Hitmonchan"],
  ["Hitmonlee"],
  ["Jynx"],
  ["Kadabra"],
  ["Koffing"],
  ["Lapras"],
  ["Machamp"],
  ["Mr. Mime"],
  ["Muk"],
  ["Nidoking"],
  ["Nidoqueen"],
  ["Ninetales"],
  ["Onix"],
  ["Pidgeot"],
  ["Pikachu"],
  ["Raichu"],
  ["Rhydon"],
  ["Rhyhorn"],
  ["Slowbro"],
  ["Starmie"],
  ["Staryu"],
  ["Victreebel"],
  ["Vileplume"],
  ["Voltorb"],
  ["Vulpix"],
  ["Weezing"],
];

const POKEMON_TYPES = [
  ["6"],
  ["13"],
  ["4"],
  ["9"],
  ["10"],
  ["9"],
  ["10"],
  ["10"],
  ["15"],
  ["15"],
  ["5"],
  ["11"],
  ["8"],
  ["6"],
  ["4"],
  ["9"],
  ["10"],
  ["8"],
  ["2"],
  ["2"],
  ["14"],
  ["13"],
  ["4"],
  ["10"],
  ["2"],
  ["13"],
  ["4"],
  ["4"],
  ["4"],
  ["9"],
  ["6"],
  ["1"],
  ["12"],
  ["12"],
  ["5"],
  ["5"],
  ["10"],
  ["10"],
  ["10"],
  ["11"],
  ["11"],
  ["12"],
  ["9"],
  ["4"],
];

const POKEMON_URLS = [
  ["../public/aerodactyl.png"],
  ["../public/alakazam.png"],
  ["../public/arbok.png"],
  ["../public/arcanine.png"],
  ["../public/blastoise.png"],
  ["../public/charizard.png"],
  ["../public/cloyster.png"],
  ["../public/dewgong.png"],
  ["../public/dragonair.png"],
  ["../public/dragonite.png"],
  ["../public/dugtrio.png"],
  ["../public/exeggutor.png"],
  ["../public/gengar.png"],
  ["../public/geodude.png"],
  ["../public/golbat.png"],
  ["../public/growlithe.png"],
  ["../public/gyarados.png"],
  ["../public/haunter.png"],
  ["../public/hitmonchan.png"],
  ["../public/hitmonlee.png"],
  ["../public/jynx.png"],
  ["../public/kadabra.png"],
  ["../public/koffing.png"],
  ["../public/lapras.png"],
  ["../public/machamp.png"],
  ["../public/mrmime.png"],
  ["../public/muk.png"],
  ["../public/nidoking.png"],
  ["../public/nidoqueen.png"],
  ["../public/ninetales.png"],
  ["../public/onix.png"],
  ["../public/pidgeot.png"],
  ["../public/pikachu.png"],
  ["../public/raichu.png"],
  ["../public/rhydon.png"],
  ["../public/rhyhorn.png"],
  ["../public/slowbro.png"],
  ["../public/starmie.png"],
  ["../public/staryu.png"],
  ["../public/victreebel.png"],
  ["../public/vileplume.png"],
  ["../public/voltorb.png"],
  ["../public/vulpix.png"],
  ["../public/weezing.png"],
];

const TYPE2 = [
  ["3"],
  [null],
  [null],
  [null],
  [null],
  ["3"],
  ["14"],
  ["14"],
  [null],
  ["3"],
  [null],
  ["13"],
  ["4"],
  ["5"],
  ["3"],
  [null],
  ["3"],
  ["4"],
  [null],
  [null],
  ["13"],
  [null],
  [null],
  ["14"],
  ["2"],
  [null],
  [null],
  ["5"],
  ["5"],
  [null],
  ["5"],
  ["3"],
  [null],
  [null],
  ["6"],
  ["6"],
  ["13"],
  ["13"],
  [null],
  ["4"],
  ["4"],
  [null],
  [null],
  [null],
];

const TRAINERIDS = [
    [1], [1], 
    [2], [2], 
    [3], [3], [3], 
    [4], [4],
    [5], [5], [5], 
    [6], [6], [6], 
    [7], [7], 
    [8], [8], [8], [8], [8], 
    [9], [9], [9], [9], [9], 
    [10], [10], [10], [10],
    [11], [11], [11], [11], 
    [12], [12], [12], [12], 
    [13], [13], [13], [13], [13], [13], [13], [13]
  ];

const POKEMONIDS = [
    [14], //geodude
    [31], //onix
    [39], //staryu
    [38], //starmie
    [42], //voltorb
    [33], //pikachu
    [34], //raichu
    [40], //victreebel
    [41], //vileplume
    [23], //koffing
    [44], //weezing
    [27], //muk
    [22], //kadabra
    [26], //mrmime
    [2], //alakazam
    [16], //growlithe
    [4], //arcanine
    [35], //rhydon
    [36], //rhyhorn
    [11], //dugtrio
    [28], //nidoking
    [29], //nidoqueen
    [8], //dewgong
    [7], //cloyster
    [37], //slowbro
    [21], //jynx
    [24], //lapras
    [31], //onix
    [19], //hitmonchan
    [20], //hitmonlee
    [25], //machamp
    [18], //haunter
    [13], //gengar
    [3], //arbok
    [15], //golbat
    [9], //dragonair
    [10], //dragonite
    [17], //gyarados   
    [1], //aerodactyl
    [4], //arcanine
    [35], //rhydon
    [2], //alakazam
    [32], //pidgeot
    [12], //exeggutor
    [5], //blastoise
    [17], //gyarados
    [6], //venusaur
]

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
    // ssl: {
    //   rejectUnauthorized: false, // Set this to false if you're using a self-signed certificate
    // },
  });
  await client.connect();

  //   await client.query(CREATE_TYPES);
  //   await client.query(INSERT_TYPES, [TYPES]);
  //   await client.query(CREATE_TRAINERS);
  //   await client.query(INSERT_TRAINERS, [TRAINER_NAMES, TRAINER_URLS]);

//   await client.query(CREATE_POKEMONS);
//   await client.query(INSERT_POKEMONS, [
//     POKEMON_NAMES,
//     POKEMON_TYPES,
//     POKEMON_URLS,
//     TYPE2,
//   ]);

await client.query(CREATE_POKEMONSBYTRAINERS);
// await client.query(INSERT_POKEMONSBYTRAINERS, [TRAINERIDS, POKEMONIDS]);

  await client.end();
  console.log("done");
}

main();
