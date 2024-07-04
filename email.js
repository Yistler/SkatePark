const nodemailer = require("nodemailer");
// Paso 1
function enviarEmail(to, subject, text) {
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
        text,
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(err)
        if (data) console.log(data)
    })
}
module.exports = { enviarEmail };    