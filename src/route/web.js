import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/aboutme", homeController.getAboutMe);
    router.get("/crud", homeController.getCrud);

    router.post("/post-crud", homeController.postCRUD);

    return app.use("/", router);
};

module.exports = initWebRoutes;
