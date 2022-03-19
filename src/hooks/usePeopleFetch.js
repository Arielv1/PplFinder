import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usersPageNum, setUsersPageNum] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [usersPageNum]);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(
      `https://randomuser.me/api/?results=25&page=` + usersPageNum
    );
    setIsLoading(false);
    setUsers(users.concat(response.data.results));
  }

  const incrementPageNumber = () => {
    console.log("incrementing");
    setUsersPageNum(usersPageNum + 1);
  };

  return { users, isLoading, fetchUsers, incrementPageNumber };
};
