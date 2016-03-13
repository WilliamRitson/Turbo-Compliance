angular.module('farm').controller('BlockCtrl', function($scope, $routeParams, data, crops, fdf) {
    $scope.cropTypes = crops.list;
    $scope.block = data.getBlock($routeParams.id);
});
