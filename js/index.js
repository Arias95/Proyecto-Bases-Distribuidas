
//var dirServer = 'http://localhost:8081'
var dirServer = 'http://192.168.100.13:8081'


var app = angular.module('myApp', ['ngRoute'])
	.config(['$httpProvider', function($httpProvider) {
  	$httpProvider.defaults.withCredentials = true;
  	$httpProvider.defaults.useXDomain = true;
}]);

/**
 * Manaje las redirecciones del sistema
 */
app.config(function($routeProvider){
    $routeProvider.
	
	when('/login', {
		templateUrl: 'pages/login.html',
		controller: 'ctlrLogin'
	}).
   
	otherwise({
		redirectTo: '/login'
	});
});


