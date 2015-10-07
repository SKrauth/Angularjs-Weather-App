app.controller("WeatherController", function($scope, $http, weatherService){
//    $scope.latitude = 0;
//    $scope.longitude = 0;
    $scope.location = "";
    $scope.weatherData = {};
    $scope.showWeather = false;
    $scope.formattedAddress = "";
    
    $scope.getWeather = function(){
        var latitude = 0;
        var longitude = 0;
        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+$scope.location+"&key="+geocodingApiKey)
            .success(function(response){
                latitude = response.results[0].geometry.location.lat;
                longitude = response.results[0].geometry.location.lng;
                $scope.formattedAddress =  response.results[0].formatted_address;
                    weatherService.get(latitude, longitude)
                        .success(function(response){
                            $scope.weatherData = response;
                            $scope.showWeather = true;
                            angular.forEach($scope.weatherData.daily.data, function(value, key){
                                var t = new Date((value.time) * 1000);
                                console.log(weekday[t.getDay()]);
                            });
                            
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
