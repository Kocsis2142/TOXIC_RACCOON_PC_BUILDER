function getObjectByType(array, type) {
    let object = array.find(component => component.TYPE === type.split(" --- ")[0])
    return object
}

export default getObjectByType