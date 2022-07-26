const express=require('express')
const router =express.Router();
router.get("/downloadCSV",async(req,res)=>{
    async function getCSV() {
        const { query, close } = db.db.createConnection();
        try {
            const{id}=req.body
            let sql = `SELECT * FROM users into outfile

            "C:\\Users\\OPTLPTP254\\Downloads\\users.csv"

            fields terminated by ','

            lines terminated by '\n';`;
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
    await getCSV
})
module.exports={
    router
}