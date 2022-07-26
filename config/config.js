
const path=require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

//const env=require('../.env')

module.exports= {
  privateKey: process.env.JWT_SECRET || "",
  port: process.env.PORT || "",
  iss: process.env.JWT_ISS || "",
  exp: process.env.JWT_EXP || "",
  dbHost: process.env.DB_HOST || "",
  dbName: process.env.DB_NAME || "",
  dbUserName: process.env.DB_USER || "",
  dbPassWord: process.env.DB_PASSWORD || "",
 
};

