import { BrowserRouter } from 'react-router-dom';
import UserList from '../components/UserList';

const Routes = () => {
  return (
    <BrowserRouter>
      <UserList />
    </BrowserRouter>
  );
}

export default Routes;