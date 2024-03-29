import React, { useState, useEffect } from "react";

import PokemonList from "./../../components/PokemonList/PokemonList";
import Pagination from "./../../components/Pagination/Pagination";
import PokemonSearch from "./../../components/PokemonSearch/PokemonSearch";

import { getPokemon } from "./../../api/getPokemon";
import { getPagination } from "./../../api/getPagination";

function Home() {
  const [pokemon, setPokemon] = useState(["bulbasaur", "charmander"]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [pokemonSearch, setPokemonSearch] = useState(null);

  useEffect(() => {
    setLoading(true);
    setPokemonSearch(null);
    pagination(currentPageUrl);
  }, [currentPageUrl]);

  useEffect(() => {
    setLoading(true);
    setPokemon(null);
    searchPokemon(query);
  }, [query]);

  async function pagination(page) {
    try {
      const data = await getPagination(page);
      setLoading(false);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
      setPokemon(data.results);
    } catch (error) {
      console.log("Error on request");
    }
  }

  async function searchPokemon(pokemonUrl) {
    const data = await getPokemon(pokemonUrl);
    setLoading(false);
    setPokemonSearch(data);
  }

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  function clearSearch() {
    setLoading(true);
    setPokemonSearch(null);
    pagination(currentPageUrl);
  }

  if (loading) return "Loading...";

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
    </>
  );
}

export default Home;
