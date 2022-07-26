const express=require("express");
const userController=require('./Controllers/adminUser')
const user =express.Router();
user.use("/user",userController.router);

// import express from "express";
// import userController from "./controllers/routes.js";

// const user = express.Router();
// user.use("/user", userController);


module.exports={
    user
};
