import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList/PokemonList';
import Pagination from './components/Pagination/Pagination';
import PokemonSearch from './components/PokemonSearch/PokemonSearch';
import axios from 'axios';



function App() {
  const [pokemon, setPokemon] = useState(["bulbasaur", "charmander"]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [pokemonSearch, setPokemonSearch] = useState(null);

  useEffect(() => {
    setLoading(true);
    setPokemonSearch(null);
    pagination(currentPageUrl);
  }, [currentPageUrl]);

  useEffect(() => {
    setLoading(true);
    setPokemon(null);
    searchPokemon(`https://pokeapi.co/api/v2/pokemon/${query}`)
  }, [query]);

  function pagination(page) {
    let cancel
    axios.get(page, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }

  function searchPokemon(pokemonUrl) {
    let cancel
    axios.get(pokemonUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      setPokemonSearch(res.data)
    })
    return () => cancel()
  }

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  function clearSearch() {
    setLoading(true);
    setPokemonSearch(null);
    pagination(currentPageUrl);

    // setCurrentPageUrl(currentPageUrl);
  }


  if (loading) return "Loading..."

  return (
    <>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit"><i className="fas fa-search"></i></button>
      </form>
      <button className="clear-button" onClick={clearSearch}>Clear</button>
      {pokemon &&
        <>
          <PokemonList pokemon={pokemon} />
          <Pagination
            goToNextPage={nextPageUrl ? goToNextPage : null}
            goToPrevPage={prevPageUrl ? goToPrevPage : null}
          />
        </>
      }
      {pokemonSearch && <PokemonSearch pokemonSearch={pokemonSearch} />}
    </>
  );
}

export default App;
