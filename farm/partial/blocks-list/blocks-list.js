angular.module('farm').controller('BlocksListCtrl', function($scope, $location, data) {

	$scope.blocks = data.blocks;

	$scope.addBlock = function() {
		$location.path('/block/' + window.prompt("Block name"));
	};

	$scope.goToBlock = function(id) {
		$location.path('/block/' + id);
	};

    $scope.deleteBlock = function(id) {
        delete $scope.blocks[id];
    };
});
