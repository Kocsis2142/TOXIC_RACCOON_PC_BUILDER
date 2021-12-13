import React from 'react'

export default function CreateCoolerInfo({componentType}) {
    
    return (
        <ul>
            <li>Type: {componentType.selected.COOLING_TYPE}</li>
            {componentType.SUPPORTED_SOCKETS !== undefined && <li><ul>{componentType.selected.SUPPORTED_SOCKETS.map(socket => <li>{socket},</li>)}</ul></li>}
            <li>Airflow: {componentType.selected.AIRFLOW}</li>
            <li>Height: {componentType.selected.HEIGHT}</li>
            <li>Width: {componentType.selected.WIDTH}</li>
            <li>120mm Case slot required: {componentType.selected.SLOT_COUNTER_120MM}</li>
            <li>140mm Case slot required: {componentType.selected.SLOT_COUNTER_140MM}</li>
        </ul>
    )
}
