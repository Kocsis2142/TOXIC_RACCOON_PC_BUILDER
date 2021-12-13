import '../sassFiles/out/HeaderComp.css';

function HeaderComponent({setLoginIsVisible, setRegisterIsVisible, loggedInUserName, setLoggedInUserName}) {

    const loginHandler = () => {
        setLoginIsVisible(true)
        setRegisterIsVisible(false)   
    }

    const registerHandler = () => {
        setLoginIsVisible(false)
        setRegisterIsVisible(true)
    }

    const logoutHandler = () => {

        fetch(`http://localhost:4000/LOGOUT`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

        setLoggedInUserName(null)
        localStorage.clear()
    }

    return (
        <div className="main-page-header-container">
          <ul className="header-line-menu">
              <li>Home</li>
              <li>PC Builder</li>
              <li>Raccoon Builds</li>
              <li>Custom Builds</li>
              {loggedInUserName === null && <li onClick={loginHandler}>Login</li>}
              {loggedInUserName === null && <li onClick={registerHandler}>Register</li>}
              {loggedInUserName !== null && <li onClick={logoutHandler}>Log out</li>}
              {loggedInUserName !== null && <li>{loggedInUserName}</li>}
          </ul>
        </div>
    )
}

export default HeaderComponent