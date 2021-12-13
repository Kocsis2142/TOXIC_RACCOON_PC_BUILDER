import React from 'react'

export default function CreateSsdInfo({componentType}) {
    
    return (
        <ul>
            {componentType.selected.CASE_SLOT !== "0" && <li>Case slot size: {componentType.selected.CASE_SLOT}"</li>}
            <li>Connection: {componentType.selected.CONNECTION_TYPE}</li>
        </ul>
    )
}
