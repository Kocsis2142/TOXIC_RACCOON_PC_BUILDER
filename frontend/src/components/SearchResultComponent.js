import { useState, useEffect } from 'react'
import leftArrowIcon from '../icons/chevron-left-solid.svg'
import rightArrowIcon from '../icons/chevron-right-solid.svg'

function SearchResultComponent({searchInput, componentTypesList, setComponentTypesList}) {

    const [ filteredResultList, setFilteredResultList ] = useState([])
    const [ firstShownResultIndex, setFirstShownResultIndex ] = useState(0)
    const [ lastShownResultIndex, setLastShownResultIndex ] = useState(5)

    const searchAllElement = () => {
        let resultList = []
        let keywords = searchInput.toLowerCase().split(" ")
        for (let element of componentTypesList) {
            let filteredList = element.type.filter(component => 
                keywords.every(keyword => component.TYPE.toLowerCase().includes(keyword)))
            resultList.push(...filteredList)
        }
        return resultList
    }

    useEffect(() => {
        if (searchInput.length > 2) {
            setFilteredResultList(searchAllElement)
            setFirstShownResultIndex(0)
            setLastShownResultIndex(5)
        }
    }, [searchInput]) // eslint-disable-line react-hooks/exhaustive-deps

    const paginatorLeftHandler = () => {
        if (firstShownResultIndex >= 5 && lastShownResultIndex >= 10) {
            setFirstShownResultIndex(firstShownResultIndex-5)
            setLastShownResultIndex(lastShownResultIndex-5)
        }
    }

    const paginatorRightHandler = () => {
        if (firstShownResultIndex <= filteredResultList.length-5 && lastShownResultIndex <= filteredResultList.length-1) {
            setFirstShownResultIndex(firstShownResultIndex+5)
            setLastShownResultIndex(lastShownResultIndex+5)
        }
    }

    const setComponentIntoList = (resultComponent) => {
        let newComponentTypeList = [...componentTypesList]
        newComponentTypeList.map(component => !component.keyWord.includes("EXTRA") && component.type.includes(resultComponent) ? component.selected = resultComponent : "")
        setComponentTypesList(newComponentTypeList)
    }
    
    return (
        <div>
            {filteredResultList.length > 0 && <button className="paging-btn" onClick={paginatorLeftHandler}>🡀</button>}
            <div className="search-result-cards">
                {filteredResultList.slice(firstShownResultIndex, lastShownResultIndex).map((result, index) => 
                    <div key={index} className="search-result-card">
                        <h1 className="search-result-type">{result.TYPE}</h1>
                        <h1 className="search-result-price">{result.PRICE}</h1>
                        <div className="search-result-image-container"><img className="search-result-image" src={result.IMG} alt="result_component_image"/></div>
                        <button className="use-this-component-btn" onClick={()=>setComponentIntoList(result)}>Use this Compoenent</button>
                    </div>)}
            </div>
            {filteredResultList.length > 0 && <button className="paging-btn" onClick={paginatorRightHandler}>🡂</button>}
        </div>
    )
}

export default SearchResultComponent