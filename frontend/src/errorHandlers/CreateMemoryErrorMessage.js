import { useState, useEffect } from 'react'

const CreateMemoryErrorMessage = ({ errorCheckers, componentTypesList, componentType }) => {

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
    const [ram, setRam] = useState(componentTypesList.find(component => component.keyWord === "RAM"))

    const errorCounter = () => {
        let count = 0
        if (errorCheckers.cpuMaxMemoryCheck(cpu.selected, ram.selected) !== false) count++
        if (errorCheckers.moboMaxMemoryCheck(mobo.selected, ram.selected) !== false) count++
        if (errorCheckers.ramMoboCompatibilityCheck(mobo.selected, ram.selected) !== false) count++
        componentType.msg.error = count
    }

    const warningCounter = () => {
        let count = 0
        if (errorCheckers.cpuMaxMemorySpeedCheck(cpu.selected, ram.selected) !== false) count++
        if (errorCheckers.ramBottleneckCheck(mobo.selected, ram.selected) !== false) count++
        componentType.msg.warning = count
    }

    useEffect(() => {
        setCpu(componentTypesList.find(component => component.keyWord === "CPU"))
        setMobo(componentTypesList.find(component => component.keyWord === "MOBO"))
        setRam(componentTypesList.find(component => component.keyWord === "RAM"))
    }, [componentTypesList])

    return (
        <div>
            {(errorCheckers.cpuMaxMemoryCheck(cpu.selected, ram.selected) !== false 
            || errorCheckers.moboMaxMemoryCheck(mobo.selected, ram.selected) !== false
            || errorCheckers.ramMoboCompatibilityCheck(mobo.selected, ram.selected) !== false)
            && <p onClick={onErrorClickHandler} className="component-error-msg"> ☒ You've got an error message from raccoon!</p>}
            {errorIsVisible && <div>
                <p className="component-error-msg">{errorCheckers.cpuMaxMemoryCheck(cpu.selected, ram.selected)}</p>
                <p className="component-error-msg">{errorCheckers.moboMaxMemoryCheck(mobo.selected, ram.selected)}</p>
                <p className="component-error-msg">{errorCheckers.ramMoboCompatibilityCheck(mobo.selected, ram.selected)}</p>
                </div>}
            {(errorCheckers.cpuMaxMemorySpeedCheck(cpu.selected, ram.selected) !== false 
            || errorCheckers.ramBottleneckCheck(mobo.selected, ram.selected) !== false)
            && <p onClick={onWarningClickHandler} className="component-warning-msg"> ⚠ You've got a warning message from raccoon!</p>}
            {warningIsVisible && <div>
                <p className="component-warning-msg">{errorCheckers.cpuMaxMemorySpeedCheck(cpu.selected, ram.selected)}</p>
                <p className="component-warning-msg">{errorCheckers.ramBottleneckCheck(mobo.selected, ram.selected)}</p>
                </div>} 

            {errorCounter()}
            {warningCounter()}
        </div>
    )
}

export default CreateMemoryErrorMessage