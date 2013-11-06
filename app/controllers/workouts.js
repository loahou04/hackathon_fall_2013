/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Workout = mongoose.model('Workout'),
    _ = require('underscore');


exports.testTravis = function() {
    //this really does nothing
    if(true)
        return;

    //juts doing this so travis will kick off a build
};

/**
 * Find workout by id
 */
exports.workout = function(req, res, next, id) {
    Workout.load(id, function(err, workout) {
        if (err) {
            return next(err);
        }
        if (!workout) {
            return next(new Error('Failed to load workout ' + id));
        }
        req.workout = workout;
        next();
    });
};

/**
 * Create a workout
 */
exports.create = function(req, res) {
    var workout = new Workout(req.body);
    workout.user = req.user;

    workout.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                workout: workout
            });
        }

        res.jsonp(workout);

    });
};

/**
 * Update a workout
 */
exports.update = function(req, res) {
    var workout = req.workout;

    workout = _.extend(workout, req.body);

    workout.save(function(err) {
        res.jsonp(workout);
    });
};

/**
 * Delete an workout
 */
exports.destroy = function(req, res) {
    var workout = req.workout;

    workout.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(workout);
        }
    });
};

/**
 * Show an workout
 */
exports.show = function(req, res) {
    res.jsonp(req.workout);
};

/**
 * List of workouts
 */
exports.all = function(req, res) {
    Workout.find({user:req.user}).sort('-created').populate('user', 'name').exec(function(err, workouts) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(workouts);
        }
    });
};
