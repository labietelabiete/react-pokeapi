import React, { useState, useEffect } from "react";

import axios from "axios";

function PokemonCard({ pokemonData }) {
  const [pokemonCardData, setPokemonCardData] = useState([]);
  // const [pokemonImg, setPokemonImg] = useState("");

  async function getPokemonInfo(url) {
    let cancel;
    await axios
      .get(url, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        // console.log(res.data);
        setPokemonCardData(res.data);
      });

    return () => cancel();
  }

  useEffect(() => {
    getPokemonInfo(pokemonData.url);
  });

  // const pokemonImg = pokemonCardData.sprites.other.dream_world.front_default;

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