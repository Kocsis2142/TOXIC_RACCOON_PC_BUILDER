import { useState, useEffect } from 'react'

const CreateCaseErrorMessage = ({ errorCheckers, componentTypesList, componentType }) => {

    const [ errorIsVisible, setErrorIsVisible ] = useState(false)

    const onErrorClickHandler = () => {
        if (errorIsVisible) setErrorIsVisible(false)
        if (!errorIsVisible) setErrorIsVisible(true)
    }

    const [cooler, setCooler] = useState(componentTypesList.find(component => component.keyWord === "COOLER"))
    const [vga, setVga] = useState(componentTypesList.find(component => component.keyWord === "GPU"))
    const [pcCase, setPcCase] = useState(componentTypesList.find(component => component.keyWord === "CASE"))

    const errorCounter = () => {

        
        let count = 0
    
        if (errorCheckers.cpuCoolerCaseSizeCheck(cooler.selected, pcCase.selected) !== false) count++
        if (errorCheckers.vgaCaseSizeCheck(vga.selected, pcCase.selected) !== false) count++
        componentType.msg.error = count

        
        
    }

    useEffect(() => {
        setCooler(componentTypesList.find(component => component.keyWord === "COOLER"))
        setVga(componentTypesList.find(component => component.keyWord === "GPU"))
        setPcCase(componentTypesList.find(component => component.keyWord === "CASE"))
    }, [componentTypesList])

    return (
        <div>
            {(errorCheckers.cpuCoolerCaseSizeCheck(cooler.selected, pcCase.selected) !== false 
            || errorCheckers.vgaCaseSizeCheck(vga.selected, pcCase.selected) !== false)
            && <p onClick={onErrorClickHandler} className="component-error-msg"> ☒ You've got an error message from raccoon!</p>}
            {errorIsVisible && <div>
                <p className="component-error-msg">{errorCheckers.cpuCoolerCaseSizeCheck(cooler.selected, pcCase.selected)}</p>
                <p className="component-error-msg">{errorCheckers.vgaCaseSizeCheck(vga.selected, pcCase.selected)}</p>
                </div>}

            {errorCounter()}
        </div>
    )
}

export default CreateCaseErrorMessage