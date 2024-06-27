import { where } from "sequelize";
import db from "../models/index";

let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing Parameter!",
                });
            } else {
                await db.History.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });
                resolve({
                    errCode: 0,
                    errMessage: "OK!",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.History.findAll({});
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = new Buffer(item.image, "base64").toString(
                        "binary"
                    );
                    return item;
                });
            }
            resolve({
                errCode: 0,
                errMessage: "OK!",
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};
let getDetailHandbookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing Parameter!",
                });
            } else {
                let data = await db.History.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: [
                        "name",
                        "descriptionHTML",
                        "descriptionMarkdown",
                    ],
                });
                resolve({
                    errCode: 0,
                    errMessage: "OK!",
                    data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createHandbook: createHandbook,
    getAllHandbook: getAllHandbook,
    getDetailHandbookById: getDetailHandbookById,
};
