import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";

import axios from "axios";

function App() {
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
    console.log("Entro en paginacion");
    setLoading(true);
    setPokemonSearch(null);
    pagination(currentPageUrl);
  }, [currentPageUrl]);

  useEffect(() => {
    console.log("Entro en busqueda");
    setLoading(true);
    setPokemon(null);
    searchPokemon(`https://pokeapi.co/api/v2/pokemon/${query}`);
  }, [query]);

  function pagination(page) {
    let cancel;
    axios
      .get(page, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p));
      });

    return () => cancel();
  }

  function searchPokemon(pokemonUrl) {
    let cancel;
    axios
      .get(pokemonUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setPokemonSearch(res.data);
      });
    return () => cancel();
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
      <BrowserRouter>
        <Switch>
          <Route path="/pokemon">
            <Pokemon />
          </Route>
          <Route path="/">
            <Home
              pokemon={pokemon}
              pokemonSearch={pokemonSearch}
              search={search}
              getSearch={getSearch}
              updateSearch={updateSearch}
              clearSearch={clearSearch}
              nextPageUrl={nextPageUrl}
              goToNextPage={goToNextPage}
              prevPageUrl={prevPageUrl}
              goToPrevPage={goToPrevPage}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
