import React, { useState, useEffect } from "react";

import axios from "axios";

function PokemonCard({ pokemonData }) {
  const [pokemonCardData, setPokemonCardData] = useState([]);

  // async function getPokemon(pokemonUrl) {
  //   let promise = new Promise((resolve, reject) => {
  //     axios
  //       .get(`https://pokeapi.co/api/v2/pokemon/${pokemonUrl}`)
  //       .then(function ({ data }) {
  //         resolve(data);
  //       })
  //       .catch(function (error) {
  //         resolve(error);
  //       });
  //   });
  //   return await promise;
  // }

  async function getPokemonInfo(url) {
    try {
      const { data } = await axios.get(url);
      setPokemonCardData(data);
    } catch (error) {
      console.log("Error on request");
    }
  }

  useEffect(() => {
    getPokemonInfo(pokemonData.url);
  }, []);

  return (
    <>
      {/* <img
        src={pokemonCardData.sprites.other.dream_world.front_default}
        alt={pokemonCardData.name}
      /> */}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonCardData.id}.png`}
        alt={pokemonCardData.name}
      />
      <div>{pokemonCardData.name}</div>
    </>
  );
}

export default PokemonCard;
