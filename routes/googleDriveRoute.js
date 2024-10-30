import express from "express";
import googleDriveController from "../controller/googleDrive.js";

// import dotenv from "dotenv";

const driveRouter = express.Router();

driveRouter.post('/uploadImg',googleDriveController.uploadImg);

export default driveRouter;