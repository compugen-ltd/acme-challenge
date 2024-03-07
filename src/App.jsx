import { useEffect } from "react";
import Routes from "./routes/routes";

import { v4 as uuidv4 } from "uuid";

import Header from "./components/Header";
import api from "./services/api";
import { useListUsersContext } from "./context/listUsersContext";
import GlobalStyles from "./styles/global";

export const DEFAULT_USERS_PER_PAGE = 25;
const seed = uuidv4();

export function App() {
  const { setUsers, page, setStatus, selectedUser } = useListUsersContext();

  useEffect(() => {
    // TODO: add abortcontroller
    api
      .get(`?results=${DEFAULT_USERS_PER_PAGE}&page=${page + 1}&seed=${seed}`)
      .then((response) => {
        console.log(response.data.results);
        setUsers(response.data.results);
        setStatus("ready");
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, [page]);

  return (
    <>
      <Header />
      <Routes />
      <GlobalStyles />
    </>
  );
}

export default App;
