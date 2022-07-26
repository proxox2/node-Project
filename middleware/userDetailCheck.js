const db =require("../api/db/index.js");
const bcrypt=require("bcrypt");

// import db from "../api/db/index.js";
// import bcrypt from "bcrypt";

module.exports= {
    userDetailCheck: async function (req, res, next) {
        const { email, password } = req.body;

        if (email && password) {
            async function insertUserData() {
                const { query, close } = db.createConnection();
                try {
                    let sql = `SELECT gmail,password FROM user where gmail='${gmail}'`;
                    const result = await query(sql);

                    if (result[0] != null) {
                        const isMatch = await bcrypt.compare(password, result[0].password)
                        if (email === result[0].email && isMatch) {
                            req.email = email;
                            req.password = password;
                            next()
                        }
                        else{
                            res.send({ "status": "Failed", "message": "Wrong password" })
                        }
                    } else {
                        res.send({ "status": "Failed", "message": "you are not a register user" })
                    }
                } catch (error) {
                    throw error;
                } finally {
                    await close();
                }
            }
            await insertUserData();
        }
        else {
            return res.send({ "status": "Failed", "message": "All field are required" });
        }
    }
};