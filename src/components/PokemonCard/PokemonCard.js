import React, { useState, useEffect } from "react";

import { getPokemon } from "./../../api/";

function PokemonCard({ pokemonData }) {
  const [pokemonCardData, setPokemonCardData] = useState([]);

  async function getPokemonInfo(url) {
    const data = await getPokemon(url);
    setPokemonCardData(data);
  }

  useEffect(() => {
    getPokemonInfo(pokemonData.name);
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
