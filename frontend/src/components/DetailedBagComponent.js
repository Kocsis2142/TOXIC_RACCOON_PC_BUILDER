import { useState } from 'react'
import CreateItemDetailRow from './CreateItemDetaileRow'
import sendEmail from '../data_fetch/sendEmailFetch'
import logo from '../images/toxic_logo.png'

function DeatiledBagComponent({currentBag, setCurrentBag}) {

    const [ shippingDetailesIsVisible, setShippingDetailesIsVisible ] = useState(false)
    const [ takeOverType, setTakeOverType ] = useState("")
    const [ paymentOption, setPaymentOption ] = useState("")
    const [ additionalInfo, setAdditionalInfo ] = useState("")
    const [ shippingDetailes, setShippingDetailes ] = useState({
        ordererName : "",
        ordererEmail: "",
        ordererPhone: "",
        ordererCountry: "",
        ordererPostCode: "",
        ordererCity: "",
        ordererAddress: ""
    })
    const [ billingDetailes, setBillingDetailes ] = useState({
        billingName : "",
        billingEmail: "",
        billingPhone: "",
        billingCountry: "",
        billingPostCode: "",
        billingCity: "",
        billingAddress: ""
    })
    const [ resultMsg, setResultMsg ] = useState("")
    const [ billingInfoCheckboxIsChecked, setBillingInfoCheckboxIsChecked ] = useState(false)

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

    const shippingDetailesVisibility = () => {
        shippingDetailesIsVisible ? setShippingDetailesIsVisible(false) : setShippingDetailesIsVisible(true)
    }
    
    const completeOrderButtonHandler = () => {
        if (takeOverType !== "" && paymentOption !== "" && Object.values(shippingDetailes).filter(val => val === "").length === 0 && (Object.values(billingDetailes).filter(val => val === "").length === 0 || billingInfoCheckboxIsChecked)) {
            if (billingInfoCheckboxIsChecked)  sendEmail(shippingDetailes, shippingDetailes, takeOverType, paymentOption, additionalInfo, currentBag, bagTotalPrice()) 
            else sendEmail(shippingDetailes, billingDetailes, takeOverType, paymentOption, additionalInfo, currentBag, bagTotalPrice()) 
            setResultMsg("Your order is successful, you got an e-mail with the ordering properties.")
            setCurrentBag([])
        } else {
            setResultMsg("Fill every cell before ordering!")
        }
    }

    if (currentBag.length !== 0) { return (
        <div className="detailed-bag-component">
            <img width="150px" src={logo} alt="toxic_logo"></img>
            <p>Total: {bagTotalPrice()} Ft</p>
            {currentBag.map((item, index) => <CreateItemDetailRow key={index} item={item} removeItemHandler={removeItemHandler}/>)}
            <button className="hover-btn drop-bag-btn" onClick={removeAllItem}>Drop bag</button>
            <button className="hover-btn" onClick={shippingDetailesVisibility}>Shipping detailes</button>
            {shippingDetailesIsVisible && 
                <div className="shipping-info">
                    <p>Delivery services: </p>
                    <select onChange={(e)=>setTakeOverType(e.target.value)}>
                        <option value="">Choose</option>
                        <option>Superfast + Supercool delivery bros - 1690 Ft</option>
                        <option>Sloth delivery service - 1090 Ft</option>
                    </select>
                    <p>Payment: </p>
                    <select onChange={(e)=>setPaymentOption(e.target.value)}>
                        <option value="">Choose</option>
                        <option>In Cash</option>
                        <option>With Bankcard</option>
                    </select>
                    <p>Shipping detailes: </p>
                    <div>
                    <input placeholder="Orderer name" onChange={(e)=>setShippingDetailes({...shippingDetailes, ordererName : e.target.value})}/>
                    <input placeholder="E-mail" onChange={(e)=>setShippingDetailes({...shippingDetailes, ordererEmail : e.target.value})}/>
                    <input placeholder="Phone" onChange={(e)=>setShippingDetailes({...shippingDetailes, ordererPhone : e.target.value})}/>
                    <input placeholder="Country" onChange={(e)=>setShippingDetailes({...shippingDetailes, ordererCountry : e.target.value})}/>
                    <input placeholder="Post number" type="number" onChange={(e)=>setShippingDetailes({...shippingDetailes, ordererPostCode : e.target.value})}/>
                    <input placeholder="City" onChange={(e)=>setShippingDetailes({...shippingDetailes, ordererCity : e.target.value})}/>
                    <input placeholder="Street / House number / Door number" onChange={(e)=>setShippingDetailes({...shippingDetailes, ordererAddress : e.target.value})}/>
                    </div>
                    <p>Billing detailes: </p>
                    <div>
                    <input type="checkbox" checked={billingInfoCheckboxIsChecked} onChange={()=>setBillingInfoCheckboxIsChecked(!billingInfoCheckboxIsChecked)}/><p>Same as shipping detailes</p>
                    <input value={billingInfoCheckboxIsChecked ? shippingDetailes.ordererName : billingDetailes.billingName} placeholder="Billing name" onChange={(e)=>setBillingDetailes({...billingDetailes, billingName : e.target.value})}/>
                    <input value={billingInfoCheckboxIsChecked ? shippingDetailes.ordererEmail : billingDetailes.billingEmail} placeholder="E-mail" onChange={(e)=>setBillingDetailes({...billingDetailes, billingEmail : e.target.value})}/>
                    <input value={billingInfoCheckboxIsChecked ? shippingDetailes.ordererPhone : billingDetailes.billingPhone} placeholder="Phone" onChange={(e)=>setBillingDetailes({...billingDetailes, billingPhone : e.target.value})}/>
                    <input value={billingInfoCheckboxIsChecked ? shippingDetailes.ordererCountry : billingDetailes.billingCountry} placeholder="Country" onChange={(e)=>setBillingDetailes({...billingDetailes, billingCountry : e.target.value})}/>
                    <input value={billingInfoCheckboxIsChecked ? shippingDetailes.ordererPostCode : billingDetailes.billingPostCode} placeholder="Post number" type="number" onChange={(e)=>setBillingDetailes({...billingDetailes, billingPostCode : e.target.value})}/>
                    <input value={billingInfoCheckboxIsChecked ? shippingDetailes.ordererCity : billingDetailes.billingCity} placeholder="City" onChange={(e)=>setBillingDetailes({...billingDetailes, billingCity : e.target.value})}/>
                    <input value={billingInfoCheckboxIsChecked ? shippingDetailes.ordererAddress : billingDetailes.billingAddress} placeholder="Street / House number / Door number" onChange={(e)=>setBillingDetailes({...billingDetailes, billingAddress : e.target.value})}/>
                    </div>
                    <p>Additional Information for the shop or the delivery service: </p>
                    <textarea onChange={(e)=>setAdditionalInfo(e.target.value)}></textarea>
                    <button onClick={completeOrderButtonHandler}>Complete order</button>
                    <p>{resultMsg}</p>
                </div>}
        </div>
    ) } else {
        return (
            <div>
                <p>{resultMsg}</p>
                <p>Your bag is empty.</p>
            </div>
        )
    }
}

export default DeatiledBagComponent