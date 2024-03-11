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
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

export const DEFAULT_USERS_PER_PAGE = 25;

export function App() {
  const { setUsers, page, setStatus, genderFilter, nationalityFilter } =
    useListUsersContext();

  // Since the api doesn't support filtering with pagination, I remove the seed when there's filtering applied.
  const seed = genderFilter || nationalityFilter.length ? "" : "compugen";

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setStatus("loading");
      try {
        const response = await api.get(
          `?results=${DEFAULT_USERS_PER_PAGE}&page=${
            page + 1
          }&seed=${seed}&gender=${genderFilter}&nationality=${nationalityFilter.toString()}`,
          { signal }
        );
        if (page === 0) {
          setUsers(response.data.results);
        } else {
          setUsers((prev) => [...prev, ...response.data.results]);
        }
        setStatus("ready");
      } catch (error) {
        console.error(error);
        if (error.message !== "canceled") {
          setStatus("error");
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup function to abort the request
      abortController.abort();
    };
  }, [page, genderFilter, nationalityFilter]);

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
      <ScrollToTopButton />
    </>
  );
}

export default App;
