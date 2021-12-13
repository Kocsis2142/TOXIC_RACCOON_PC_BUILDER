import { v4 as uuidv4 } from 'uuid';

const getObjectFromCustomBuild = (totalPrice, customBuildComponents, buildName = "Custom PC Build") => {
    return {name : buildName, id : uuidv4(), price : totalPrice, selectedComponents : customBuildComponents}
  }

export default getObjectFromCustomBuild