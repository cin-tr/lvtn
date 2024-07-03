require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"YourHealth 🏥" <hoaitrinh2106@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thư xác nhận đặt lịch khám bệnh thành công! ✔", // Subject line
        // text: "Hello world?", // plain text body
        html: getBodyHTMLEmail(dataSend), // html body
    });
};

let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Email này để xác nhận bạn đã thực hiện đặt lịch trên website của chúng tôi.</p>
        <p>Thông tin đặt lịch của bạn bao gồm những thông tin sau:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Vui lòng kiểm tra lại những thông tin trên và xác nhận bằng cách nhấn vào đường link sau để hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click Here</a>
        </div>
        <div>Xin chân thành cảm ơn!</div>
        `;
    }

    if (dataSend.language === "en") {
        result = `
        <h3>Hello ${dataSend.patientName}!</h3>
        <p>This email is to confirm that you have made an appointment on our website.</p>
        <p>Your booking information includes the following information:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>Please review the above information and confirm by clicking on the following link to complete the medical appointment booking procedure.</p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click Here</a>
        </div>
        <div>Thank you very much!</div>
        `;
    }

    return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Email này để xác nhận bạn đã khám bệnh thành công thông qua việc đặt lịch trên Website của chúng tôi.</p>
        <p>Thông tin đơn thuốc và hoá đơn của bạn được gửi trong file đính kèm.</p>
        
        <div>Xin chân thành cảm ơn!</div>
        `;
    }

    if (dataSend.language === "en") {
        result = `
        <h3>Hello ${dataSend.patientName}!</h3>
        <p>This email is to confirm your successful medical examination by making an appointment on our Website.</p>
        <p>Your prescription and invoice information is sent in the attached file.</p>
        
        <div>Thank you very much!</div>
        `;
    }

    return result;
};

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            let info = await transporter.sendMail({
                from: '"YourHealth 🏥" <hoaitrinh2106@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả khám bệnh! ✔", // Subject line
                // text: "Hello world?", // plain text body
                html: getBodyHTMLEmailRemedy(dataSend), // html body
                attachments: [
                    {
                        filename: `remedy-${
                            dataSend.patientId
                        }-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: "base64",
                    },
                ],
            });

            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    getBodyHTMLEmail: getBodyHTMLEmail,
    getBodyHTMLEmailRemedy: getBodyHTMLEmailRemedy,
    sendAttachment: sendAttachment,
};
