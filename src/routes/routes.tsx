import { Switch, Route, BrowserRouter } from 'react-router-dom';

import UserList from '../components/UserList/UserList';
import UserModal from '../components/UserModal/UserModal'

const Routes = () => {
  return (
    <BrowserRouter>
      {/* UserList needs to be here because of the NavLinks for each User */}
      <UserList />
      <Switch>
        <Route path="/:id" component={UserModal} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;