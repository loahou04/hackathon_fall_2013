angular.module('Hackathon.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
	$scope.global = Global;

	$scope.menu = [{
		"title": "Articles",
		"link": "articles"
	}, {
		"title": "Create New Article",
		"link": "articles/create"
	},
	{
		"title": "Workouts",
		"link": "workouts"
	}];
}]);