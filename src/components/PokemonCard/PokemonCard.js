import React, { useState, useEffect } from "react";

import axios from "axios";

function PokemonCard({ pokemonData }) {
  const [pokemonCardData, setPokemonCardData] = useState([]);

  async function getPokemonInfo(url) {
    try {
      const { data } = await axios.get(url);
      console.log(data);
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
      <img
        src={pokemonCardData.sprites.other.dream_world.front_default}
        alt={pokemonCardData.name}
      />
      {/* <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonCardData.id}.png`}
        alt={pokemonCardData.name}
      /> */}
      <div>{pokemonCardData.name}</div>
    </>
  );
}

export default PokemonCard;
