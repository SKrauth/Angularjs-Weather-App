# Angularjs-Weather-App

This was one of my first attempts at building a project using AngularJS. The goal was to mimic the iPhone weather app just to see how close I could come to making something similar. The styling is awful, but the content actually got close.

### Important Setup Information

If you'd like to try my code, I have two API keys in a config.js file that's in .gitignore to protect my keys. If you go to [forecast.io](https://developer.forecast.io/) and [Google Maps APIs](https://developers.google.com/maps/documentation/geolocation/get-api-key) grab an API key from both and drop them into js/config.js like so:

```JavaScript
var forecastApiKey = "your api key here";
var geocodingApiKey = "your api key here"
```

then this should work for you.

### Sample Code

```JavaScript
var hours = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

angular.forEach($scope.weatherData.hourly.data, function(value, key){
    chng = (hours[(new Date((value.time) * 1000)).getHours()]);
    value.time = chng;
    chng = (Math.round(value.temperature));
    value.temperature = chng;
});
```

The forecast.io API wasn't naturally user friendly, as a result a lot of my WeatherController was taken up with code like this. Basically I'm just adjusting the values in the array so that when I display them they are easy to read.
