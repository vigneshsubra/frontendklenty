import axios from "axios";
import { useContext, useState } from "react";
import BaseCard from "../components/ui/BaseCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import classes from './Auth.module.css';
import { AuthContext } from "../context/auth-context";
import { useHistory } from "react-router-dom";

const Auth = () => {

  const [isLoginMode, setIsloginMode] = useState(true);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const history = useHistory();

  function switchModeHandler(event) {
    event.preventDefault();
    setIsloginMode(prevMode => !prevMode);
  }

  const headers = {
    'Content-Type': 'application/json',
  }

  const getUser = async () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user",
    }).then((res) => {
      setUser(res.data);
      console.log(res.data);
    });
  }

  const logInHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    await axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:5000/login",
      headers: headers
    }).then((res) => console.log(res))
      .then(getUser())
      .then(setIsLoading(false));

    setIsLoading(false);
    auth.login(user && user.username);
    console.log(user);
    history.push('/');
  }

  const registerHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:5000/register",
      headers: headers
    }).then((res) => console.log(res));
    setIsLoading(false);
    history.push('/auth');
  };

  return (
    <div>
      {isLoginMode ? (
        <BaseCard>
          <h2>Login Page</h2>
          {isLoading && <LoadingSpinner asOverlay />}
          <form className={classes.form}>
            <div className={classes.control}>
              <label htmlFor='userid'>User Id:</label>
              <input type='text' required id='userid' onChange={e => setLoginUsername(e.target.value)}></input>
            </div>
            <div className={classes.control}>
              <label htmlFor='password'>Password:</label>
              <input type='password' required id='password' onChange={e => setLoginPassword(e.target.value)}></input>
            </div>
            <div className={classes.actions}>
              <button onClick={logInHandler}>Login</button>
            </div>
            <h4>Don't have an accout?</h4>
            <div className={classes.actions}>
              <button onClick={switchModeHandler}>SignUp</button>
            </div>
          </form>
        </BaseCard>
      ) : (
        <BaseCard>
          <h2>Signup Page</h2>
          {isLoading && <LoadingSpinner asOverlay />}
          <form className={classes.form}>
            <div className={classes.control}>
              <label htmlFor='userid'>User Id:</label>
              <input type='text' required id='userid' onChange={e => setRegisterUsername(e.target.value)}></input>
            </div>
            <div className={classes.control}>
              <label htmlFor='password'>Password:</label>
              <input type='password' required id='password' onChange={e => setRegisterPassword(e.target.value)}></input>
            </div>
            <div className={classes.actions}>
              <button onClick={registerHandler}>Register</button>
            </div>
            <h4>Already have an accout?</h4>
            <div className={classes.actions}>
              <button onClick={switchModeHandler}>Login</button>
            </div>
          </form>
        </BaseCard>
      )}
    </div>
  );
}

export default Auth;