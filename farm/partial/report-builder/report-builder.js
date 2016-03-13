angular.module('farm').controller('ReportBuilderCtrl',function($scope, data, report, fdf){
    $scope.crops = report.getCrops();
    console.log($scope.crops);
    $scope.download =function () {
        report.makeReport(data.farm, $scope.crops);
    };

});
