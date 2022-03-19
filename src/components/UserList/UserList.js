import React, { useState, useContext } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { COUNTRIES } from "constant";
import FavoriteUsersContext from "context/FavoriteUsersProvider";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [countriesToFilter, setCountriesToFilter] = useState([]);

  const favoriteUsersContext = useContext(FavoriteUsersContext);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleCheckBoxClicked = (countryCode, state) => {
    setCountriesToFilter(
      !state
        ? [...countriesToFilter, countryCode]
        : countriesToFilter.filter((country) => country !== countryCode)
    );
  };

  const handleFavoriteClicked = (user) => {
    favoriteUsersContext.handleFavoriteUser(user);
  };

  return (
    <S.UserList>
      <S.Filters>
        {Object.entries(COUNTRIES).map((country, index) => {
          const countryCode = country[1][0];
          const countryName = country[1][1];
          const state = countriesToFilter.includes(countryCode);
          return (
            <CheckBox
              key={index}
              checked={state}
              value={countryCode}
              label={countryName}
              onChange={() => {
                handleCheckBoxClicked(countryCode, state);
              }}
            />
          );
        })}
      </S.Filters>
      <S.List>
        {(countriesToFilter.length === 0
          ? users
          : users.filter((user) => countriesToFilter.includes(user.nat))
        ).map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                isVisible={
                  index === hoveredUserId || favoriteUsersContext.favorites.includes(user)
                }
                onClick={() => handleFavoriteClicked(user)}
              >
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
