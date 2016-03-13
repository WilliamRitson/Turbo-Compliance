angular.module('TurboCompliance').directive('navBar', function(data, $location) {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/nav-bar/nav-bar.html',
		link: function(scope, element, attrs, fn) {
			scope.save = function () {
				data.save();
			};

			scope.blocks = data.blocks;

			scope.addBlock = function () {
				$location.path('/block/' + window.prompt("Block name"));
			};

		}
	};
});
