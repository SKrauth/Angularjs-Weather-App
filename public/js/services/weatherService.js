app.factory("weatherService", function($http){
    var service = {};    
    var baseUrl = "https://api.forecast.io/forecast/";
    var baseUrlwApi = baseUrl + forecastApiKey + "/";
    
    service.get = function(latitude, longitude){
        return $http.jsonp(baseUrlwApi + latitude + "," + longitude + "?callback=JSON_CALLBACK");
    };
    return service;
});

