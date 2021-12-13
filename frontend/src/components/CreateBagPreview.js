import { useHistory } from 'react-router-dom'
import logo from '../images/toxic_logo.png'

function CreateBagPreview({currentBag, setCurrentBag}) {

    const history = useHistory();

    const bagTotalPrice = () => {
        let initialValue = 0
        return currentBag.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price
            , initialValue
        )
    }

    const removeItemHandler = (removableItem) => {
        let newBag = currentBag.filter(item => item.id !== removableItem.id)
        setCurrentBag(newBag)
    }

    const removeAllItem = () => {
        setCurrentBag([])
    }

    const detailedBagBtnHandler = () => {
        history.push(`/detailedBag`);
        window.scrollTo(0, 0)
    }

    return (
        <div className="bag-preview">
            <img width="100px" src={logo} alt="toxic_logo"></img>
            <p>Total: {bagTotalPrice()} Ft</p>
            <ul>
                {currentBag.map((item, i) => 
                <li key={i}>
                    <ul>
                        <li>{item.name}</li>
                        <li>{item.price} Ft</li>
                        <li><img alt="prew_img" width="100px" src={item.selectedComponents.find(comp => comp.keyWord === "CASE").selected.IMG}/></li>
                        <li className="remove-btn hover-btn" onClick={()=>removeItemHandler(item)}>Drop this item</li>
                    </ul>
                </li>)}
            </ul>
            <button className="hover-btn" onClick={detailedBagBtnHandler}>Detailed Bag</button>
            <button className="hover-btn" onClick={removeAllItem}>Drop bag</button>
        </div>
    )
}

export default CreateBagPreview