import { STORAGE_KEYS } from "constant";
import { createContext, useState, useEffect } from "react";

const FavoriteUsersContext = createContext({
  favorites: [],
  handleFavoriteUser: () => {},
});

export const FavoritesContextProvider = ({ children }) => {
  const [favoriteUsers, setFavoriteUsers] = useState(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.favoriteUsers));
    return data ? data : [];
  });

  /* update storage on favorite user added or removed */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favoriteUsers, JSON.stringify(favoriteUsers));
  }, [favoriteUsers]);

  const handleUserFavoriteList = (user) => {
    const exists = favoriteUsers.includes(user);
    setFavoriteUsers(
      !exists
        ? [...favoriteUsers, user]
        : favoriteUsers.filter((favUser) => favUser.login.uuid !== user.login.uuid)
    );
  };

  const context = {
    favorites: favoriteUsers,
    handleFavoriteUser: handleUserFavoriteList,
  };

  return (
    <FavoriteUsersContext.Provider value={context}>
      {children}
    </FavoriteUsersContext.Provider>
  );
};

export default FavoriteUsersContext;
