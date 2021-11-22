const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailConfirmationHTML(customerName, orderNro){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    <tr>
    <td style="padding:30px;text-align:center;font-size:12px;background-color:#404040;color:#cccccc;">
        <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">Bienvenido a nuestro sistema de inventarios</h1>
        <p style="margin:0;">A continuación encontrara el registro de los productos que han ingresado y salido de su inventario en los ultimos 30 dias.</p>
        <p style="margin:0;">Para mayor informacion comuniquese con su agente
    </td>
    </tr>
    <label><strong>INVENTARIOS</strong></label>
        <div> 
            <img src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            width="400" height="341" >
        </div>
        <tr>
        <td style="padding:30px;text-align:center;font-size:12px;background-color:#404040;color:#cccccc;">
            [Gracias por Utilizar nuestra plataforma]
        </td>
    </tr>
    </body>
    </html>`    
}

function getMessage(emailParams){
    return{
        to:emailParams.toEmail,
        from:'andresfqg16@gmail.com',
        subject:'Actualizacion productos del inventario',
        text: 'Hola , te enviamos las imagenes de los productos comprados y la factura con numero. Gracias por su compra',
        html: sendEmailConfirmationHTML(emailParams.customerName, emailParams.orderNro)
    }
}

async function sendOrder(emailParams){
    try{
        await sgMail.send(getMessage(emailParams))
        return {message: 'Confirmacion de compra enviada'}
    }catch(err){
        const message = 'No se pudo enviar la orden de compra. valide los errores'
        console.error(message)
        console.error(err)
        if(err.response) console.error(err.response.body)
        return{message}
    }
} 

module.exports={
    sendOrder
}
