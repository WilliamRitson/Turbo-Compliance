angular.module('farm').controller('ReportBuilderCtrl',function($scope, data, report, fdf){
    $scope.crops = report.getCrops();
    $scope.cropsMeta = data.crops;
    $scope.crops.forEach(function (crop) {
        if (!$scope.cropsMeta[crop.crop]) {
            $scope.cropsMeta[crop.crop]  = {
                organic: false,
                yeildReaserch: false
            };
        }
    });

    console.log($scope.crops);
    $scope.download =function () {
        report.makeReport(data.farm, $scope.crops, $scope.cropsMeta);
    };

});
