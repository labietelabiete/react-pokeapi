import React from "react";

import PokemonList from "./../../components/PokemonList/PokemonList";
import Pagination from "./../../components/Pagination/Pagination";
import PokemonSearch from "./../../components/PokemonSearch/PokemonSearch";

function Home({
  pokemon,
  pokemonSearch,
  search,
  getSearch,
  updateSearch,
  clearSearch,
  nextPageUrl,
  goToNextPage,
  prevPageUrl,
  goToPrevPage,
}) {
  return (
    <>
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <button className="clear-button" onClick={clearSearch}>
        Clear
      </button>
      {pokemon && (
        <>
          <PokemonList pokemon={pokemon} />
          <Pagination
            goToNextPage={nextPageUrl ? goToNextPage : null}
            goToPrevPage={prevPageUrl ? goToPrevPage : null}
          />
        </>
      )}
      {pokemonSearch && <PokemonSearch pokemonSearch={pokemonSearch} />}
      <div>Home</div>
    </>
  );
}

export default Home;
