import { useState, useEffect } from 'react'

const CreateMotherboardErrorMessage = ({ errorCheckers, componentTypesList, componentType }) => {

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

    const errorCounter = () => {
        let count = 0
        if (errorCheckers.cpuMoboCompatibilityCheck(cpu.selected, mobo.selected) !== false) count++
        componentType.msg.error = count
    }

    const warningCounter = () => {
        let count = 0
        if (!errorCheckers.cpuMoboCompatibilityCheck(cpu.selected, mobo.selected) && errorCheckers.cpuMoboOverclockCheck(cpu.selected, mobo.selected) !== false) count++
        componentType.msg.warning = count
    }

    useEffect(() => {
        setCpu(componentTypesList.find(component => component.keyWord === "CPU"))
        setMobo(componentTypesList.find(component => component.keyWord === "MOBO"))
    }, [componentTypesList])

    return (
        <div>
            {errorCheckers.cpuMoboCompatibilityCheck(cpu.selected, mobo.selected) !== false 
            && <p onClick={onErrorClickHandler} className="component-error-msg"> ☒ You've got an error message from raccoon!</p>}
            {errorIsVisible && <div>
                <p className="component-error-msg">{errorCheckers.cpuMoboCompatibilityCheck(cpu.selected, mobo.selected)}</p>
                </div>}

            {!errorCheckers.cpuMoboCompatibilityCheck(cpu.selected, mobo.selected) && errorCheckers.cpuMoboOverclockCheck(cpu.selected, mobo.selected) !== false 
            && <p onClick={onWarningClickHandler} className="component-warning-msg"> ⚠ You've got a warning message from raccoon!</p>}
            {warningIsVisible && <div>
                <p className="component-warning-msg">{!errorCheckers.cpuMoboCompatibilityCheck(cpu.selected, mobo.selected) && errorCheckers.cpuMoboOverclockCheck(cpu.selected, mobo.selected)}</p>
                </div>} 

                {errorCounter()}
                {warningCounter()}
        </div>
    )
}

export default CreateMotherboardErrorMessage
