const express = require('express')
const router = express.Router();
const db = require("../db/index");


router.get("/rolewise", async (req, res) => {
    async function getRoleWiseUser() {
        const { query, close } = db.db.createConnection();
        try {
            let sql = `select name ,role.rolename from user
            join role on
            role.roleid=user.roleid`;
            const result = await query(sql);
            res.send(result);
        } catch (error) {
            return res.send({ "status": "Failed", "message": error })
        } finally {
            await close();
        }}
    await getRoleWiseUser();
})
router.get("/deptUser", async (req, res) => {
    async function deptUser() {
        const { query, close } = db.db.createConnection();

        try {

            let sql = `select name ,department.departmentname from user
            join department on
            department.departmentid=user.depertmentid`;
            const result = await query(sql);
            res.send(result);


        } catch (error) {
            return res.send({ "status": "Failed", "message": error })
        } finally {
            await close();
        }
    }
    await deptUser
})
module.exports = {
    router
}