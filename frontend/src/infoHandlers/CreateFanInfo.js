import React from 'react'

export default function CreateFanInfo({componentType}) {
    
    return (
        <div>
             {componentType.selected.SIZE !== undefined && <ul>
             {componentType.selected.SIZE.MM140 !== undefined && <li>Required 140mm slot: {componentType.selected.SIZE.MM140}</li>}
             {componentType.selected.SIZE.MM120 !== undefined && <li>Required 120mm slot: {componentType.selected.SIZE.MM120}</li>}
             {componentType.selected.SIZE.MM200 !== undefined && <li>Required 200mm slot: {componentType.selected.SIZE.MM200}</li>}
             </ul>}
        </div>
    )
}
