// -- =============================================
// -- Author:      Gibran 
// -- Create date: 05/09/2016
// -- Description: Is the container of the application
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var registrationModule = angular.module("registrationModule", ["ngRoute","LocalStorageModule"])
    .config(function($routeProvider, $locationProvider) {

        /*cheange the routes*/
        $routeProvider.when('/referencefactura', {
            templateUrl: 'AngularJS/Templates/reference.html', //example 1
            controller: 'referenceController'
        });
         $routeProvider.when('/', {
            templateUrl: 'AngularJS/Templates/referencefactura.html', //example 1
            controller: 'referenceController'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false  
        });
    });

registrationModule.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        var changeHeight = function() { element.css('height', (w.height() - 20) + 'px'); };
        w.bind('resize', function() {
            changeHeight(); // when window size gets changed             
        });
        changeHeight(); // when page loads          
    };
});
registrationModule.run(function($rootScope) {
    $rootScope.var = "full";

})
