var app = angular.module("hipsterWeather", ["ngRoute"]);


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

app.factory("weatherService", function($http){
    var service = {};    
    var baseUrl = "https://api.forecast.io/forecast/";
    var baseUrlwApi = baseUrl + forecastApiKey + "/";
    
    service.get = function(latitude, longitude){
        return $http.jsonp(baseUrlwApi + latitude + "," + longitude + "?callback=JSON_CALLBACK");
    };
    return service;
});