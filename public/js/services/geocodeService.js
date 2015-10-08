app.factory("geocodeService",function($http){
    var service = {};
    
    service.getGeocode = function(location){
        return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key="+geocodingApiKey)
    };
    
    return service;
});