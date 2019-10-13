var express = require('express'),
    router  = express.Router(),
    Campground = require('../models/campground')

// INDEX ROUTE
router.get('/', function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log('error!'); 
        } else{
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
});

// NEW ROUTE
router.get('/new', function(req, res){
    res.render('campgrounds/new');
});

// CREATE ROUTE
router.post('/', function(req, res){
    var name = req.body.campground.name;
    var image = req.body.campground.image;
    var desc = req.body.campground.description;
    Campground.create({name: name, image: image, description: desc}, function(err){
        if(err){
            console.log('error in making create route');
            res.redirect('/');
        } else{
            res.redirect('/campgrounds');
        }
    });
});

// SHOW ROUTE
router.get('/:id', function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else{
            res.render('campgrounds/show', {campground: campground});
        }
    });
});

// EDIT ROUTE
router.get('/:id/edit', function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/:id');
        } else{
            res.render('campgrounds/edit', {campground: campground});
        }
    });
});

// UPDATE ROUTE
router.put('/:id', function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
            res.redirect('/');
        } else{
            res.redirect('/campgrounds/'+req.params.id);
            console.log(updatedCampground);
        }
    });
});

// DESTROY ROUTE
router.delete('/:id', function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/');
        } else{
            res.redirect('/campgrounds')
        }
    });
});

module.exports = router;