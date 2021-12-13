const nodemailer = require('nodemailer')

const sendMail = (req, res) => {

    const orderDetailes = {
        bagTotalPrice: req.body.bagTotalPrice,
        currentBag: req.body.currentBag,
        shippingDetailes: req.body.shippingDetailes,
        billingDetailes: req.body.billingDetailes,
        takeOverType: req.body.takeOverType,
        paymentOption: req.body.paymentOption,
        additionalInfo: req.body.additionalInfo
      }
    
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'toxicraccoontestmail@gmail.com',
          pass: process.env.EMAIL_PASS
        }
      });
      
    
      let mailOptionsForUser = {
        from: 'toxicraccoontestmail@gmail.com',
        to: orderDetailes.shippingDetailes.ordererEmail,
        subject: 'Order Completed ' + new Date(),
        html: 
        `<h3>Dear ${orderDetailes.shippingDetailes.ordererName}!</h3>
        <h4>This is an order confirmation from the Toxic Raccoon, your order is being process!</h4>
        <p>Your order detailes: </p>
        <p>Full price: ${orderDetailes.bagTotalPrice} Ft</p>
        ${orderDetailes.currentBag.map(item => `<div><p>Build name: ${item.name}</p><p>${item.price} Ft</p><img src=${item.selectedComponents.find(comp => comp.keyWord === "CASE").selected.IMG} alt="ordered_build_img" width="300px"><ul>${item.selectedComponents.map(component => `<li>${component.selected.TYPE}</li>`)}</ul></div>`)}
        <p>Orderer name: ${orderDetailes.shippingDetailes.ordererName}</p>
        <p>Orderer address: ${orderDetailes.shippingDetailes.ordererCountry} ${orderDetailes.shippingDetailes.ordererPostCode} ${orderDetailes.shippingDetailes.ordererCity} ${orderDetailes.shippingDetailes.ordererAddress}</p>
        <p>Takeover service: ${orderDetailes.takeOverType}</p>
        <p>Payment service: ${orderDetailes.paymentOption}</p>
        <h5>Thank you for using our services! Best wishes from the Raccoon!</h5>`
      };
    
      let mailOptionsForAdmin = {
        from: 'toxicraccoontestmail@gmail.com',
        to: 'toxicraccoontestmail@gmail.com',
        subject: 'New order ' + new Date(),
        html: 
        `<p>Order detailes: </p>
        <p>Full price: ${orderDetailes.bagTotalPrice} Ft</p>
        ${orderDetailes.currentBag.map(item => `<div><p>Build name: ${item.name}</p><p>${item.price} Ft</p><img src=${item.selectedComponents.find(comp => comp.keyWord === "CASE").selected.IMG} alt="ordered_build_img" width="300px">${item.selectedComponents.map(component => `<ul><li>${component.selected.TYPE}</li><li>${component.selected.PRICE}</li><li><img src=${component.selected.IMG} alt="ordered_component_img" width="120px"></li></ul>`)}</div>`)}
        <p>Orderer name: ${orderDetailes.shippingDetailes.ordererName}</p>
        <p>Orderer address: ${orderDetailes.shippingDetailes.ordererCountry} ${orderDetailes.shippingDetailes.ordererPostCode} ${orderDetailes.shippingDetailes.ordererCity} ${orderDetailes.shippingDetailes.ordererAddress}</p>
        <p>Orderer e-mail: ${orderDetailes.shippingDetailes.ordererEmail}</p>
        <p>Orderer phone: ${orderDetailes.shippingDetailes.ordererPhone}</p>
        <p>Takeover service: ${orderDetailes.takeOverType}</p>
        <p>Payment service: ${orderDetailes.paymentOption}</p>
        <p>Additional info: ${orderDetailes.additionalInfo}</p>`
      };
    
      transporter.sendMail(mailOptionsForUser, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
      transporter.sendMail(mailOptionsForAdmin, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

module.exports = {
    sendMail
}