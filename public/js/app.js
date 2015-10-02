var app = angular.module("hipsterWeather", ["ngRoute"]);

app.controller("HomeController", function(){

});

app.controller("WeatherController", function($scope){

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