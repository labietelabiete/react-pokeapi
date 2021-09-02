import React from "react";
import { Link } from "react-router-dom";

import PokemonCard from "../PokemonCard";

function PokemonList({ pokemon }) {
  return (
    <div>
      {pokemon.map((pokemonData) => (
        <Link to={`/pokemon/${pokemonData.name}`}>
          <PokemonCard key={pokemonData.name} pokemonData={pokemonData} />
        </Link>
      ))}
    </div>
  );
}

export default PokemonList;
