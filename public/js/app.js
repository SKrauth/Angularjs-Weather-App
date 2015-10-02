var app = angular.module("hipsterWeather", ["ngRoute"]);

app.controller("HomeController", function($scope){

});

app.controller("WeatherController", function($scope, $http){
    $scope.latitude = 0;
    $scope.longitude = 0;
    $scope.weatherData = {};
    var baseUrl = "https://api.forecast.io/forecast/";
    var baseUrlwApi = baseUrl + apiKey + "/";
    
    $scope.getWeather = function(){
        $http.jsonp(baseUrlwApi + $scope.latitude + "," + $scope.longitude + "?callback=JSON_CALLBACK")
        .success(function(response){
            $scope.weatherData = response;
            console.log($scope.weatherData);
        })
        .error(function(err){
            console.log(err);
        });
    };
});

app.config(function($routeProvider){
    $routeProvider
    .when("/home", {
        templateUrl: "html/home.html",
        controller: "HomeController"
    })
    
    .when("/weather", {
        templateUrl: "html/weather.html",
        controller: "WeatherController"
    })
    
    .otherwise({
        redirectTo: "html/home.html"
    })

});