import { Link, useHistory, } from "react-router-dom";

import classes from './HeaderBar.module.css';
import { AuthContext } from '../../context/auth-context';
import { useContext } from "react";

function HeaderBar() {
  const history = useHistory();

  const auth = useContext(AuthContext);

  function newDiscussionHandler() {
    history.push('/new-discussion')
  }

  function logInHandler() {
    history.push('/auth')
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Discussion Forum</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Discussion List</Link>
          </li>
          {auth.isLoggedIn && <li className={classes.actions}>
            <button onClick={newDiscussionHandler}>New Discussion</button>
          </li>}
          {!auth.isLoggedIn && (
            <li className={classes.actions}>
              <button onClick={logInHandler}>Log in</button>
            </li>
          )}
          {auth.isLoggedIn && (
            <li className={classes.actions}>
              <button onClick={auth.logout}>Log out</button>
            </li>
          )}

        </ul>
      </nav>
    </header>
  )
}

export default HeaderBar;