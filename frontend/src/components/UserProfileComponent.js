import { useEffect, useState } from 'react'
import getJSONDataFromServer from '../data_fetch/fetch'
import CreateBuildCard from './CreateBuildCard'
import jwt_decode from 'jwt-decode'

function UserProfileComponent({loggedInUserName, loggedInUserEmail, componentTypesList, setComponentTypesList, currentBag, setCurrentBag}) {

    const [ customBuildList, setCustomBuildList ] = useState([])
    const [ buildIsUpToDate, setBuildIsUpToDate ] = useState(true)
    const user = localStorage.getItem('jwtToken') !== null ? jwt_decode(localStorage.getItem('jwtToken')) : null

    useEffect(() => {
        getJSONDataFromServer(setCustomBuildList, "CUSTOMBUILDS")
        if (!buildIsUpToDate) setBuildIsUpToDate(true)
    }, [buildIsUpToDate])

    const getOnlyUserBuilds = () => {
        let filteredBuildList = customBuildList.filter(build => build.USER_EMAIL === loggedInUserEmail)
        return filteredBuildList
    }

    if (loggedInUserName !== null && user !== null) { return (
        <div className="user-profile-component">
            <img width="100px" src={user.picture} alt="user profile"/>
            <h1>{loggedInUserName}</h1>
            <h2>{user.email}</h2>
            {getOnlyUserBuilds().map((build, index) => <CreateBuildCard key={index} build={build} loggedInUserName={loggedInUserName} loggedInUserEmail={loggedInUserEmail} componentTypesList={componentTypesList} setComponentTypesList={setComponentTypesList} currentBag={currentBag} setCurrentBag={setCurrentBag} setBuildIsUpToDate={setBuildIsUpToDate}/>)}
        </div>
    ) 
} else {
    return (
        <div>
            <p>You are not logged in!</p>
        </div>
    )
    }
}

export default UserProfileComponent