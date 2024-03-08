import { createContext, useState, useContext } from 'react';

import { ListUsersContextProps, ListUsersProviderProps, UsersDataProps, AppStatus, SelectedUser, Sex } from '../services/types';

export const ListUsersContext = createContext({} as ListUsersContextProps);

export function ListUsersProvider({ children }: ListUsersProviderProps) {
  // TODO: remove selectedUser?
  const [usersData, setUsersData] = useState<UsersDataProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>(null);
  const [page, setPage] = useState<number>(0);
  const [status, setStatus] = useState<AppStatus>("loading");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sexFilter, setSexFilter] = useState<Sex[]>([]);

  function setUsers(params: UsersDataProps[]) {
    setUsersData(params);
  };

  return (
    <ListUsersContext.Provider value={{ usersData, setUsers, selectedUser, setSelectedUser, page, setPage, status, setStatus, searchQuery, setSearchQuery, sexFilter, setSexFilter }}>
      {children}
    </ListUsersContext.Provider>
  )

};

export const useListUsersContext = () => {
  return useContext(ListUsersContext);
}