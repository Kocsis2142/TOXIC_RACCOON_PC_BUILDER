import { useEffect, useState } from 'react'
import getJSONDataFromServer from '../data_fetch/fetch'
import CreateBuildCard from './CreateBuildCard'

function CustomBuildsComponent({loggedInUserName, loggedInUserPrivilege, componentTypesList, setComponentTypesList, currentBag, setCurrentBag, loggedInUserEmail}) {

    const [ customBuildList, setCustomBuildList ] = useState([])
    const [ buildIsUpToDate, setBuildIsUpToDate ] = useState(true)

    useEffect(() => {
        getJSONDataFromServer(setCustomBuildList, "CUSTOMBUILDS")
        if (!buildIsUpToDate) setBuildIsUpToDate(true)
    }, [buildIsUpToDate])

    return (
        <div className="custom-builds-component">
            {customBuildList.map((build, index) => <CreateBuildCard 
                key={index} 
                build={build} 
                loggedInUserName={loggedInUserName}
                loggedInUserPrivilege={loggedInUserPrivilege}
                loggedInUserEmail={loggedInUserEmail}
                componentTypesList={componentTypesList} 
                setComponentTypesList={setComponentTypesList} 
                currentBag={currentBag} 
                setCurrentBag={setCurrentBag}
                setBuildIsUpToDate={setBuildIsUpToDate}/>)}
        </div>
    )
}

export default CustomBuildsComponent