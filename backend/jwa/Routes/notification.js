const express = require('express');
const router = express.Router();
const AuthMiddleware = require("../middleware/isAuth");
const Notification = require('../modules/Notification');
const User = require('../modules/user');

// @route   GET notification/test
// @desc    For testing the route
// @Notes   to be removed later
router.get('/test', AuthMiddleware, (req, res) => {
    res.status(200).json({msg: "Working", user: req.user.toString()})
});

// @route   POST notification/sendNotificationUser
// @desc    For sending notification and creating event for Single User
// @Notes   send title, body, receiver to the route and add redirect url
router.post('/sendNotificationUser', AuthMiddleware, (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const receiver = req.body.receiver;
    User.findOne({username: receiver})
        .then(user => {
            if (user) {
                let ID = user._id;
                const newNotification = new Notification({
                    title: title,
                    body: body,
                    date: new Date(),
                    admin_id: req.user._id,
                    user_id: ID
                });
                newNotification.save();
                User.findById(ID)
                    .then(user => {
                        user.addNotification(newNotification);
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
});

// @route   POST notification/sendNotificationHouse
// @desc    For Sending post route to house
// @Notes   send title, body, house and add redirect url
router.post('/sendNotificationHouse', AuthMiddleware, (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const house = req.body.house;

    User.find({house: house})
        .then(user => {
            if (user) {
                for (let i = 0; i < user.length; i++) {
                    console.log(user[i]);
                    const newNotification = new Notification({
                        title: title,
                        body: body,
                        date: new Date(),
                        admin_id: req.user._id,
                        user_id: user[i]._id
                    });
                    newNotification.save();
                    User.findById(user[i]._id)
                        .then(user => {
                            user.addNotification(newNotification);
                        })
                        .catch(err => console.log(err));
                }
            }
        })
        .catch(err => console.log(err));
});

// @route   GET notification/getNotification
// @desc    Gets all the notification for the user
router.get('/getNotification', AuthMiddleware, (req, res) => {
    Notification.find({user_id: req.user._id}, ['title', 'body'])
        .then(notification => {
            res.json({notification: notification.toString()});
        })
});

router.get('/deleteNotification', AuthMiddleware, (req, res) => {
    const ID = req.query.id;
    console.log(ID);
    Notification.deleteOne({_id: ID})
        .then(result => {
            console.log("deleted");
            User.findById(req.user._id)
                .then(user => {
                    user.removeFromUser(ID);
                    res.redirect('/');
                }).catch(err => console.log(err))
        }).catch(err => console.log(err))
})

module.exports = router;

