import { useState, useEffect } from 'react'

const CreateHddErrorMessage = ({ errorCheckers, componentTypesList, componentType }) => {

    const [ errorIsVisible, setErrorIsVisible ] = useState(false)

    const onErrorClickHandler = () => {
        if (errorIsVisible) setErrorIsVisible(false)
        if (!errorIsVisible) setErrorIsVisible(true)
    }

    const [mobo, setMobo] = useState(componentTypesList.find(component => component.keyWord === "MOBO"))
    const [pcCase, setPcCase] = useState(componentTypesList.find(component => component.keyWord === "CASE"))
    const [ssdArray, setSsdArray] = useState(componentTypesList.filter(component => component.keyWord.includes("SSD")))
    const [hddArray, setHddArray] = useState(componentTypesList.filter(component => component.keyWord.includes("HDD")))

    const errorCounter = () => {
        let count = 0
        if (errorCheckers.moboSataSlotCheck(mobo.selected, ssdArray, hddArray) !== false) count++
        if (errorCheckers.caseHddPlaceCheck(pcCase.selected, hddArray) !== false) count++
        componentType.msg.error = count
    }

    useEffect(() => {
        setMobo(componentTypesList.find(component => component.keyWord === "MOBO"))
        setPcCase(componentTypesList.find(component => component.keyWord === "CASE"))
        setSsdArray(componentTypesList.filter(component => component.keyWord.includes("SSD")))
        setHddArray(componentTypesList.filter(component => component.keyWord.includes("HDD")))
    }, [componentTypesList])

    return (
        <div>
            {(errorCheckers.moboSataSlotCheck(mobo.selected, ssdArray, hddArray) !== false 
            || errorCheckers.caseHddPlaceCheck(pcCase.selected, hddArray) !== false)
            && <p onClick={onErrorClickHandler} className="component-error-msg"> ☒ You've got an error message from raccoon!</p>}
            {errorIsVisible && <div>
                <p className="component-error-msg">{errorCheckers.moboSataSlotCheck(mobo.selected, ssdArray, hddArray)}</p>
                <p className="component-error-msg">{errorCheckers.caseHddPlaceCheck(pcCase.selected, hddArray)}</p>
                </div>}
                
            {errorCounter()}
        </div>
    )
}

export default CreateHddErrorMessage