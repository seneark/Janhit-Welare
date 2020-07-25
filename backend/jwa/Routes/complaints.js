const express = require('express');
const router = express.Router();
const AuthMiddleware = require("../middleware/isAuth");
const User = require('../modules/user');
const Complaint = require('../modules/Complaint');

// @route   GET complaint/test
// @desc    For testing the route
// @Notes   to be removed later
router.get('/test', AuthMiddleware, (req, res) => {
    res.status(200).json({msg: "Working", user: req.user.toString()})
});

router.get('/getUser', AuthMiddleware, (req, res) => {
    Complaint.find({user_id: req.user._id}, [''])
        .then(result => {
            res.json({result: result});
        })
        .catch(err => console.log(err));
});

router.post('/sendUser', AuthMiddleware, (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const receiver = req.body.receiver;
    User.findOne({username: receiver})
        .then(user => {
            const newComplaint = new Complaint({
                title: title,
                body: body,
                date: new Date(),
                admin_id: req.user._id,
                user_id: user._id
            });
            newComplaint.save();
            res.json({message: "success", Complaint: newComplaint})
        })
        .catch(err => console.log(err));
})


module.exports = router;
