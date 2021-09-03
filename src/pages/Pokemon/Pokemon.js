import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

function Pokemon() {
  const pokemonUrl = useLocation().pathname;

  const [pokemonData, setPokemonData] = useState([]);

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

  async function getPokemonInfo(url) {
    try {
      let pokemonUrl = url.split("/");
      const data = await getPokemon(pokemonUrl[pokemonUrl.length - 1]);
      setPokemonData(data);
    } catch (error) {
      console.log("Error on request");
    }
  }

  useEffect(() => {
    getPokemonInfo(pokemonUrl);
  }, []);

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
