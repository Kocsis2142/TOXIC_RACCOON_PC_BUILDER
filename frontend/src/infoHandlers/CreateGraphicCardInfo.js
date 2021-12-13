import React from 'react'

export default function CreateGraphicCardInfo({componentType}) {
    
    return (
        <ul>
            <li>Card Memory: {componentType.selected.CARD_MEMORY}</li>
            <li>Length: {componentType.selected.CARD_LENGTH}</li>
            <li>Cooling Fan: {componentType.selected.FAN}</li>
            <li>Recommended Psu: {componentType.selected.RECOMMENDED_PSU}</li>
        </ul>
    )
}
