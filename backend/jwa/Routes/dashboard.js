const express = require('express');
const router = express.Router();
const AuthMiddleware = require("../middleware/isAuth");
const Feed = require('../modules/Feed');

router.get('/', AuthMiddleware, (req, res) => {
    res.render("dashboard.ejs", {user: req.user});
});

router.get('/userInfo', AuthMiddleware, (req,res)=>{
    Feed.find({house_no: req.user.house}).sort({date:-1})
        .then(result => {
            res.render("profile.ejs", {user: req.user, feed: result })
        })

})
router.get('/complaints', AuthMiddleware, (req,res) => {
    Feed.find({house_no: req.user.house, isComplaint:true})
        .then(result => {
            res.render("complaints.ejs",{complaints:result});
        })

})

module.exports = router;
