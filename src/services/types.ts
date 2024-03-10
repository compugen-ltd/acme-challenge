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
  setUsers: (
    updateFunction: (prevUsers: UsersDataProps[]) => UsersDataProps[]
  ) => void;
  page: number;
  setPage: (updateFunction: (prevPage: number) => number) => void;
  status: AppStatus;
  setStatus: (param: AppStatus) => void;
  searchQuery: string;
  setSearchQuery: (param: string) => void;
  genderFilter: Gender | null;
  setGenderFilter: (param: Gender | null) => void;
  nationalityFilter: Nationality[];
  setNationalityFilter: (param: Nationality[]) => void;
};

export type ListUsersProviderProps = {
  children: ReactNode;
};

export type AppStatus = "loading" | "ready" | "error";

export type Gender = "male" | "female";

export type Nationality =
  | "AU"
  | "BR"
  | "CA"
  | "CH"
  | "DE"
  | "DK"
  | "ES"
  | "FI"
  | "FR"
  | "GB"
  | "IE"
  | "IN"
  | "IR"
  | "MX"
  | "NL"
  | "NO"
  | "NZ"
  | "RS"
  | "TR"
  | "UA"
  | "US";
