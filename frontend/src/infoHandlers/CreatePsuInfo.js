import React from 'react'

export default function CreatePsuInfo({componentType}) {
    
    return (
        <ul>
            <li>Power: {componentType.selected.POWER}</li>
        </ul>
    )
}
