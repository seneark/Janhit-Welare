const express = require('express');
const router = express.Router();
const AuthMiddleware = require("../middleware/isAuth");
const {initPayment, responsePayment} = require("../paytm/services/index");

router.get("/", (req, res) => {
    initPayment(0).then(
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

