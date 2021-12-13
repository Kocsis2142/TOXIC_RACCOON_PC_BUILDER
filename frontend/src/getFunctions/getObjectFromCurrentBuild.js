import getSelectedComponents from './getSelectedComponentOnly'
import { v4 as uuidv4 } from 'uuid';

const getObjectFromCurrentBuild = (totalPrice, componentTypesList, buildName = "Custom PC Build") => {
    return {name : buildName, id : uuidv4(), price : totalPrice, selectedComponents : getSelectedComponents(componentTypesList)}
  }

export default getObjectFromCurrentBuild