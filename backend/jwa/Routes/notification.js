const express = require('express');
const router = express.Router();
const AuthMiddleware = require("../middleware/isAuth");
const Notification = require('../modules/Notification');
const User = require('../modules/user');


router.get('/test', AuthMiddleware, (req, res) => {
    res.status(200).json({msg: "Working", user: req.user.toString()})
});

router.post('/sendNotification',AuthMiddleware, (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const receiver = req.body.receiver;
    User.findOne({username: receiver})
        .then(user => {
            if(user){
                let ID = user._id;
                const newNotification = new Notification({
                    title: title,
                    body: body,
                    admin_id: req.user._id,
                    user_id: ID
                });
                newNotification.save();
                User.findById(req.user._id)
                    .then(user => {
                        user.addNotification(newNotification);
                    })
            }
        });

    // const newNoti = new Notification({
    //     title: title,
    //     body: body,
    //     admin_id: req.body.user._id,
    //     user_id:
    // });

})

module.exports = router;
