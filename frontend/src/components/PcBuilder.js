import '../sassFiles/out/App.css';
import { useState, useEffect } from 'react'
import CreateComponentRow from './CreateComponentRow'
import getTotalPrice from '../getFunctions/getTotalPrice'
import addExtraComponent from '../addExtraPcPart/addExtraComponent'
import defaultImage from '../images/default_pic.jpeg'
import SearchResultComponent from './SearchResultComponent'
import { errorCheckers } from '../errorCheckMessages/errorMessagesHandlers'
import { gameList } from '../gameList/gameList'
import CreateGamePerformanceCard from './CreateGamePercormanceCard'
import getSelectedComponents from '../getFunctions/getSelectedComponentOnly'
import saveBuild from '../data_fetch/saveBuildPostFetch'
import getObjectFromCurrentBuild from '../getFunctions/getObjectFromCurrentBuild'
import checkEveryComponentIsSelected from '../checkComponentList/checkEveryComponentIsSelected'
import checkThereIsNoError from '../checkComponentList/checkThereIsNoError'
import toxicLogo from '../images/toxic_logo.png'

function PcBuilder({componentTypesList, setComponentTypesList, loggedInUserName, loggedInUserPrivilege, currentBag, setCurrentBag, loggedInUserEmail}) {

    const [ totalPrice, setTotalPrice ] = useState("0 Ft")
    const [ searchInput, setSerachInput ] = useState("")
    const [ saveBuildFormIsVisible, setSaveBuildFormIsVisible ] = useState(false)
    const [ searchComponentVisibility, setSearchComponentVisibility ] = useState(false)
    const [ buildName, setBuildName ] = useState("Custom Build")
    const [ msgToUser, setMsgToUser ] = useState("")

    useEffect(() => {
        getTotalPrice(componentTypesList, setTotalPrice)
        if (checkEveryComponentIsSelected(componentTypesList) && checkThereIsNoError(componentTypesList)) setMsgToUser("")
      }, [componentTypesList])

    const saveBuildFormHandler = () => {
        saveBuildFormIsVisible ? setSaveBuildFormIsVisible(false) : setSaveBuildFormIsVisible(true)
    }

    const searchComponentVisibilityHandler = () => {
        searchComponentVisibility ? setSearchComponentVisibility(false) : setSearchComponentVisibility(true)
    }

    const buildSaveHandler = () => {
        if (checkEveryComponentIsSelected(componentTypesList)) {
          if (checkThereIsNoError(componentTypesList)) {
            buildName === "" ? 
            saveBuild("Custom Build", loggedInUserName, loggedInUserPrivilege, totalPrice, getSelectedComponents(componentTypesList), loggedInUserEmail) :
            saveBuild(buildName, loggedInUserName, loggedInUserPrivilege, totalPrice, getSelectedComponents(componentTypesList), loggedInUserEmail)
            setMsgToUser("Your build is successfully saved! You can check it in Custom Builds or in your profile.")
            setSaveBuildFormIsVisible(false)
          } else {
            setMsgToUser("Cannot save your build if it's error(s) in it!")
          }
        } else {
          setMsgToUser("Please select every component before save!")
        }
      }
      
      const addToBagHandler = () => {
        if (checkEveryComponentIsSelected(componentTypesList)) {
          if (checkThereIsNoError(componentTypesList)) {
            setCurrentBag([...currentBag, getObjectFromCurrentBuild(totalPrice, componentTypesList)])
          } else {
            setMsgToUser("Cannot add your build to the bag if it's error(s) in it!")
          }
        } else {
          setMsgToUser("Select every component before add your build to the bag!")
        }
      }

    return (
      <div className="component">
        <img className="toxic-front-logo" src={toxicLogo} alt="toxic-logo"/>
        {searchComponentVisibility &&
          <div className="search-component">
            <input placeholder="Search" onChange={(event) => setSerachInput(event.target.value)}/>
            <button className="search-close-btn" onClick={searchComponentVisibilityHandler}>✖</button>
            <div className="search-result-card-container">
              <SearchResultComponent searchInput={searchInput} componentTypesList={componentTypesList} setComponentTypesList={setComponentTypesList}/>
            </div>
          </div>}
        <div className="builder-head-container">
          <div>
            <h1>Total price: {totalPrice} Ft</h1>
            <button onClick={saveBuildFormHandler} className="hover-btn">Save This Build</button>
            <button onClick={addToBagHandler} className="hover-btn">Add To Bag</button>
            <button onClick={searchComponentVisibilityHandler} className="hover-btn">Search</button>
          </div>
          <div>
            {saveBuildFormIsVisible &&
              <div>
                {loggedInUserName !== null ?
                <div>
                  <input onChange={(e)=>setBuildName(e.target.value)} placeholder="Custom Build"></input>
                  <button onClick={buildSaveHandler} className="hover-btn">Add to custom builds</button>
                </div> : 
                <div>
                  <p>Login for build save!</p>
                </div>}
              </div>}
          </div>
        </div>
      <div className="content">
        <div className="content-column-left">
          <p>{msgToUser}</p>
          <div className="component-row-container">
            {componentTypesList.map((componentType, index) => <CreateComponentRow key={index} componentType={componentType} componentTypesList={componentTypesList} setComponentTypesList={setComponentTypesList} errorCheckers={errorCheckers}/>)}
          </div>
          <div className="extra-part-btn-container">
            <button className="hover-btn add-fan" onClick={()=>addExtraComponent(componentTypesList, setComponentTypesList, defaultImage, "FAN")}>ADD FAN</button>
            <button className="hover-btn add-ssd" onClick={()=>addExtraComponent(componentTypesList, setComponentTypesList, defaultImage, "SSD")}>ADD SSD</button>
            <button className="hover-btn add-hdd" onClick={()=>addExtraComponent(componentTypesList, setComponentTypesList, defaultImage, "HDD")}>ADD HDD</button>
          </div>
        </div>
        <div className="content-column-right">
          <div className="game-performance-card-container">
            {gameList.map((game, i) => <CreateGamePerformanceCard key={i} componentTypesList={componentTypesList} gameName={game.name} gamePic={game.pic} gameObject={game.gameObject}/>)}
          </div>
        </div>
      </div>
      </div>
    )
}

export default PcBuilder