angular.module('farm').controller('ReportBuilderCtrl',function($scope, report, fdf){
    $scope.crops = report.getCrops();
    console.log($scope.crops);
    $scope.download =function () {
        fdf.download();
    };

});
