angular.module('farm').factory('fdf', function($http) {
	var template;
	$http.get('/form-mini.xml').then(function(contents) {
		console.log(contents);
		template = jQuery.parseXML(contents);
		template.log(contents);
	});
	var fdf = {};
	var fieldRegex = /T\(([^\)]*)\)(?:\/V\(([^\)]*)\))?/g;

	var getAllMatches = function(input, regex) {
		var matches, output = [];
		while (matches = regex.exec(input)) {
			output.push(matches);
		}
		return output;
	};

	fdf.getFields = function() {
		var makeObject = function(input, regex) {
			var matches, output = {};
			while (matches = regex.exec(input)) {
				output[matches[1]] = matches[2];
			}
			return output;
		};

		return makeObject(template, fieldRegex);
	};

	fdf.download = function() {
		var blob = new Blob([template], {
			type: "text/plain;charset=utf-8"
		});
		window.saveAs(blob, "report.fdf");
	};



	return fdf;
});
