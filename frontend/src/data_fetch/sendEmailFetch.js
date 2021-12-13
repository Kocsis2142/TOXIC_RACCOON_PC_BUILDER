function sendEmail(shippingDetailes, billingDetailes, takeOverType, paymentOption, additionalInfo, currentBag, bagTotalPrice) {

    fetch(`http://localhost:4000/SENDMAIL`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bagTotalPrice: bagTotalPrice,
          currentBag: currentBag,
          shippingDetailes: shippingDetailes,
          billingDetailes: billingDetailes,
          takeOverType: takeOverType,
          paymentOption: paymentOption,
          additionalInfo: additionalInfo
        })})
    }
    
    export default sendEmail