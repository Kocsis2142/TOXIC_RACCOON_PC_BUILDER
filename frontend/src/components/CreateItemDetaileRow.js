import { useState } from 'react'
import CreateComponentDetailesRow from './CreateComponentDetailesRow'

function CreateItemDetailRow({item, removeItemHandler}) {

    const [ componentsInfoIsVisible, setComponentInfoIsVisible ] = useState(false)

    const componentsInfoHandler = () => {
        componentsInfoIsVisible ? setComponentInfoIsVisible(false) : setComponentInfoIsVisible(true)
    }

    return (
        <ul>
            <li>{item.name}</li>
            <li>{item.price} Ft</li>
            <li className="hover-btn" onClick={componentsInfoHandler}>Components 🡃</li>
            {componentsInfoIsVisible && <li>
                {item.selectedComponents.map((component, index) => <CreateComponentDetailesRow key={index} component={component}/>)}
            </li>}
            <li className="hover-btn" onClick={()=>removeItemHandler(item)}>Drop this item</li>
        </ul>
    )
}

export default CreateItemDetailRow