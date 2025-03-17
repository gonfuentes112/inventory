require("dotenv").config();
const express = require("express");
const typeRouter = require("./routes/typeRouter");
const trainerRouter = require("./routes/trainerRouter");
const pokemonRouter = require("./routes/pokemonRouter");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/types", typeRouter);
app.use("/trainers", trainerRouter);
app.use("/pokemons", pokemonRouter);

app.get("/", async (req, res) => {
  res.send("home");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`listening on http://localhost:${PORT}`));
