import { v4 as uuidv4 } from 'uuid';
import { defaultType, defaultPrice } from '../defaultComponentTypeList/defaultComponentTypeList'

function addExtraComponent(componentTypesList, setComponentTypesList, defaultImage, componentTypeKeyWord) {
    let newObject = {...componentTypesList.find(component => component.keyWord === componentTypeKeyWord)}
    newObject.id = uuidv4()
    newObject.selected = {TYPE : defaultType, PRICE : defaultPrice, IMG : defaultImage, DEFAULT : true}
    newObject.name = "Extra " + newObject.name
    newObject.keyWord = "EXTRA " + componentTypeKeyWord
    setComponentTypesList([...componentTypesList, newObject])
}

export default addExtraComponent