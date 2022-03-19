import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Favorites, Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { FavoritesContextProvider } from "context/FavoriteUsersProvider";

const AppRouter = () => {
  return (
    <ThemeProvider>
      <FavoritesContextProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Favorites" component={Favorites} />
          </Switch>
        </Router>
      </FavoritesContextProvider>
    </ThemeProvider>
  );
};

export default AppRouter;
