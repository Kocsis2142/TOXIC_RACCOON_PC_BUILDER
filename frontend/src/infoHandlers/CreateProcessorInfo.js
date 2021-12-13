import React from 'react'

export default function CreateProcessorInfo({componentType}) {
    
    return (
        <ul>
            <li>Socket: {componentType.selected.SOCKET}</li>
            <li>Base Clock: {componentType.selected.BASE_CLOCK}</li>
            <li>Overclock: {componentType.selected.OVERCLOCK ? "Supported" : "Not supported"}</li>
            <li>Cores: {componentType.selected.CORES}</li>
            <li>Threads: {componentType.selected.THREADS}</li>
            <li>Maximum Clock: {componentType.selected.MAX_CLOCK}</li>
            <li>Maximum Memory: {componentType.selected.MAX_MEMORY}</li>
            <li>Maximum Memory Speed: {componentType.selected.MAX_MEMORY_SPEED}</li>
            <li>Supported Memory Type: {componentType.selected.MEMORY_TYPE}</li>
            <li>TDP: {componentType.selected.TDP}</li>
        </ul>
    )
}

