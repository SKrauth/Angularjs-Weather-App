app.controller("WeatherController", function($scope, geocodeService, weatherService){
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
        var hours = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];
        var displayDay = [];
        
//reminder!!
        geocodeService.getGeocode($scope.location)
            .success(function(response){
                latitude = response.results[0].geometry.location.lat;
                longitude = response.results[0].geometry.location.lng;
                $scope.formattedAddress =  response.results[0].formatted_address;
                    weatherService.get(latitude, longitude)
                        .success(function(response){
                            $scope.weatherData = response;
                            var t = 0;
                            var h = 0;
                            var rnd = 0;
                            angular.forEach($scope.weatherData.hourly.data, function(value, key){
                                h = (hours[(new Date((value.time) * 1000)).getHours()]);
                                value.time = h;
                                rnd = (Math.round(value.temperature));
                                value.temperature = rnd;
                                
                            });
                            angular.forEach($scope.weatherData.daily.data, function(value, key){
                                t = (weekday[(new Date((value.time) * 1000)).getDay()]);
                                value.time = t;
                                rnd = (Math.round(value.temperatureMax));
                                value.temperatureMax = rnd;
                                rnd = (Math.round(value.temperatureMin));
                                value.temperatureMin = rnd; 
                            });
                            $scope.showWeather = true;
//                            console.log(weatherData);
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
