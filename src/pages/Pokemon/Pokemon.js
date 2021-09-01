import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

function Pokemon() {
  const pokemonUrl = useLocation().pathname;

  const [pokemonData, setPokemonData] = useState([]);

  function getPokemonInfo(url) {
    let cancel;
    axios
      .get(`https://pokeapi.co/api/v2${url}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPokemonData(res.data);
      });

    return () => cancel();
  }

  useEffect(() => {
    getPokemonInfo(pokemonUrl);
  });

  return (
    <>
      <div>{pokemonData.name}</div>
      <Link to={"/"}>
        <button>Back</button>
      </Link>
    </>
  );
}

export default Pokemon;
