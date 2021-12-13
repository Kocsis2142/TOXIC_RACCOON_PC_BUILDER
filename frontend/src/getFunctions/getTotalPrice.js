function getTotalPrice(array, setTotalPrice) {
    let initialValue = 0
    setTotalPrice(array.reduce(
        (accumulator, currentValue) => accumulator + parseInt(currentValue.selected.PRICE.split(" ").join(""))
        , initialValue
    ))
}

export default getTotalPrice