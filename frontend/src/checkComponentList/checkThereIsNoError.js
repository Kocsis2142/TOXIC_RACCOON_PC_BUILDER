function checkThereIsNoError(componentTypesList) {
    if (componentTypesList.filter(component => component.msg.error !== 0).length === 0) {
        return true
    } else {
        return false
    }
}

export default checkThereIsNoError