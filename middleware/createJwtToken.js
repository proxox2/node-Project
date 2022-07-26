const config=require('../config/config.js');
const AuthService=require("../api/Services/AuthService.js");


// import config from '../config/config.js';
// import AuthService from "../api/Services/AuthService.js";

module.exports= {
    createToken: async function (req, res, next) {
      const { email, password } = req;
          
      const tokenPayload = {
        iss: config.iss,
        sub: email,
        password:password
      }
      const tokenData =  await AuthService.createToken(tokenPayload);
      const token = tokenData.token;
      req["token"] = token;
      console.log("JWT TOKEN CREATION  Success");
      next();
    }
  };
  