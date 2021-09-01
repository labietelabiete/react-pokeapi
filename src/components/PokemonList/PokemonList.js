import React from "react";
import { Link } from "react-router-dom";

function PokemonList({ pokemon }) {
  return (
    <div>
      {pokemon.map((pokemonName) => (
        <Link to={`/pokemon/${pokemonName.name}`}>
          <div key={pokemonName.name}>{pokemonName.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default PokemonList;
