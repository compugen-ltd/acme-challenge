import { createContext, useState, useContext } from 'react';

import { ListUsersContextProps, ListUsersProviderProps, UsersDataProps, AppStatus, SelectedUser } from '../services/types';

export const ListUsersContext = createContext({} as ListUsersContextProps);

export function ListUsersProvider({ children }: ListUsersProviderProps) {
  // TODO: modify openModal into selectedUser (by id)
  const [usersData, setUsersData] = useState<UsersDataProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>(null);
  const [page, setPage] = useState<number>(0);
  const [status, setStatus] = useState<AppStatus>("loading");

  function setUsers(params: UsersDataProps[]) {
    setUsersData(params);
  };

  function nextPage() {
    setPage((cur) => cur++)
  }

  function prevPage() {
    setPage((cur) => cur > 1 ? cur-- : cur)
  }

  return (
    <ListUsersContext.Provider value={{ usersData, setUsers, selectedUser, setSelectedUser, page, nextPage, prevPage, setPage, status, setStatus }}>
      {children}
    </ListUsersContext.Provider>
  )

};

export const useListUsersContext = () => {
  return useContext(ListUsersContext);
}