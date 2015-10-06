app.controller("WeatherController", function($scope, $http, weatherService){
//    $scope.latitude = 0;
//    $scope.longitude = 0;
    $scope.location = "";
    $scope.weatherData = {};
    $scope.showWeather = false;
    
    $scope.getWeather = function(){
        var latitude = 0;
        var longitude = 0;
        $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+$scope.location+"&key="+geocodingApiKey)
            .success(function(response){
                latitude = response.results[0].geometry.location.lat;
                longitude = response.results[0].geometry.location.lng;
                    weatherService.get(latitude, longitude)
                        .success(function(response){
                            $scope.weatherData = response;
                            $scope.showWeather = true;
                        })
                        .error(function(err){
                            console.log(err);
                            $scope.showWeather = false;
                        });

            })
            .error(function(err){
                console.log(err);
            });
        

    };
});
