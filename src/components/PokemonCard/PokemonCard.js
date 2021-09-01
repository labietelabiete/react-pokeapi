import React, { useState, useEffect } from "react";

import axios from "axios";

function PokemonCard({ pokemonData }) {
  const [pokemonCardData, setPokemonCardData] = useState([]);

  function getPokemonInfo(url) {
    let cancel;
    axios
      .get(url, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPokemonCardData(res.data);
      });

    return () => cancel();
  }

  useEffect(() => {
    getPokemonInfo(pokemonData.url);
  });

  return <div>{pokemonCardData.name}</div>;
}

export default PokemonCard;
