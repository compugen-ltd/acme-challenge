import { createContext, useState, useContext } from 'react';

import { ListUsersContextProps, ListUsersProviderProps, UsersDataProps, AppStatus, Gender, Nationality } from '../services/types';

export const ListUsersContext = createContext({} as ListUsersContextProps);

export function ListUsersProvider({ children }: ListUsersProviderProps) {
  const [usersData, setUsersData] = useState<UsersDataProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [status, setStatus] = useState<AppStatus>("loading");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<Gender | null>(null);
  const [nationalityFilter, setNationalityFilter] = useState<Nationality[]>([]);

  function setUsers(updateFunction: (prevUsers: UsersDataProps[]) => UsersDataProps[]) {
    setUsersData(updateFunction);
  };

  return (
    <ListUsersContext.Provider value={{ usersData, setUsers, page, setPage, status, setStatus, searchQuery, setSearchQuery, genderFilter, setGenderFilter, nationalityFilter, setNationalityFilter }}>
      {children}
    </ListUsersContext.Provider>
  )

};

export const useListUsersContext = () => {
  return useContext(ListUsersContext);
}