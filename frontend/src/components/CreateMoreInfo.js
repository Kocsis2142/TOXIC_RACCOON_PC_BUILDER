import CreateCaseInfo from '../infoHandlers/CreateCaseInfo'
import CreateCoolerInfo from '../infoHandlers/CreateCoolerInfo'
import CreateProcessorInfo from '../infoHandlers/CreateProcessorInfo'
import CreateFanInfo from '../infoHandlers/CreateFanInfo'
import CreateGraphicCardInfo from '../infoHandlers/CreateGraphicCardInfo'
import CreateHddInfo from '../infoHandlers/CreateHddInfo'
import CreateMemoryInfo from '../infoHandlers/CreateMemoryInfo'
import CreateMotherboardInfo from '../infoHandlers/CreateMotherboardInfo'
import CreateSsdInfo from '../infoHandlers/CreateSsdInfo'
import CreatePsuInfo from '../infoHandlers/CreatePsuInfo'

function CreateMoreInfo({componentType}) {
    return (
        <div>
            
            {componentType.keyWord === "CPU" && <CreateProcessorInfo componentType={componentType}/>}
            {componentType.keyWord === "MOBO" && <CreateMotherboardInfo componentType={componentType}/>}
            {componentType.keyWord === "RAM" && <CreateMemoryInfo componentType={componentType}/>}
            {componentType.keyWord === "COOLER" && <CreateCoolerInfo componentType={componentType}/>}
            {componentType.keyWord === "GPU" && <CreateGraphicCardInfo componentType={componentType}/>}
            {componentType.keyWord === "CASE" && <CreateCaseInfo componentType={componentType}/>}
            {componentType.keyWord === "PSU" && <CreatePsuInfo componentType={componentType}/>}
            {componentType.keyWord.includes("FAN") && <CreateFanInfo componentType={componentType}/>}
            {componentType.keyWord.includes("SSD") && <CreateSsdInfo componentType={componentType}/>}
            {componentType.keyWord.includes("HDD") && <CreateHddInfo componentType={componentType}/>}

        </div>
    )
}

export default CreateMoreInfo