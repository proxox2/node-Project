const express=require('express');
const db =require("../db/index.js");

const userDetailCheck =require("../../middleware/userDetailCheck.js");
const  createJwtToken =require("../../middleware/createJwtToken.js");
const bcrypt=require("bcrypt");
const adminUser=require("./adminUser");
const adminRole=require("./adminRole");
const adminDepart =require("./adminDepart");
const pagination=require("./pagination");
const { user } = require('../index.js');

const listing=require("./listing");
const downloadcsv=require("./downloadcsv");
const { route } = require('express/lib/router/index.js');
const { removeAllListeners } = require('nodemon');

const router = express.Router();
router.use('/adminUser',adminUser.router);
 router.use('/adminRole',adminRole.router);
 router.use('/adminDepart',adminDepart.router);
 router.use('/pagination',pagination.router);
 router.use('/listing',listing.router);
router.use('/downloadcsv',downloadcsv.router);

router.get("/user", async (req, res) => {

    async function getUserData() {
        const { query, close } = db.db.createConnection();
        try {
            let sql = `SELECT id,name,gmail, password, roleid, depertmentid,usertype
            FROM user`;
            const result = await query(sql);
            res.send(result);
        } catch (error) {
            return res.send({ "status": "Failed", "message": error })
        } finally {
            await close();
        }
    }
    await getUserData();
});

router.post("/userById", async (req, res) => {

    async function getUserDataById() {
        const { query, close } = db.db.createConnection();
        try {
            const{id}=req.body
            let sql = `SELECT name,gmail, password, roleid, depertmentid,usertype
            FROM users where id=${id}`;
            const result = await query(sql);
              
            if(result.length){
                return res.send({ "data":result[0] });
            }else{
                return res.send({ "message": "user not found plz check ID" })
            }          
            
        } catch (error) {
            return res.send({ "status": "Failed", "message": error })
        } finally {
            await close();
        }
    }
    await getUserDataById();
});


router.get("/userlist",async(req,res)=>{
    async function userlist(){
        const{query, close}=db.db.createConnection();
        try{
            let sql=`select name ,role.roleid,department.departmentname from user
            join role on
            role.roleid=user.roleid
            join department on
            user.depertmentid=department.departmentid `;
            const result=await query(sql);
            res.send(result);
        }catch(error){
            return res.send({"status":"failed",})
        }finally
    {
        await close();
    }
    }
    await rolelist();
})


router.post("/userLogin",
userDetailCheck.userDetailCheck,
createJwtToken.createToken,
async (req, res) => {
    let token= req.token
  res.send({"status":"Success", "message":"Login Success",token:token});
});

module.exports={
    router
};