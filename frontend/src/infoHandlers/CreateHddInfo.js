import React from 'react'

export default function CreateHddInfo({componentType}) {
    
    return (
        <ul>
            <li>Case slot size: {componentType.selected.CASE_SLOT}"</li>
            <li>Connection: {componentType.selected.CONNECTION_TYPE}</li>
        </ul>
    )
}
