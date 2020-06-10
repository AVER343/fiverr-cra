const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(`SG._ZwdYNN-TH-2_gfdijBw_g.oRQg_KiptgHL2QIOEISdYgSnhCBhkCI-MXXukSZwt8Q`)

const sendWelcomeEmail =async (id,email) => {
    try{
        await sgMail.send({
            to: `artis17771@gmail.com`, 
            from: 'ankushvermagb@gmail.com',
            subject: `The email to  ${email}`,
            text: `http://localhost:3000/passenger/${id}`
        })
    }
    catch(e)
    {
        console.log(e)
        throw new Error()
        return 
    }
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'AVER343',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}