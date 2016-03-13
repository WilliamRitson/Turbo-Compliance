angular.module('farm', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('farm').config(function($routeProvider) {

    $routeProvider.when('/block/:id',{templateUrl: 'farm/partial/block/block.html'});
    $routeProvider.when('/farm',{templateUrl: 'farm/partial/farm-editor/farm-editor.html'});
    $routeProvider.when('/report',{templateUrl: 'farm/partial/report-builder/report-builder.html'});
    $routeProvider.when('/blocks',{templateUrl: 'farm/partial/blocks-list/blocks-list.html'});
    /* Add New Routes Above */

});
