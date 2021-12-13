const errorCheckers = {
    cpuMoboCompatibilityCheck : function(cpu, mobo) {
        if (cpu.SOCKET !== undefined && mobo.SOCKET !== undefined && cpu.SOCKET !== mobo.SOCKET) 
        return `The Choosen Processor & Motherboard has different socket type, for this Processor you must have choose a SOCKET ${cpu.SOCKET} Motherboard!`
        return false
    },
    cpuMaxMemoryCheck : function(cpu, ram) {
        if (cpu.MAX_MEMORY !== undefined && ram.CAPACITY_FULL !== undefined && parseInt(cpu.MAX_MEMORY) < parseInt(ram.CAPACITY_FULL)) 
        return `This processor only supports ${cpu.MAX_MEMORY} of memory, please choose maximum ${cpu.MAX_MEMORY} of memory or a higher grade processor!`
        return false
    },
    cpuCoolerCaseSizeCheck : function(cooler, pcCase) {
        if (cooler.HEIGHT !== undefined && pcCase.CPU_COOLER_MAX_HEIGHT !== undefined && parseInt(pcCase.CPU_COOLER_MAX_HEIGHT) < parseInt(cooler.HEIGHT)) 
        return `The selected processor coolers heigth is ${cooler.HEIGHT}, this pc case is supports maximum ${pcCase.CPU_COOLER_MAX_HEIGHT} processor coolers!`
        return false
    },
    moboMaxMemoryCheck : function(mobo, ram) {
        if (mobo.MAX_MEMORY !== undefined && ram.CAPACITY_FULL !== undefined && parseInt(mobo.MAX_MEMORY) < parseInt(ram.CAPACITY_FULL)) 
        return `This motherboard only supports ${mobo.MAX_MEMORY} of memory, please choose maximum ${mobo.MAX_MEMORY} of memory or higher grade motherboard!`
        return false
    },
    moboCoolerSocketCheck : function(mobo, cooler) {
        if (mobo.SOCKET !== undefined && cooler.SUPPORTED_SOCKETS !== undefined && !cooler.SUPPORTED_SOCKETS.includes(mobo.SOCKET)) 
        return `This cooler is not support SOCKET ${mobo.SOCKET} motherboards, please choose an other cooler or motherboard!`
        return false
    },
    ramMoboCompatibilityCheck : function(mobo, ram) {
        if (mobo.MEMORY_TYPE !== undefined && ram.MEMORY_TYPE !== undefined && mobo.MEMORY_TYPE !== ram.MEMORY_TYPE) 
        return `This motherboard only supports ${mobo.MEMORY_TYPE} type memories, please choose a ${mobo.MEMORY_TYPE} memory or choose an other motherboard!`
        return false
    },
    vgaCaseSizeCheck : function(vga, pcCase) {
        if (vga.CARD_LENGTH !== undefined && pcCase.VGA_MAX_LENGTH !== undefined && parseInt(pcCase.VGA_MAX_LENGTH) < parseInt(vga.CARD_LENGTH)) 
        return `This PC case is supports maximum ${pcCase.VGA_MAX_LENGTH} length graphic cards, your selected graphic cards length is ${vga.CARD_LENGTH}, please choose an other PC case or a shorter graphic card!`
        return false
    },
    vgaPsuPowerCheck : function(vga, psu) {
        if (vga.RECOMMENDED_PSU !== undefined && psu.POWER !== undefined && parseInt(psu.POWER) < parseInt(vga.RECOMMENDED_PSU)) 
        return `The selected power supply unit (PSU) has ${psu.POWER} of power, your selected graphic card needs at least ${vga.RECOMMENDED_PSU} of power, please select an other power supply unit, or graphic card!`
        return false
    },
    caseCoolerFanCheck : function(pcCase, cooler, fanArray) {
        let msg = ""
        if (cooler.COOLING_TYPE !== undefined && cooler.COOLING_TYPE === "LIQUID") msg = ` Note that your selected processor cooler's radiator needs free slots too, check the processor cooler's additional information about how many free slots required to properly attach this processor cooler!`
        let fanCounterOverall = 0
        let fanCounter120mm = 0
        let fanCounter140mm = 0
        let fanCounter200mm = 0
        if (cooler.SLOT_COUNTER_120MM !== undefined && cooler.SLOT_COUNTER_120MM > 0) fanCounter120mm+= cooler.SLOT_COUNTER_120MM
        if (cooler.SLOT_COUNTER_140MM !== undefined && cooler.SLOT_COUNTER_140MM > 0) fanCounter140mm+= cooler.SLOT_COUNTER_140MM
        fanArray.map(fan => fan.selected.SIZE !== undefined && fan.selected.SIZE.MM120 > 0 ? fanCounter120mm+= fan.selected.SIZE.MM120 : "")
        fanArray.map(fan => fan.selected.SIZE !== undefined && fan.selected.SIZE.MM140 > 0 ? fanCounter140mm+= fan.selected.SIZE.MM140 : "")
        fanArray.map(fan => fan.selected.SIZE !== undefined && fan.selected.SIZE.MM200 > 0 ? fanCounter200mm+= fan.selected.SIZE.MM200 : "")
        fanCounterOverall = fanCounter120mm+fanCounter140mm+fanCounter200mm
        if (pcCase.MAX_FAN_PLACE !== undefined && fanCounterOverall > pcCase.MAX_FAN_PLACE) return `This pc case support maximum ${pcCase.MAX_FAN_PLACE} of case fans, please select less case fans or an other pc case!`+msg
        if (pcCase.MAX_FAN_PLACE !== undefined && fanCounter120mm > pcCase.FAN_PLACE.MM120) return `This pc case support maximum ${pcCase.FAN_PLACE.MM120} of 120mm case fans, please select less case fans or an other pc case!`+msg
        if (pcCase.MAX_FAN_PLACE !== undefined && fanCounter140mm > pcCase.FAN_PLACE.MM140) return `This pc case support maximum ${pcCase.FAN_PLACE.MM140} of 140mm case fans, please select less case fans or an other pc case!`+msg
        if (pcCase.MAX_FAN_PLACE !== undefined && fanCounter200mm > pcCase.FAN_PLACE.MM200) return `This pc case support maximum ${pcCase.FAN_PLACE.MM200} of 200mm case fans, please select less case fans or an other pc case!`+msg
        return false
    },
    moboSataSlotCheck : function(mobo, ssdArray, hddArray) {
        let sataCounter = 0
        ssdArray.map(ssd => ssd.selected.CONNECTION_TYPE !== undefined && (ssd.selected.CONNECTION_TYPE === "SATA3" || ssd.selected.CONNECTION_TYPE === "SATA2") ? sataCounter++ : "")
        hddArray.map(hdd => hdd.selected.CONNECTION_TYPE !== undefined && (hdd.selected.CONNECTION_TYPE === "SATA3" || hdd.selected.CONNECTION_TYPE === "SATA2") ? sataCounter++ : "")
        if (mobo.SATA_SLOT_FULL !== undefined && sataCounter > mobo.SATA_SLOT_FULL) return `This motherboard supports maximum ${mobo.SATA_SLOT_FULL} SATA connected devices, please select less SSD or HDD that requires SATA connection, or choose an other motherboard!`
        return false
    },
    caseSsdPlaceCheck : function(pcCase, ssdArray) {
        let ssdCounter = 0
        ssdArray.map(ssd => ssd.selected.CASE_SLOT !== undefined && ssd.selected.CASE_SLOT === "2.5" ? ssdCounter++ : "")
        if (pcCase.SSD_PLACE !== undefined && ssdCounter > pcCase.SSD_PLACE) return `This pc case has maximum ${pcCase.SSD_PLACE} SSD place, please select less 2.5" SSD or choose an other pc case!`
        return false
    },
    caseHddPlaceCheck : function(pcCase, hddArray) {
        let hddCounter = 0
        hddArray.map(hdd => hdd.selected.CASE_SLOT !== undefined && hdd.selected.CASE_SLOT === "3.5" ? hddCounter++ : "")
        if (pcCase.HDD_PLACE !== undefined && hddCounter > pcCase.HDD_PLACE) return `This pc case has maximum ${pcCase.HDD_PLACE} HDD place, please select less 3.5" HDD or choose an other pc case!`
        return false
    },
    moboM2PlaceCheck : function(mobo, ssdArray) {
        let m2Counter = 0
        ssdArray.map(ssd => ssd.selected.CONNECTION_TYPE !== undefined && ssd.selected.CONNECTION_TYPE === "M.2" ? m2Counter++ : "")
        if (mobo.M_2_SLOT !== undefined && m2Counter > mobo.M_2_SLOT) return `This motherboard supports maximum ${mobo.M_2_SLOT} of M.2 SSD, please select less M.2 SSD or choose an other motherboard!`
        return false
    }
}

module.exports = errorCheckers