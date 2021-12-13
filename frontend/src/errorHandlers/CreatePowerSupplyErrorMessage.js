import { useState, useEffect } from 'react'

const CreatePowerSupplyErrorMessage = ({ errorCheckers, componentTypesList, componentType }) => {

    const [ errorIsVisible, setErrorIsVisible ] = useState(false)

    const onErrorClickHandler = () => {
        if (errorIsVisible) setErrorIsVisible(false)
        if (!errorIsVisible) setErrorIsVisible(true)
    }

    const [vga, setVga] = useState(componentTypesList.find(component => component.keyWord === "GPU"))
    const [psu, setPsu] = useState(componentTypesList.find(component => component.keyWord === "PSU"))

    const errorCounter = () => {
        let count = 0
        if (errorCheckers.vgaPsuPowerCheck(vga.selected, psu.selected) !== false) count++
        componentType.msg.error = count
    }

    useEffect(() => {
        setVga(componentTypesList.find(component => component.keyWord === "GPU"))
        setPsu(componentTypesList.find(component => component.keyWord === "PSU"))
    }, [componentTypesList])

    return (
        <div>
            {errorCheckers.vgaPsuPowerCheck(vga.selected, psu.selected) !== false 
            && <p onClick={onErrorClickHandler} className="component-error-msg"> ☒ You've got an error message from raccoon!</p>}
            {errorIsVisible && <div>
                <p className="component-error-msg">{errorCheckers.vgaPsuPowerCheck(vga.selected, psu.selected)}</p>
                </div>}

            {errorCounter()}
        </div>
    )
}

export default CreatePowerSupplyErrorMessage