angular.module('farm').factory('fdf', function($http) {
	var template;
	$http.get('/form-mini.xfdf').then(function(contents) {
		template = jQuery.parseXML(contents.data);
		window.template = template;
	});
	var fdf = {};

	fdf.addFeild = function(key, value) {
		var fields = $(template).find('fields');
		fields.append('<field name="' +key + '"><value >' + value + '</value ></field >');
	};

	fdf.addFields = function(map) {
		for (var key in map) {
			fdf.addFeild(key, map[key]);
		}
	};

	var serializer = new XMLSerializer();
	fdf.download = function() {
		var content = serializer.serializeToString(window.template),
			blob = new Blob([content], {
			type: "text/xml;charset=utf-8"
		});
		window.saveAs(blob, "form-data.xfdf");
	};



	return fdf;
});
