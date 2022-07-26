const express = require("express");
const db=require('../db/index')
const router = express.Router();

router.post("/createrole", async (req, res) => {
    const { roleid, rolename } = req.body;
    async function insertUserData() {
        const { query, close } = db.db.createConnection();
        try {
           
            let sql = `INSERT INTO role VALUES ('${roleid}', '${rolename}') `;
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

router.put("/updaterole", async (req, res) => {

    const { roleid, rolename } = req.body;
    async function updateUserData() {
        const { query, close } = db.db.createConnection();
        try {
            const salt = await bcrypt.genSalt(10);
            //const hashPassword = await bcrypt.hash(password,salt); 
            let sql = ` UPDATE role SET id = '${roleid}' WHERE rolename='${rolename}'`;
            const result = await query(sql);
            console.log('result', result);
            if (result.affectedRows) {
                res.send("password updated");
            } else {
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

router.delete("/deleterole", async (req, res) => {

    const { id } = req.body;
    async function deleteUserData() {
        const { query, close } = db.db.createConnection();
        try {
            let sql = ` DELETE FROM user WHERE id='${id}'`;
            const result = await query(sql);
            console.log('result in delete', result.affectedRows);

            if (result.affectedRows) {
                return res.send("Record Deleted");
            } else {
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

module.exports = {
    router
};
