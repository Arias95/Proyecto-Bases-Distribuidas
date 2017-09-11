'use strict';
var app = angular.module("myApp", ['ngRoute','ui.bootstrap','angular-jwt']);
			
app.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider.
	   
	when('/clients', {
		templateUrl: 'pages/clients.html',
		controller: 'clientsCtrl'
	}).

	when('/products', {
		templateUrl: 'pages/products.html',
		controller: 'productsCtrl'
	}).

	when('/newOrder', {
		templateUrl: 'pages/newOrder.html',
		controller: 'newOrderCtlr'
	}).
	
	otherwise({
		redirectTo: '/clients'
	});
	   
}]);

app.controller("myCtrl", function($scope, $location) {
    $location.path("clients");
	
	$scope.logout = function() {
         window.location.href = "index.html";
	}

	$scope.activa = function(arg) {
		if (arg == 'client'){
			$('#client').addClass('active');
			$('#products').removeClass('active');
			$('#reports').removeClass('active');
		}
		
		if (arg == 'products'){
			$('#client').removeClass('active');
			$('#products').addClass('active');
			$('#reports').removeClass('active');
		}
	
		if (arg == 'reports'){
			$('#client').removeClass('active');
			$('#products').removeClass('active');
			$('#reports').addClass('active');
		}
	};


	
});

/**
 * Contiene toda la informacion del usuario fanatico
 */
app.factory("InforUser", function() {
	  return {
	    data: {}
	  };
});