import { useState, useEffect } from 'react'

const CreateCoolerErrorMessage = ({ errorCheckers, componentTypesList, componentType }) => {

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

    const [cpu, setCpu] = useState(componentTypesList.find(component => component.keyWord === "CPU"))
    const [mobo, setMobo] = useState(componentTypesList.find(component => component.keyWord === "MOBO"))
    const [cooler, setCooler] = useState(componentTypesList.find(component => component.keyWord === "COOLER"))

    const errorCounter = () => {
        let count = 0
        if (errorCheckers.moboCoolerSocketCheck(mobo.selected, cooler.selected) !== false) count++
        componentType.msg.error = count
    }

    const warningCounter = () => {
        let count = 0
        if (errorCheckers.cpuCoolerQualityCheck(cpu.selected, cooler.selected) !== false) count++
        componentType.msg.warning = count
    }

    useEffect(() => {
        setCpu(componentTypesList.find(component => component.keyWord === "CPU"))
        setMobo(componentTypesList.find(component => component.keyWord === "MOBO"))
        setCooler(componentTypesList.find(component => component.keyWord === "COOLER"))
    }, [componentTypesList])

    return (
        <div>
            {errorCheckers.moboCoolerSocketCheck(mobo.selected, cooler.selected) !== false 
            && <p onClick={onErrorClickHandler} className="component-error-msg"> ☒ You've got an error message from raccoon!</p>}
            {errorIsVisible && <div><p className="component-error-msg">{errorCheckers.moboCoolerSocketCheck(mobo.selected, cooler.selected)}</p></div>}

            {errorCheckers.cpuCoolerQualityCheck(cpu.selected, cooler.selected) !== false 
            && <p onClick={onWarningClickHandler} className="component-warning-msg"> ⚠ You've got a warning message from raccoon!</p>}
            {warningIsVisible && <div><p className="component-warning-msg">{errorCheckers.cpuCoolerQualityCheck(cpu.selected, cooler.selected)}</p></div>} 

            {errorCounter()}
            {warningCounter()}
        </div>
    )
}

export default CreateCoolerErrorMessage