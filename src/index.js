require('dotenv').config()

//configurar listening del puerto para ver el proyecto en un navegador
const express = require ('express')
const port = 3000 || process.env.port

// librerias de sendgrid para envio de correos electronicos 
const email = require('./email')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//librerias twilio para mensajes de texto
const accountSID = process.env.TWILIO_ACCOUNT_SID
const authTOKEN = process.env.TWILIO_AUTH_TOKEN

// para realizar pruebas con postman
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//creacion de la ruta del proyecto
//http://localhost:3000/
app.get('/',(req,res)=>{
    res.json({message: 'Success'})
})

//para poder ver la ruta en el navegador, se activa el listening()
app.listen(port,()=>{
    console.log(`Accede al sitio web dando clic aquí: http://localhost:${port}`)
})

app.post('/api/email/confirmacion',async(req,res,next)=>{
    //llamamos la funcion que estara en la clase email.js y que requiere de unos
    //parametros que ingresan por postman
    try{
        res.json(await email.sendOrder(req.body))
    }catch(err){
        next(err)
    }
})

//validar el codigo que nos devuelve la ejecucion del codigo, en caso de error
//mostrar todo el contenido del error
app.use((err, req, res, next)=>{
    //100
    //200
    //300
    //400
    //500
     const statusCode = err.statusCode || 500
     console.error(err.message, err.stack)
     res.status(statusCode).json({'message': error.message})
     return
    })
   
function getMessage (){
    const body = 'mensaje enviado el 21/11/2021'
    return{
        to: 'afquinterog@unal.edu.co', // Change to your recipient
        from: 'andresfqg16@gmail.com', // Change to your verified sender
        subject: 'Prueba reto sendgrid',
        text: body,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div> class = "container section"
                <label><strong>PRUEBA</strong></label>
                <img src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500">
            </div>
        </body>
        </html>`
    }
}

async function Sendemail(){
    try{
        await sgMail.send(getMessage())
        console.log('Correo ha sido enviado')
    }catch(err){
        console.error('No se pudo enviar mensaje')
        console.error(err)
        if(err.response) console.error(err.response.body)
    }
}

(async()=>{
    console.log('Enviando correo electronico')
    await SendEmail
})

//const client = require('twilio')(accountSID, authTOKEN)

//client.messages.create({
    //body: 'Bienvenido a la mitad del ciclo 4 MINTIC',
    //from: '+19122446086',
    //to: '+573146152718'
//}).then(message => console.log(`mensaje enviado ${message.sid}`))
