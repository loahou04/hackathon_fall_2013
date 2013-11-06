angular.module('mean.workouts').controller('WorkoutsController', [
	'$scope',
	'$routeParams',
	'$location',
	'Global',
	'Workouts',
	function ($scope, $routeParams, $location, Global, Workouts) {
		$scope.global = Global;

		$scope.list = function() {

			Workouts.query(function(workoutsList) {
				console.log(workoutsList[0].user);
			});
		};
}]);
