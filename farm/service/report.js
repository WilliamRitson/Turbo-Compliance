angular.module('farm').factory('report', function(data, fdf) {

	var report = {};

	var translate = function(farm) {
		var map = {
			'AW_Num': farm.AWnumber,
			'AGL': farm.ranchGlobalId,
			'RanchName': farm.ranchName,
			'ReportAc': farm.totalAcreage,
			'WaterConc': farm.waterNitrate,
			'VolWater': farm.volWater,
			'NSoilAc': farm.compostAcres,
			'NSoilApp': farm.compostPounds,
			'box1': farm.uniRschDta,
			'box5': farm.consltPC,
			'box8': farm.commIndstyGp,
			'box11': farm.trdePub,
			'box14': farm.labRecmmd,
			'box2': farm.ucceInfo,
			'box6': farm.lclInfoNb,
			'box10': farm.prvtRschTls,
			'box12': farm.fertDistDeal,
			'box15': farm.siteAnalDryBioass,
			'box3': farm.advisorConsult,
			'box7': farm.yeildProj,
			'box4': farm.fReaTrial,
			'box13': farm.grorExp,
			'box16': farm.scitfcLit,
			'Notes': farm.explComm,
			'OperatorName': farm.opName,
			'PreparerName': farm.prepName,
			'PreparerTitle': farm.pTitle,
			'ContactInfo': farm.contactInfo,
		};
		for (var prop in map) {
			if (map[prop] === undefined || map[prop] === null ) {
				delete map[prop];
			}
			if (prop.indexOf('box') !== -1) {
				map[prop] = map[prop] ? 'Yes' : 'off';
			}
		}
		return map;
	};

	var getGroupedCrops = function() {
		return _.groupBy(data.blocks, 'cropType');
	};

	var calclulateNitrogen = function(block) {
		var acres = block.acres,
			liquidNitrogen = block.nitrogenConcentration * 8.3454e-6 * block.waterUsage,
			solidNitrogen = block.solidNitrogen;
		return (liquidNitrogen + solidNitrogen) / acres;
	};

	// converst mg / L to lb / gallon
	var conversionFactor = 8.3454e-6;

	// Nitrogen concentration in mg / L
	report.nitrogenInWater = function (waterInGallons, nitrogenConcentration) {
		return nitrogenConcentration* conversionFactor * waterInGallons;
	};

	report.getCrops = function() {
		return _.values(_.mapValues(getGroupedCrops(), function(blockGroup, cropName) {
			return {
				crop: cropName,
				acres: _.sumBy(blockGroup, 'acres'),
				soilNitrogen: _.sumBy(blockGroup, 'soilNitrogen'),
				addedNitrogen: _.sumBy(blockGroup, calclulateNitrogen)
			};
		}));
	};

	report.buildEithOr = function(farm) {
		var map = {};
		map.NO3 = farm.NO3orN ? 'Yes' : 'off';
		map.N = !farm.NO3orN ? 'Yes' : 'off';
		map.TradeSecretYes = farm.hasTradeSecret ? 'Yes' : 'off';
		map.TradeSecretYes = !farm.hasTradeSecret ? 'Yes' : 'off';
		return map;
	};


	report.buildCounties = function(counties) {
		var map = {};
		for (var i = 0; i < counties.length; i += 1) {
			map['County' + (i + 1)] = counties[i].name;
			for (var j = 0; j < counties[i].apns.length; j += 1) {
				map['APN' + (i + 1) + '_' + (j + 1)] = counties[i].apns[j].id;
			}
		}
		console.log(counties, map);
		return map;
	};


	var colMap = {
		crop: 'c',
		acres: 'a',
		soilNitrogen: 's',
		addedNitrogen: 'f',
	};
	report.buildCollumns = function(crops) {
		var map = {};
		for (var i = 0; i < crops.length; i += 1) {
			for (var prop in colMap) {
				map[colMap[prop] + (i + 1)] = crops[i][prop];
			}
		}
		return map;
	};

	report.makeReport = function(farm, crops) {
		var fields = {};
		_.assign(fields,
			translate(farm),
			report.buildCollumns(crops),
			report.buildCounties(farm.counties),
			report.buildEithOr(farm)
		);
		fields.DatePrepared = moment().format('l');
		console.log(fields);
		fdf.addFields(fields);
		fdf.download();
	};
	return report;
});
