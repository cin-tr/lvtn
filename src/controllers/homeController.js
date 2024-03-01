import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};

let getAboutMe = (req, res) => {
    return res.render("aboutme.ejs");
};

let getCrud = (req, res) => {
    return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("post CRUD from server");
};

module.exports = {
    getHomePage: getHomePage,
    getAboutMe: getAboutMe,
    getCrud: getCrud,
    postCRUD: postCRUD,
};
