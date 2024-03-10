import { useEffect } from "react";

import { useListUsersContext } from "./context/listUsersContext";
import Routes from "./routes/routes";
import api from "./services/api";
import Header from "./components/Header";
import Search from "./components/Search/Search";
import FilterBar from "./components/FilterBar/FilterBar";
import GenderFilter from "./components/GenderFilter/GenderFilter";
import NationalityFilter from "./components/NationalityFilter/NationalityFilter";
import GlobalStyles from "./styles/global";

export const DEFAULT_USERS_PER_PAGE = 25;

export function App() {
  const {
    setUsers,
    page,
    setPage,
    setStatus,
    genderFilter,
    nationalityFilter,
  } = useListUsersContext();

  // Since the api doesn't support filtering with pagination, I remove the seed when there's filtering applied.
  const seed = genderFilter || nationalityFilter.length ? "" : "compugen";

  useEffect(() => {
    // TODO: add abortcontroller
    setStatus("loading");
    api
      .get(
        `?results=${DEFAULT_USERS_PER_PAGE}&page=${
          page + 1
        }&seed=${seed}&gender=${genderFilter}&nationality=${nationalityFilter.toString()}`
      )
      .then((response) => {
        setUsers((prev) => [...prev, ...response.data.results]);
        setStatus("ready");
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, [page]);

  useEffect(() => {
    setStatus("loading");
    api
      .get(
        `?results=${DEFAULT_USERS_PER_PAGE}&page=${
          page + 1
        }&seed=${seed}&gender=${genderFilter}&nationality=${nationalityFilter.toString()}`
      )
      .then((response) => {
        setUsers(response.data.results);
        setStatus("ready");
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, [genderFilter, nationalityFilter]);

  return (
    <>
      <Header />
      <FilterBar>
        <Search />
        <GenderFilter />
        <NationalityFilter />
      </FilterBar>
      <Routes />
      <GlobalStyles />
    </>
  );
}

export default App;
