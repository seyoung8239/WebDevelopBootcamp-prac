var express = require('express'),
    router = express.Router({mergeParams: true});
    Comment = require('../models/comment');
    Campground = require('../models/campground');

// Comments New
// router.get('/new', function(req, res){
//     Campground.findById(req.params.id, function(err, campground){
//         if(err){
//             console.log(err);
//             res.redirect('/');
//         } else{
//             res.render('comments/new', {campground: campground});
//         }
//     });
// });
 
// Comments Create Route
router.post('/', function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/');
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    res.redirect('/');
                } else{
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/'+campground._id);
                }
            });
        }
    });
});

// Comments Edit Route
router.get('/:comment_id/edit', function(req, res){
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    console.log('/');
                } else{
                    res.render('comments/edit', {campground: foundCampground, foundComment: foundComment});
                }
            });
        }
    });
});

// Comments Update Route
router.put('/:comment_id', function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/');
        } else{
                Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
                if(err){
                    console.log(err);
                    res.redirect('/');
                } else{
                    res.redirect('/campgrounds/'+campground._id);
                    console.log(updatedComment);
                }
            });
        }
    });
});

// Comments Delete Route
router.delete('/:comment_id', function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/');
        } else{
            Comment.findByIdAndRemove(req.params.comment_id, function(err){
                if(err){
                    console.log(err);
                } else{
                    res.redirect('/campgrounds/'+campground._id);
                }
            });
        }
    });
});

module.exports = router;