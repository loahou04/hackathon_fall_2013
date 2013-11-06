//Articles service used for articles REST endpoint
angular.module('mean.workouts').factory("Workouts", ['$resource', function($resource) {
    return $resource('workouts/:workoutId', {
        workoutId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);