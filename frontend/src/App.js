import './sassFiles/out/navbarStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools, faHdd, faServer, faSignInAlt, faSignOutAlt, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import getUserFetch from './data_fetch/getUserFetch'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getJSONDataFromServer from './data_fetch/fetch'
import { getDefaultComponentTypeList } from './defaultComponentTypeList/defaultComponentTypeList'
import LoginComponent from './components/LoginComponent'
import PcBuilder from './components/PcBuilder'
import CustomBuildsComponent from './components/CustomBuildsComponent'
import RaccoonBuildsComponent from './components/RaccoonBuildsComponent'
import UserProfileComponent from './components/UserProfileComponent'
import CreateBagPreview from './components/CreateBagPreview'
import DeatiledBagComponent from './components/DetailedBagComponent'

function App() {

  const [ userInfo, setUserInfo ] = useState(localStorage.getItem('jwtToken') !== null ? jwt_decode(localStorage.getItem('jwtToken')) : null)
  const [ serverData, setServerData ] = useState({})
  const [ componentTypesList, setComponentTypesList ] = useState([])
  const [ loggedInUserName, setLoggedInUserName ] = useState(userInfo !== null ? userInfo.name : null)
  const [ loggedInUserPrivilege, setLoggedInPrivilege ] = useState(userInfo !== null ? userInfo.privilege : null)
  const [ loggedInUserEmail, setLoggedInUserEmail ] = useState(userInfo !== null ? userInfo.email : null)
  const [ bagIsVisible, setBagIsVisible ] = useState(false)
  const [ currentBag, setCurrentBag ] = useState(localStorage.bag === undefined ? [] : JSON.parse(localStorage.bag))
    
  useEffect(() => {
    getJSONDataFromServer(setServerData, "COMPONENTS")
    getUserFetch(localStorage.getItem('jwtToken'), setUserInfo, setLoggedInUserName, setLoggedInPrivilege, setLoggedInUserEmail)
  }, [] )

  useEffect(() => {
    if (serverData.CPU_AMD !== undefined) {
        setComponentTypesList(getDefaultComponentTypeList(serverData))
    }
  }, [serverData] )

  useEffect(() => {
    localStorage.setItem("bag", JSON.stringify(currentBag))
  }, [currentBag])

  const logoutHandler = () => {
    localStorage.removeItem("jwtToken")
    setLoggedInUserName(null)
    setLoggedInPrivilege(null)
    setLoggedInUserEmail(null)
    setUserInfo(null)
  }

  const bagVisibilityHandler = () => {
    bagIsVisible ? setBagIsVisible(false) : setBagIsVisible(true)
  }
  
  return (
    <Router>
      <div className="App">
        <div className="main-page-header-container">
          <ul className="header-line-menu">
            <li className="menu-btn"><Link to="/pcbuilder">PC Builder <FontAwesomeIcon className="menu-icon" icon={faTools}/></Link></li>
            <li className="menu-btn"><Link to="/raccoonbuilds">Raccoon Builds <FontAwesomeIcon className="menu-icon" icon={faHdd}/></Link></li>
            <li className="menu-btn"><Link to="/custombuilds">Custom Builds <FontAwesomeIcon className="menu-icon" icon={faServer}/></Link></li>
            {loggedInUserName === null && <li className="menu-btn"><Link to="/login">Login <FontAwesomeIcon className="menu-icon" icon={faSignInAlt}/></Link></li>}
            {loggedInUserName !== null && <li  className="menu-btn" onClick={logoutHandler}>Log out <FontAwesomeIcon className="menu-icon" icon={faSignOutAlt}/></li>}
            {loggedInUserName !== null && <li className="menu-btn"><Link to="/profile">{loggedInUserName}</Link></li>}
            <li className="menu-btn">
              <button className="menu-btn" onClick={bagVisibilityHandler}>Bag <FontAwesomeIcon icon={faShoppingBag}/></button>
            {bagIsVisible && 
              <div className="bag-container">
                <CreateBagPreview currentBag={currentBag} setCurrentBag={setCurrentBag}/>
              </div>}
            </li>
          </ul>
        </div>
    
        <Switch>
          <Route path="/pcbuilder"><PcBuilder componentTypesList={componentTypesList} setComponentTypesList={setComponentTypesList} loggedInUserName={loggedInUserName} loggedInUserPrivilege={loggedInUserPrivilege} loggedInUserEmail={loggedInUserEmail} currentBag={currentBag} setCurrentBag={setCurrentBag}/></Route>
          <Route path="/raccoonbuilds"><RaccoonBuildsComponent loggedInUserName={loggedInUserName} loggedInUserPrivilege={loggedInUserPrivilege} loggedInUserEmail={loggedInUserEmail} componentTypesList={componentTypesList} setComponentTypesList={setComponentTypesList} currentBag={currentBag} setCurrentBag={setCurrentBag}/></Route>
          <Route path="/custombuilds"><CustomBuildsComponent loggedInUserName={loggedInUserName} loggedInUserPrivilege={loggedInUserPrivilege} loggedInUserEmail={loggedInUserEmail} componentTypesList={componentTypesList} setComponentTypesList={setComponentTypesList} currentBag={currentBag} setCurrentBag={setCurrentBag}/></Route>
          <Route path="/login"><LoginComponent loggedInUserName={loggedInUserName} userInfo={userInfo} setUserInfo={setUserInfo}/></Route>
          <Route path="/profile"><UserProfileComponent loggedInUserName={loggedInUserName} loggedInUserEmail={loggedInUserEmail} componentTypesList={componentTypesList} setComponentTypesList={setComponentTypesList} currentBag={currentBag} setCurrentBag={setCurrentBag}/></Route>
          <Route path="/detailedBag"><DeatiledBagComponent currentBag={currentBag} setCurrentBag={setCurrentBag}/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
