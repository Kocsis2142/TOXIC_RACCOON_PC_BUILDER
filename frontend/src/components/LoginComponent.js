import '../sassFiles/out/LoginComponent.css'
import logo from '../images/toxic_logo.png'
import { useEffect } from 'react'
import GoogleButton from 'react-google-button'
import Login from './Login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios'

function LoginComponent({loggedInUserName, setUserInfo}) {

    useEffect(() => {
      checkUserToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

  const checkUserToken = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/userToken', {
          headers: {
            jwt: localStorage.getItem("jwtToken")
          }
        })
        if (!response.data.jwtIsValid) { 
          localStorage.removeItem("jwtToken")
          setUserInfo(null)
        }
      } catch (error) {
        console.error(error)
    }
}

  const googleBtnHandler = () => {
    window.location.href = process.env.REACT_APP_GOOGLE_AUTH_LINK;
  }

    return (
        <div className="login-container">
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
          </Switch>
        </Router>
            {loggedInUserName === null ? <div> 
                {<img width="200px" src={logo} alt="toxic_logo"></img>}
                <GoogleButton onClick={googleBtnHandler}/>
            </div> :
            <div>
                <img width="200px" src={logo} alt="toxic_logo"></img>
                <h1>You are logged in as {loggedInUserName}</h1>
            </div>}
        </div>
    )
}

export default LoginComponent