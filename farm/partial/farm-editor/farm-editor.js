angular.module('farm').controller('FarmEditorCtrl',function($scope, data, report){
    $scope.farm = data.getFarm();
    $scope.addCounty = function () {
        $scope.farm.counties = $scope.farm.counties || [];
        if ($scope.farm.counties.length < 4) {
            $scope.farm.counties.push({
                name: $scope.countyChoices[0],
                apns: []
            });
        }
    };
    $scope.addParcel = function(county) {
        if (county.apns.length < 5) {
            county.apns.push({id:''});
        }
    };

    $scope.calcWaterNitrogen = function () {
        $scope.farm.totalIrrigationNitrate = report.nitrogenInWater($scope.farm.volWater, $scope.farm.waterNitrate);
    };

    $scope.countyChoices = ['Monterey', 'Santa Barbara', 'San Luis Obispo', 'Santa Clara', 'Santa Cruz', 'San Benito', 'San Mateo', 'Ventura'];

});
