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
        
//reminder!!
        geocodeService.getGeocode($scope.location)
            .success(function(response){
                latitude = response.results[0].geometry.location.lat;
                longitude = response.results[0].geometry.location.lng;
                $scope.formattedAddress =  response.results[0].formatted_address;
                    weatherService.get(latitude, longitude)
                        .success(function(response){
                            $scope.weatherData = response;
                            
//Adjustments to forecast.io response object, so that they are more pleasing to display, done in display order.
                            var chng = 0;
                        
                            chng = (Math.round($scope.weatherData.currently.temperature));
                            $scope.weatherData.currently.temperature = chng;
                        
                            angular.forEach($scope.weatherData.hourly.data, function(value, key){
                                chng = (hours[(new Date((value.time) * 1000)).getHours()]);
                                value.time = chng;
                                chng = (Math.round(value.temperature));
                                value.temperature = chng;
                                
                            });
                        
                            angular.forEach($scope.weatherData.daily.data, function(value, key){
                                chng = (weekday[(new Date((value.time) * 1000)).getDay()]);
                                value.time = chng;
                                chng = (Math.round(value.temperatureMax));
                                value.temperatureMax = chng;
                                chng = (Math.round(value.temperatureMin));
                                value.temperatureMin = chng; 
                            });
                        
//Needs to be adjusted to include hour and minutes, might start at .toString and then .substr?
                            chng = hours[new Date(($scope.weatherData.daily.data[0].sunriseTime)*1000).getHours()];
                            $scope.weatherData.daily.data[0].sunriseTime = chng;
                            chng = hours[new Date(($scope.weatherData.daily.data[0].sunsetTime)*1000).getHours()];
                            $scope.weatherData.daily.data[0].sunsetTime = chng;
                        
                            chng = Math.round($scope.weatherData.currently.precipProbability * 100);
                            $scope.weatherData.currently.precipProbability = chng;
                            chng = Math.round($scope.weatherData.currently.humidity * 100);
                            $scope.weatherData.currently.humidity = chng;
                            
                            chng = Math.round($scope.weatherData.currently.windSpeed);
                            $scope.weatherData.currently.windSpeed = chng;
                            chng = Math.round($scope.weatherData.currently.apparentTemperature);
                            $scope.weatherData.currently.apparentTemperature = chng;
                        
                            $scope.showWeather = true;
                            console.log($scope.weatherData);
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
