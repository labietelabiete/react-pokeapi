import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

function Pokemon() {
  const pokemonUrl = useLocation().pathname;

  const [pokemonData, setPokemonData] = useState([]);

  async function getPokemonInfo(url) {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2${url}`);
      setPokemonData(data);
    } catch (error) {
      console.log("Error on request");
    }
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
