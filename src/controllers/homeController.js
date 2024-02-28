import db from "../models/index";

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

module.exports = {
    getHomePage: getHomePage,
    getAboutMe: getAboutMe,
};
