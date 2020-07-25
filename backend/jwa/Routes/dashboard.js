const express = require('express');
const router = express.Router();
const AuthMiddleware = require("../middleware/isAuth");

router.get('/', AuthMiddleware, (req, res) => {
    res.render("dashboard.ejs", {user: req.user});
});

router.get('/userInfo', AuthMiddleware, (req,res)=>{
    res.render("profile.ejs", {user: req.user})
})

module.exports = router;
