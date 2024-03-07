import { ReactNode } from "react";

export type UsersDataProps = {
  name: {
    first: string;
    last: string;
  };
  location: {
    street: string;
    city: string;
    country: string;
  };
  email: string;
  gender: string;
  login: {
    username: string;
    uuid: string;
  };
  dob: {
    date: string;
    age: string;
  };
  phone: string;
  cell: string;
  nat: string;
  picture: {
    large: string;
  };
};

export type ListUsersContextProps = {
  usersData: UsersDataProps[];
  setUsers: (params: UsersDataProps[]) => void;
  selectedUser: SelectedUser;
  setSelectedUser: (param: string) => void;
  page: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (newPage: number) => void;
  status: AppStatus;
  setStatus: (param: AppStatus) => void;
};

export type ListUsersProviderProps = {
  children: ReactNode;
};

export type AppStatus = "loading" | "ready" | "error";

export type SelectedUser = string | null;
