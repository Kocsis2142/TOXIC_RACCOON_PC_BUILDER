import CreateMotherboardErrorMessage from '../errorHandlers/CreateMotherboardErrorMessage'
import CreateMemoryErrorMessage from '../errorHandlers/CreateMemoryErrorMessage'
import CreateCoolerErrorMessage from '../errorHandlers/CreateCoolerErrorMessage'
import CreateCaseErrorMessage from '../errorHandlers/CreateCaseErrorMessage'
import CreatePowerSupplyErrorMessage from '../errorHandlers/CreatePowerSupplyErrorMessage'
import CreateFanErrorMessage from '../errorHandlers/CreateFanErrorMessage'
import CreateSsdErrorMessage from '../errorHandlers/CreateSsdErrorMessage'
import CreateHddErrorMessage from '../errorHandlers/CreateHddErrorMessage'


function CreateErrorMessage({errorCheckers, componentTypesList, componentType}) {

    return (
        <div className="component-error-messages">
            
            {componentType.keyWord === "MOBO" && <CreateMotherboardErrorMessage errorCheckers={errorCheckers} componentTypesList={componentTypesList} componentType={componentType}/>}
            {componentType.keyWord === "RAM" && <CreateMemoryErrorMessage errorCheckers={errorCheckers} componentTypesList={componentTypesList} componentType={componentType}/>}
            {componentType.keyWord === "COOLER" && <CreateCoolerErrorMessage errorCheckers={errorCheckers} componentTypesList={componentTypesList} componentType={componentType}/>}
            {componentType.keyWord === "CASE" && <CreateCaseErrorMessage errorCheckers={errorCheckers} componentTypesList={componentTypesList} componentType={componentType}/>}
            {componentType.keyWord === "PSU" && <CreatePowerSupplyErrorMessage errorCheckers={errorCheckers} componentTypesList={componentTypesList} componentType={componentType}/>}
            {componentType.keyWord.includes("FAN") && <CreateFanErrorMessage errorCheckers={errorCheckers} componentTypesList={componentTypesList} componentType={componentType}/>}
            {componentType.keyWord.includes("SSD") && <CreateSsdErrorMessage errorCheckers={errorCheckers} componentTypesList={componentTypesList} componentType={componentType}/>}
            {componentType.keyWord.includes("HDD") && <CreateHddErrorMessage errorCheckers={errorCheckers} componentTypesList={componentTypesList} componentType={componentType}/>}
            
        </div>
    )
}

export default CreateErrorMessage