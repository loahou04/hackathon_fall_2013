/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Workout Schema
 */
var WorkoutSchema = new Schema({
    created: {
        type: Date,
        'default': Date.now
    },
    type: String,
    workoutSets: Array,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
WorkoutSchema.path('type').validate(function(type) {
    return type.length;
}, 'type cannot be blank');
WorkoutSchema.path('workoutSets').validate(function(workoutSets) {
    var i;
    var valid = true;
    if(workoutSets.length === 0) {
        valid = false;
    }
    for(i = 0; i < workoutSets.length; i++) {
        if(!workoutSets[i].repeat || !workoutSets[i].reps ||
            !workoutSets[i].work) {
            valid = false;
        }
    }
    return valid;
}, 'workoutSets invalid');
/**
 * Statics
 */
WorkoutSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user').exec(cb);
    }
};

mongoose.model('Workout', WorkoutSchema);