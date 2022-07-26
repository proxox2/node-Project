const jwt=require("jsonwebtoken");
// const config =require("../..config/config.js");



const AuthService = {};

AuthService.createToken = async (data) =>{
  try {
      
    const token =  jwt.sign(data,config.privateKey,{expiresIn:'60m'});
    return { token }
  } catch (ex) {
    console.log(ex)
  }
}



module.exports={ AuthService};
