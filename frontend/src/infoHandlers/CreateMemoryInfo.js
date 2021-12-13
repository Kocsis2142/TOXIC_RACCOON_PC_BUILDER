import React from 'react'

export default function CreateMemoryInfo({componentType}) {
    
    return (
        <ul>
             <li>Type: {componentType.selected.MEMORY_TYPE}</li>
             <li>Speed: {componentType.selected.MEMORY_SPEED}</li>
             <li>Latency: {componentType.selected.MEMORY_LATENCY}</li>
             <li>{componentType.selected.MEMORY_KIT} piece kit</li>
             <li>Capacity each: {componentType.selected.CAPACITY_EACH}</li>
             <li>Full capacity: {componentType.selected.CAPACITY_FULL}</li>
        </ul>
    )
}
