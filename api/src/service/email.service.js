import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.HOST_PORT,
    secure: false,
    auth: {
        user: process.env.HOST_USER,
        pass: process.env.HOST_PASS
    }
});

const sender = {
    name: 'UX-Commerce',
    email: 'ux-commerce@email.com' 
};

const receiver = {
    email: process.env.HOST_USER || 'random@person.com'
}

const mailContent = {
    subject: 'Confirme sua conta na UX-Commerce',
    text: 'Obrigado por se cadastrar na nossa plataforma.',
    html: `
      <h2>Olá!</h2>
      <p>Obrigado por se cadastrar na nossa plataforma.
    `
}

async function sendConfirmationEmail(transporter, sender, receiver, mailContent) {
    const mail = await transporter.sendMail({
        from: `"${sender.name}" ${sender.email}`,
        to: `${receiver.email}`,
        subject: `${mailContent.subject}`,
        text: `${mailContent.text}`,
        html: `${mailContent.html}`,
    });

    console.log('------------------------------------------------------------------------------------------------------------------------------------');
    console.log(`E-mail de confirmação enviado (Simulado): ${nodemailer.getTestMessageUrl(mail)}`);
    console.log('------------------------------------------------------------------------------------------------------------------------------------');
}

export async function mail() {
    try {
        await sendConfirmationEmail(transporter, sender, receiver, mailContent)
    } catch (error) {
        console.log(error);
    }
}