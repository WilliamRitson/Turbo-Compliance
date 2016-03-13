angular.module('farm').controller('FarmEditorCtrl',function($scope, data){
    $scope.farm = data.getFarm();

});
