import Routes from './routes/routes'
import { ListUsersProvider } from './context/listUsersContext'
import GlobalStyles from './styles/global'
import Header from '../src/components/Header';

export function App() {
  return (
    <ListUsersProvider>
      <Header />
      <Routes />
      <GlobalStyles />
    </ListUsersProvider>
  )
}

export default App;