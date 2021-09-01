import React from "react";
import { Link } from "react-router-dom";

function PokemonSearch({ pokemonSearch }) {
  return (
    <Link to={`/pokemon/${pokemonSearch.name}`}>
      <div>{pokemonSearch.name}</div>
    </Link>
  );
}

export default PokemonSearch;
