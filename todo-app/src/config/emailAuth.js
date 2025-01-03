const nodemailer = require('nodemailer');

exports.emailAuthentication = async (To, subject, html) => {
    return await new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_AUTH,
                pass: process.env.PASSWORD_AUTH
            }
        });

        let mailOptions = {
            from: `"Task Manager Todo App" <${process.env.NEXT_PUBLIC_EMAIL_AUTH}>`,
            to: To,
            subject: subject,
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(false);
            } else {
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                resolve(true);
            }
        });
    });
};