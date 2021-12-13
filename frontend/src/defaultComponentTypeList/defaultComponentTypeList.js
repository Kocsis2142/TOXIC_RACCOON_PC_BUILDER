import defaultImage from '../images/default_pic.jpeg'
import { v4 as uuidv4 } from 'uuid';

export const defaultType = "Please choose component from the dropdown menu!"
export const defaultPrice = "0 Ft"

export function getDefaultComponentTypeList(serverData) {
    return [ 
        {name : "Processor", keyWord : "CPU", type : serverData.CPU_AMD.concat(serverData.CPU_INTEL), id : uuidv4(), selected : {TYPE : defaultType, PRICE : defaultPrice, IMG : defaultImage, DEFAULT : true}, msg : {warning : 0, error : 0}},
        {name : "Motherboard", keyWord : "MOBO", type : serverData.MOBO_AMD.concat(serverData.MOBO_INTEL), id : uuidv4(), selected : {TYPE : defaultType, PRICE : defaultPrice, IMG : defaultImage, DEFAULT : true}, msg : {warning : 0, error : 0}}, 
        {name : "Cooler", keyWord : "COOLER", type : serverData.CPU_COOLER, id : uuidv4(), selected : {TYPE : defaultType, PRICE : defaultPrice, IMG : defaultImage, DEFAULT : true}, msg : {warning : 0, error : 0}}, 
        {name : "Memory", keyWord : "RAM", type : serverData.RAM, id : uuidv4(), selected : {TYPE : defaultType, PRICE : defaultPrice, IMG : defaultImage, DEFAULT : true}, msg : {warning : 0, error : 0}}, 
        {name : "Graphic Card", keyWord : "GPU", type : serverData.VGA, id : uuidv4(), selected : {TYPE : defaultType, PRICE : defaultPrice, IMG : defaultImage, DEFAULT : true}, msg : {warning : 0, error : 0}}, 
        {name : "Case", keyWord : "CASE", type : serverData.CASE, id : uuidv4(), selected : {TYPE : defaultType, PRICE : defaultPrice, IMG : defaultImage, DEFAULT : true}, msg : {warning : 0, error : 0}}, 
        {name : "PSU", keyWord : "PSU", type : serverData.PSU, id : uuidv4(), selected : {TYPE : defaultType, PRICE : defaultPrice, IMG : defaultImage, DEFAULT : true}, msg : {warning : 0, error : 0}}, 
        {name : "SSD", keyWord : "SSD", type : serverData.SSD, id : uuidv4(), selected : {TYPE : defaultType, PRICE : defaultPrice, IMG : defaultImage, DEFAULT : true}, msg : {warning : 0, error : 0}}, 
        {name : "HDD", keyWord : "HDD", type : serverData.HDD, id : uuidv4(), selected : {TYPE : defaultType, PRICE : defaultPrice, IMG : defaultImage, DEFAULT : true}, msg : {warning : 0, error : 0}}, 
        {name : "Fan", keyWord : "FAN", type : serverData.FAN, id : uuidv4(), selected : {TYPE : defaultType, PRICE : defaultPrice, IMG : defaultImage, DEFAULT : true}, msg : {warning : 0, error : 0}}
    ]
}



