import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList/PokemonList';
import Pagination from './components/Pagination/Pagination';
import axios from 'axios';



function App() {
  const [pokemon, setPokemon] = useState(["bulbasaur", "charmander"]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [pokemonSearch, setPokemonSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPageUrl]);

  useEffect(() => {
    setLoading(true);
    let cancel
    console.log(query);

    axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      // setNextPageUrl(null);
      // setPrevPageUrl(null);
      console.log(res.data);
      setPokemonSearch(res.data)
    })
    return () => cancel()
  }, [query]);

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


  if (loading) return "Loading..."

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit"><i className="fas fa-search"></i></button>
      </form>

    </>
  );
}

export default App;
