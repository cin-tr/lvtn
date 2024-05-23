import { raw } from "body-parser";
import db from "../models/index";
import { where } from "sequelize";
require("dotenv").config();
import _, { defaults } from "lodash";
import emailService from "./emailService";

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing Parameter!",
                });
            } else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: "Hoai Trinh",
                    time: "8:00 - 9:00 Chu Nhat 23/05/2024",
                    doctorName: "Nguyen Thi A",
                    redirectLink: "https://bookingcare.vn/",
                });

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3",
                    },
                });

                //create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        },
                    });
                }

                resolve({
                    errCode: 0,
                    errMessage: "Save Infor Patient Succeed!",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    postBookAppointment: postBookAppointment,
};
