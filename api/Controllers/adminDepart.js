const  express = require("express");
const  db=require("../db/index.js");
const userDetailCheck=require("../../middleware/userDetailCheck.js");
const createJwtToken=require("../../middleware/createJwtToken.js");
const bcrypt=require("bcrypt");
//const adminUser =require("./adminUser.js");
const adminDepart=require("./adminDepart.js");
 //import adminRole from"./adminRole";
// import adminDepart from"./adminDepart";

const router=express.Router();

router.post("/createdept", async (req, res) => {

    const { depertmentid,departmentname} = req.body;
    async function insertUserData() {
        const { query, close } = db.db.createConnection();
        try {
            const salt=await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt); 
            let sql = `INSERT INTO depertment VALUES ('${id}','${depertmentid}') `;


            const result = await query(sql);
            res.send("Record Added");
        } catch (error) {
            return res.send({ "status": "Failed", "message": error })
        } finally {
            await close();
        }
    }
    await insertUserData();

});

router.put("/updatedept", async (req, res) => {

    const {gmail, password } = req.body;
    async function updateUserData() {
        const { query, close } = db.db.createConnection();
        try {
            const salt=await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt); 
            let sql = ` UPDATE user SET password = '${hashPassword}' WHERE gmail='${gmail}'`;
            const result = await query(sql);
            console.log('result',result);
            if(result.affectedRows){
                res.send("password updated");
            }else{
                res.send({ "status": "Failed", "message": "please check user email" })
            }          
        } catch (error) {
            return res.send({ "status": "Failed", "message": error })
        } finally {
            await close();
        }
    }
     await updateUserData();
});

router.delete("/deletedept", async (req, res) => {

    const { id } = req.body;
    async function deleteUserData() {
        const { query, close } = db.db.createConnection();
        try {
            let sql = ` DELETE FROM user WHERE id='${id}'`;
            const result = await query(sql);
            console.log('result in delete',result.affectedRows);
            
            if(result.affectedRows){
                return res.send("Record Deleted");
            }else{
                return res.send({ "message": "user not found plz check ID" })
            }    
      } catch (error) {
            return res.send({ "status": "Failed", "message": error })
        } finally {
            await close();
        }
    }
    await deleteUserData();
  

});

module.exports= {
    router
};
