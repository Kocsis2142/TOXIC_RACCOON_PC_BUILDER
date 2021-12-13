import { useEffect, useState } from 'react'
import getJSONDataFromServer from '../data_fetch/fetch'
import CreateBuildCard from './CreateBuildCard'

function RaccoonBuildsComponent({loggedInUserName, loggedInUserPrivilege, loggedInUserEmail, componentTypesList, setComponentTypesList, currentBag, setCurrentBag}) {

    const [ raccoonBuildList, setRaccoonBuildList ] = useState([])
    const [ buildIsUpToDate, setBuildIsUpToDate ] = useState(true)

    useEffect(() => {
        getJSONDataFromServer(setRaccoonBuildList, "RACCOONBUILDS")
        if (!buildIsUpToDate) setBuildIsUpToDate(true)
    }, [buildIsUpToDate])

    return (
        <div className="raccoon-builds-component">
            {raccoonBuildList.map((build, index) => <CreateBuildCard
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

export default RaccoonBuildsComponent