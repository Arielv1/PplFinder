import React from "react";
import Text from "components/Text";
import * as S from "./style";
import UserList from "components/UserList";
import { useContext } from "react";
import FavoriteUsersContext from "context/FavoriteUsersProvider";
import { usePeopleFetch } from "hooks";

const Favorites = () => {
  const { isLoading } = usePeopleFetch();
  const favoriteUsersContext = useContext(FavoriteUsersContext);

  /* render the same way as Home component, pass fav users instead of all users */
  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorite Ppls
          </Text>
        </S.Header>
        <UserList
          users={favoriteUsersContext?.favorites}
          isLoading={isLoading}
        ></UserList>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
