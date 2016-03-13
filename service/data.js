angular.module('TurboCompliance').factory('data', function() {

	var data = {};

	data.farm = {};

	data.blocks = {};

	var lsId = 'tc-data';
	data.save = function() {
		window.localStorage.setItem(lsId, JSON.stringify({
			farm: data.farm,
			blocks: data.blocks
		}));
	};

	data.load = function(id) {
		var newData = JSON.parse(window.localStorage.getItem(lsId));
		if (newData === null) {
			return;
		}
		data.farm = newData.farm;
		data.blocks = newData.blocks;
	};

	data.getFarm = function() {
		return data.farm;
	};

	data.getBlock = function(id) {
		if (!data.blocks[id]) {
			data.blocks[id] = {
				name: id
			};
		}
		return data.blocks[id];
	};

	data.getBlockIds = function () {
		return _.keys(data.blocks);
	};

	data.load();
	console.log(data);

	return data;
});
