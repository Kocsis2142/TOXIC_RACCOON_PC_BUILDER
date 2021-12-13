import React from 'react'

export default function CreateCaseInfo({componentType}) {
    
    return (
        <div>
            {componentType.selected.BUILT_FAN !== undefined && <ul>
             {componentType.selected.BUILT_FAN.MM120 !== undefined && <li>120mm Pre-built fan(s): {componentType.selected.BUILT_FAN.MM120}</li>}
             {componentType.selected.BUILT_FAN.MM140 !== undefined && <li>140mm Pre-built fan(s): {componentType.selected.BUILT_FAN.MM140}</li>}
             {componentType.selected.BUILT_FAN.MM200 !== undefined && <li>200mm Pre-built fan(s): {componentType.selected.BUILT_FAN.MM200}</li>}
             <li>Supports maximum {componentType.selected.FAN_PLACE.MM120} piece of 120mm fan(s)</li>
             <li>Supports maximum {componentType.selected.FAN_PLACE.MM140} piece of 140mm fan(s)</li>
             <li>Supports maximum {componentType.selected.FAN_PLACE.MM200} piece of 200mm fan(s)</li>
             <li>Overall fan support: maximum {componentType.selected.MAX_FAN_PLACE} fan(s)</li>
             <li>Processor cooler maximum size: {componentType.selected.CPU_COOLER_MAX_HEIGHT}</li>
             <li>Liquid cooler support: {componentType.selected.RADIATOR_SUPPORT ? "Supported" : "Not supported"}</li>
             <li>Supports maximum: {componentType.selected.VGA_MAX_LENGTH} graphic card</li>
             {componentType.selected.MOBO_SUPPORT !== undefined && <li><ul>Supported motherboards: {componentType.selected.MOBO_SUPPORT.map((mobo, index) => <li key={index}>{mobo},</li>)}</ul></li>}
             <li>2.5" SSD place: {componentType.selected.SSD_PLACE}</li>
             <li>3.5" HDD place: {componentType.selected.HDD_PLACE}</li> </ul>}
        </div>
    )
}
