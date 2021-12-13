import { useState } from 'react'
import CreateErrorMessage from './CreateErrorMessage'
import getObjectByType from '../getFunctions/getObjectByType'
import CreateMoreInfo from './CreateMoreInfo'

function CreateComponentRow({componentType, componentTypesList, setComponentTypesList, errorCheckers}) {

    const [ moreInfoIsVisible, setMoreInfoIsVisible ] = useState(false)

    const onChangeHandler = (event) => {
        let selectedObject = getObjectByType(componentType.type, event.target.value)
        let newComponentList = [...componentTypesList]
        newComponentList.map(comp => comp.id === componentType.id ? comp.selected = selectedObject : "")
        setComponentTypesList(newComponentList)
    }

    const removeHandler = () => {
        let newComponentTypeList = componentTypesList.filter(component => component.id !== componentType.id)
        setComponentTypesList(newComponentTypeList)
    }

    const moreInfoHandler = () => {
        moreInfoIsVisible ? setMoreInfoIsVisible(false) : setMoreInfoIsVisible(true)
    }

    return (
        <>
            <div className="component-list">
                <div className="component-image-container">
                    <img className="component-image" src={componentType.selected.IMG} alt="component_pic"/>
                </div>
                <ul className="component-row">
                    <li>
                        <div className="component-name"><p>{componentType.name}</p></div>
                    </li>
                    <li>
                        <div className="component-type"><p>{componentType.selected.TYPE}</p></div>
                    </li>
                    <li>
                        <div className="component-price"><p>{componentType.selected.PRICE}</p></div>
                    </li>
                    <li className="component-selector-container">
                        <select className="component-selector" onChange={(event)=>onChangeHandler(event)}>
                            {componentType.type.map((selector, index) => 
                            selector.SOCKET !== undefined 
                            ? <option key={index}>{selector.TYPE} --- SOCKET {selector.SOCKET} --- {selector.PRICE}</option>
                            : <option key={index}>{selector.TYPE} --- {selector.PRICE}</option>
                            )}
                        </select>
                    </li>
                </ul>
            </div>
                <ul>
                {moreInfoIsVisible && 
                    <li className="component-info-container">
                        <CreateMoreInfo componentType={componentType}/>
                    </li>}
                    <li className="component-button-container">
                        <button className="hover-btn component-info-btn" onClick={moreInfoHandler}> 🛈 Product info</button>
                    </li>
                    {componentType.keyWord.includes("EXTRA") && 
                    <li className="component-remove-button-container">
                        <button className="hover-btn component-remove-btn" onClick={removeHandler}>Remove from build ⌫ </button>
                    </li>}
                    <div className="error-container"><CreateErrorMessage errorCheckers={errorCheckers} componentTypesList={componentTypesList} componentType={componentType}/></div>
                </ul>
        </>
        
    )
}

export default CreateComponentRow