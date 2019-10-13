var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport')
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override');

// Requiring Models
var User = require('./models/user'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');

// Requiring Routes
var campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index');

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/yelp_camp_v10', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "luv you so much jeje",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){ //?
    res.locals.currentUser = req.user;
    next();
});

//
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comment', commentRoutes);


app.listen(3000, ()=> {
    console.log('server is running');
});

// Campground.create({name:"afsdfdsf", image:"https://images.unsplash.com/photo-1568826069038-f3de1448e9a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2800&q=80",
// description: "asdgsf"});