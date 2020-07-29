const express = require('express');
const router = express.Router();
const AuthMiddleware = require("../middleware/isAuth");
const {initPayment, responsePayment} = require("../paytm/services/index");
const Transaction = require('../modules/Transaction');

router.get("/middle", (req,res)=>{
    res.render("transaction.ejs");
});

var amount;
var desc;
router.post("/middle",(req,res)=>{
    amount=req.body.amount;
    desc=req.body.desc;
    res.redirect("/payWithPaytm");
})

router.get("/", (req, res) => {
    initPayment(amount).then(
        success => {
            res.render("paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: 'https://securegw-stage.paytm.in/theia/processTransaction'
            });
        },
        error => {
            res.send(error);
        }
    );
});


router.post("/response", (req, res) => {
    responsePayment(req.body).then(
        success => {
            var responseData = success;
            var obj={
                amount: amount,
                receiver: "Society/Admin",
                sender: req.user.username,
                receiver_num: req.user.phone,
                sender_num: 777677776,
                details: desc,
                mode: "Online",
                society_in: true,
                date: new Date()
            }
            //ignore if already imported transaction module
            Transaction.create(obj,(err,val)=>{
                if(err){
                    console.log(err);
                }
            });
            res.render("response.ejs", {resultData: "true", responseData: success});
        },
        error => {
            console.log("There was an error");
            console.log(error)
            res.send(error);
        }
    );
});


module.exports = router;

