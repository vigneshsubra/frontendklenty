import { Redirect, Route, Switch } from 'react-router-dom';

import DiscussionListPage from './pages/DiscussionList';
import NewDiscussionPage from './pages/NewDiscussion';
import './App.css';
import Layouts from './components/layouts/Layouts';
import DiscussionPage from './pages/Discussion';
import Auth from './pages/Auth';
import { AuthContext } from './context/auth-context';
import { useCallback, useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null)
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}>
      <Layouts>
        <Switch>
          <Route path='/' exact>
            <DiscussionListPage />
          </Route>
          <Route path='/new-discussion' exact>
            <NewDiscussionPage />
          </Route>
          <Route path='/discussion-page/:id' component={DiscussionPage} />
          <Route path='/auth' exact component={Auth} />
          <Redirect to='/' />
        </Switch>
      </Layouts>
    </AuthContext.Provider>
  );
}

export default App;
