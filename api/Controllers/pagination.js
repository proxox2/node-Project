const express = require("express");
const router = express.Router();
router.get('/user', async (req, res, next) => {
    var { page, size } = req.body;
    if (!page) {
        page = 1;
    }
    if (!size) {
        size = 10;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    // const user=await user.find({},{},{limit:limit, skip:skip})
    // res.send({
    //     page,
    //     size,
    //     data:user
    // });
const db = require("../db/index");
var numPerPage = 20;
var page = (page - 1) * numPerPage;
var size = size + ',' + numPerPage; // Here we compute the size parameter for MySQL query
const { query, close } = db.db.createConnection();
query('SELECT count(*) as numRows FROM user', function (err, rows, fields) {
    if (err) {
        console.log("error: ", err);
        result(err, null);
    } else {
        var numRows = rows[0].numRows;
        var numPages = Math.ceil(numRows / numPerPage);
        query('SELECT * FROM user size' + size, function (err, rows, fields) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(rows)
                result(null, rows, numPages);
            }
        });
    }
});
});
module.exports={
    router
};