function getSelectedComponents(componentTypeList) {
    let selectedOnly = []
    componentTypeList.map(component => selectedOnly.push({name : component.name, keyWord: component.keyWord, selected : component.selected}))
    return selectedOnly
}

export default getSelectedComponents