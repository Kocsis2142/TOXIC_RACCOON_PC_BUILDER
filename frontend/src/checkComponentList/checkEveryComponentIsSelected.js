function checkEveryComponentIsSelected(componentTypesList) {
    if (componentTypesList.filter(component => component.selected.DEFAULT === true).length === 0) {
        return true
    } else {
        return false
    }
}

export default checkEveryComponentIsSelected