import { useState, useEffect } from 'react'

const CreateFanErrorMessage = ({ errorCheckers, componentTypesList, componentType }) => {

    const [ errorIsVisible, setErrorIsVisible ] = useState(false)
    const [ warningIsVisible, setWarningIsVisible ] = useState(false)

    const onErrorClickHandler = () => {
        if (errorIsVisible) setErrorIsVisible(false)
        if (!errorIsVisible) setErrorIsVisible(true)
    }

    const onWarningClickHandler = () => {
        if (warningIsVisible) setWarningIsVisible(false)
        if (!warningIsVisible) setWarningIsVisible(true)
    }

    const [pcCase, setPcCase] = useState(componentTypesList.find(component => component.keyWord === "CASE"))
    const [cooler, setCooler] = useState(componentTypesList.find(component => component.keyWord === "COOLER"))
    const [fanArray, setFanArray] = useState(componentTypesList.filter(component => component.keyWord.includes("FAN")))

    const errorCounter = () => {
        let count = 0
        if (errorCheckers.caseCoolerFanCheck(pcCase.selected, cooler.selected, fanArray) !== false) count++
        componentType.msg.error = count
    }

    const warningCounter = () => {
        let count = 0
        if (!errorCheckers.caseCoolerFanCheck(pcCase.selected, cooler.selected, fanArray) && errorCheckers.caseCoolerFanCheckWithPreBuildFan(pcCase.selected, cooler.selected, fanArray) !== false) count++
        componentType.msg.warning = count
    }

    useEffect(() => {
        setPcCase(componentTypesList.find(component => component.keyWord === "CASE"))
        setCooler(componentTypesList.find(component => component.keyWord === "COOLER"))
        setFanArray(componentTypesList.filter(component => component.keyWord.includes("FAN")))
    }, [componentTypesList])

    return (
        <div>
            {errorCheckers.caseCoolerFanCheck(pcCase.selected, cooler.selected, fanArray) !== false 
            && <p onClick={onErrorClickHandler} className="component-error-msg"> ☒ You've got an error message from raccoon!</p>}
            {errorIsVisible && <div><p className="component-error-msg">{errorCheckers.caseCoolerFanCheck(pcCase.selected, cooler.selected, fanArray)}</p></div>}

            {!errorCheckers.caseCoolerFanCheck(pcCase.selected, cooler.selected, fanArray) && errorCheckers.caseCoolerFanCheckWithPreBuildFan(pcCase.selected, cooler.selected, fanArray) !== false 
            && <p onClick={onWarningClickHandler} className="component-warning-msg"> ⚠ You've got a warning message from raccoon!</p>}
            {warningIsVisible && <div><p className="component-warning-msg">{!errorCheckers.caseCoolerFanCheck(pcCase.selected, cooler.selected, fanArray) && errorCheckers.caseCoolerFanCheckWithPreBuildFan(pcCase.selected, cooler.selected, fanArray)}</p></div>} 

            {errorCounter()}
            {warningCounter()}
        </div>
    )
}

export default CreateFanErrorMessage