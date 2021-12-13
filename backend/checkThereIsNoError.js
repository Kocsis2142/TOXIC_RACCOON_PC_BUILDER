const checkThereIsNoError = (errorCheckers, componentTypeList) => {
    let cpu = componentTypeList.find(comp => comp.keyWord === "CPU").selected
    let mobo = componentTypeList.find(comp => comp.keyWord === "MOBO").selected
    let cooler = componentTypeList.find(comp => comp.keyWord === "COOLER").selected
    let ram = componentTypeList.find(comp => comp.keyWord === "RAM").selected
    let gpu = componentTypeList.find(comp => comp.keyWord === "GPU").selected
    let pcCase = componentTypeList.find(comp => comp.keyWord === "CASE").selected
    let psu = componentTypeList.find(comp => comp.keyWord === "PSU").selected
    let ssdArray = componentTypeList.filter(comp => comp.keyWord.includes("SSD"))
    let hddArray = componentTypeList.filter(comp => comp.keyWord.includes("HDD"))
    let fanArray = componentTypeList.filter(comp => comp.keyWord.includes("FAN"))
    
    if (errorCheckers.cpuMoboCompatibilityCheck(cpu, mobo) !== false) return false
    if (errorCheckers.cpuMaxMemoryCheck(cpu, ram) !== false) return false
    if (errorCheckers.cpuCoolerCaseSizeCheck(cooler, pcCase) !== false) return false
    if (errorCheckers.moboMaxMemoryCheck(mobo, ram) !== false) return false
    if (errorCheckers.moboCoolerSocketCheck(mobo, cooler) !== false) return false
    if (errorCheckers.ramMoboCompatibilityCheck(mobo, ram) !== false) return false
    if (errorCheckers.vgaCaseSizeCheck(gpu, pcCase) !== false) return false
    if (errorCheckers.vgaPsuPowerCheck(gpu, psu) !== false) return false
    if (errorCheckers.caseCoolerFanCheck(pcCase, cooler, fanArray) !== false) return false
    if (errorCheckers.moboSataSlotCheck(mobo, ssdArray, hddArray) !== false) return false
    if (errorCheckers.caseSsdPlaceCheck(pcCase, ssdArray) !== false) return false
    if (errorCheckers.caseHddPlaceCheck(pcCase, hddArray) !== false) return false
    if (errorCheckers.moboM2PlaceCheck(mobo, ssdArray) !== false) return false

        return true
}

module.exports = checkThereIsNoError