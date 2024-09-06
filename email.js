const nodemailer = require("nodemailer");
// Paso 1
function enviarEmail(to, subject, text) {
    const mensaje = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60vh;
            }
            .container {
                background: url('https://github.com/Yistler/SkatePark/blob/main/public/img/login.jpg?raw=true') no-repeat center center fixed;
                background-size: cover;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                width: 100%;
                text-align: center;
            }
            .logo {
                max-width: 150px;
                margin-bottom: 20px;
            }
            h1 {
                color: white;
            }
            p {
                color: white;
                font-size: 16px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="https://raw.githubusercontent.com/Yistler/SkatePark/main/public/img/logo_blanco.png" alt="Logo" class="logo">
            <h1>Recuperar password</h1>
            <p>Ingresa al siguiente link:</p>
            <a href="${text}" style="color: #1a73e8; text-decoration: underline;">${text}</a>
            <p>Si no lo has solicitado ignora el mensaje</p>
        </div>
    </body>
    </html>
    `;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yokrayd@gmail.com',
            pass: 'ldjjttmydridpwck',
        },
    })
    let mailOptions = {
        from: 'yokrayd@gmail.com',
        to,
        subject,
        html: mensaje,
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(err)
        if (data) console.log(data)
    })
}
module.exports = { enviarEmail };    