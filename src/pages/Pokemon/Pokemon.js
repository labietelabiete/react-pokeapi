import React from "react";

import axios from "axios";

function Pokemon({ pokemonUrl }) {
  function pokemonInfo(url) {
    let cancel;
    axios
      .get(url, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        console.log(res);
      });

    return () => cancel();
  }
  console.log(pokemonUrl);
  pokemonInfo(pokemonUrl);

  return <div>Pokemon</div>;
}

export default Pokemon;
