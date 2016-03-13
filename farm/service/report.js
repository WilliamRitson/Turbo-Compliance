angular.module('farm').factory('report', function(data) {

	var report = {};

	var getGroupedCrops = function () {
		return _.groupBy(data.blocks, 'cropType');
	};

	var calclulateNitrogen = function (block){
		var acres = block.acres,
			liquidNitrogen = block.nitrogenConcentration * 8.3454e-6 * block.waterUsage,
			solidNitrogen = block.solidNitrogen;
		return (liquidNitrogen + solidNitrogen) / acres;
	};

	report.getCrops = function () {
		return _.values(_.mapValues(getGroupedCrops(), function (blockGroup, cropName) {
			console.log(blockGroup);
			return {
				crop: cropName,
				acres: _.sumBy(blockGroup, 'acres'),
				soilNitrogen: _.sumBy(blockGroup, 'soilNitrogen'),
				addedNitrogen: _.sumBy(blockGroup, calclulateNitrogen)
			};
		}));

	};

	return report;
});
