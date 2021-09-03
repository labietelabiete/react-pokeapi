import React from "react";
import { Link } from "react-router-dom";

import PokemonCard from "../PokemonCard";

function PokemonList({ pokemon }) {
  return (
    <>
      {pokemon.map((pokemonData) => (
        <Link key={pokemonData.name} to={`/pokemon/${pokemonData.name}`}>
          <PokemonCard pokemonData={pokemonData} />
        </Link>
      ))}
    </>
  );
}

export default PokemonList;
