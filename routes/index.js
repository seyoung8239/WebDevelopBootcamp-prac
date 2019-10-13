var express = require('express'),
    router  = express.Router(),
    passport = require('passport');

//root route
router.get('/', function(req, res){
    res.render('landing');
});

// show register form
router.get('/register', function(req, res){
    res.render('register');
});

// handle sign up logic
// router.post('register', function(req, res){
//     var newUser = new User({username:})
// })

module.exports = router;