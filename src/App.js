import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/pokemon">
            <Pokemon />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
