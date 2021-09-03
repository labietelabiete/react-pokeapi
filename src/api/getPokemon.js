import axios from "axios";

async function getPokemon(pokemonUrl) {
  let promise = new Promise((resolve, reject) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonUrl}`)
      .then(function ({ data }) {
        resolve(data);
      })
      .catch(function (error) {
        resolve(error);
      });
  });
  return await promise;
}

export { getPokemon };
