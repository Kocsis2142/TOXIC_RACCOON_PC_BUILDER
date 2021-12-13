import React from 'react'

export default function CreateMotherboardInfo({componentType}) {
    
    return (
        <ul>
            <li>Chipset: {componentType.selected.CHIPSET}</li>
            <li>Socket: {componentType.selected.SOCKET}</li>
            <li>Size: {componentType.selected.SIZE}</li>
            <li>Overclock: {componentType.selected.OVERCLOCK ? "Supported" : "Not supported"}</li>
            <li>Maximum Memory: {componentType.selected.MAX_MEMORY}</li>
            <li>Maximum Memory Speed: {componentType.selected.MAX_MEMORY_SPEED}</li>
            <li>Memory Slots: {componentType.selected.MEMORY_SLOT}</li>
            <li>Supported Memory Type: {componentType.selected.MEMORY_TYPE}</li>
            <li>Supported M.2 SSD: {componentType.selected.M_2_SLOT}</li>
            <li>Supported SATA SSD: {componentType.selected.SATA_SLOT_FULL}</li>
        </ul>
    )
}
