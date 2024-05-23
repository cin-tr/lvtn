require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Chin 👻" <hoaitrinh2106@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thư xác nhận đặt lịch khám bệnh thành công! ✔", // Subject line
        // text: "Hello world?", // plain text body
        html: `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Emai này để xác nhận bạn đã thực hiện đặt lịch trên website của chúng tôi.</p>
        <p>Thông tin đặt lịch của bạn bao gồm những thông tin sau:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Vui lòng kiểm tra lại những thông tin trên và xác nhận bằng cách nhấn vào đường link sau để hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click Here</a>
        </div>
        <div>Xin chân thành cảm ơn!</div>
        `, // html body
    });
};

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
};
