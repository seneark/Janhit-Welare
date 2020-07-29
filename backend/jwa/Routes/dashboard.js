const express = require('express');
const router = express.Router();
const AuthMiddleware = require("../middleware/isAuth");
const Notification = require('../modules/Notification');

router.get('/', AuthMiddleware, (req, res) => {
    res.render("dashboard.ejs", {user: req.user});
});

router.get('/userInfo', AuthMiddleware, (req,res)=>{
    Notification.find({user_id: req.user._id}).sort({date:-1})
        .then(result => {
            console.log(result);
            res.render("profile.ejs", {user: req.user, feed: result })
        })

})
router.get('/complaints', AuthMiddleware, (req,res) => {
    Notification.find({house_no: req.user.house, isComplaint:true})
        .then(result => {
            res.render("complaints.ejs",{complaints:result});
        })

});

// @route   GET dashboard for the user
router.get('/getNotification', AuthMiddleware, (req, res) => {
    Notification.find({house_no: req.user.house}, ['title', 'body', 'isComplaint']).sort({date: -1})
        .then(notification => {
            res.render("notification.ejs", {notification: notification})
            // res.json({notification: notification});
        })
});

router.get('/getSuggestion', AuthMiddleware, (req,res) => {
    res.render("Suggestions.ejs");
})

module.exports = router;
