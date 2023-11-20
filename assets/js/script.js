//When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history

//When a user views the current weather conditions for a city they are presented with the city's name, the date, an icon representation of the weather conditions, the temperature, the humidity, and the wind speed

//When a user views the current weather conditions for a city they are presented with the city's name, the date, an icon representation of the weather conditions, the temperature, the humidity, and the wind speed


//When a user click on a city in the search history they are again presented with current and future conditions for that city


// Application uses the OpenWeather API to retrieve weather data.

var APIKey = " "

//Next step I should show current weather data on the HTML which has #today

$("#search-button").on("click", function(event) {
    event.preventDefault();
    $("#today").empty();

    var city = $("#search-input").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // Need to display current day (h2 - font). Check for appropriate format
        var day = dayjs().format(" (DD/MM/YYYY)");
        
        // Weather icon data 
        var weatherIcon = data.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
        var weatherIcon = $("<img>").attr("src", iconURL).attr("alt", "Weather Icon").css( {
            'vertical-align': 'middle',
            'margin-right': '5px', 
            'width': '30px',
            'height': '30px'  
        });
        
        // Need to display city (h2) also dispalys data 
        var city = $("<h2>").text(data.name + " " + day);
        city.append(weatherIcon);

        // Display Temp (p)
        var celsiusTemp = data.main.temp - 273.15;
        var celsiusTemp = $("<p>").text("Temp: " + celsiusTemp.toFixed(2) + " °C");

        // Display wind (p)
        var windSpeed = data.wind.speed;
        var windSpeed = $("<p>").text("Wind: " + windSpeed + " KPH");

        // Display humidity (p)

        var humidity = data.main.humidity;
        var humidity = $("<p>").text("Humidity: " + humidity + "%");

        // Append to today section
        $("#today").append(city).append(celsiusTemp).append(windSpeed).append(humidity);
    });
    
});

// Fix forecast data. Get the key working 
// Get forecast data showing on the website

// Could wrap this in function and then add this function to the above click event
$("#search-button"). on("click", function (event) {
    event.preventDefault();
    var city = $("#search-input").val().trim();
    var geocodingURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(geocodingURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (geocodoingData) {
        var lat = geocodoingData.coord.lat;
        var lon = geocodoingData.coord.lon;

        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

        return fetch(forecastURL);
    })
    .then(function(forecastResponse){
        return forecastResponse.json();
    })
    .then(function (forecastData) {
        console.log(forecastData);

        // This one has a different link to json so destination for information might differ.
        // Check how to get icons for weather
    })
})




//Application uses localStorage to store persistent data.

// The search history of cities should show bellow search bar 


$("#history").on("click", "#search-button" ) // create a function and add the function inside parathesis 
// Might need a function where is target or current.target clicked shows the data

// Once clicked on the search history cities the weather data should be retrieved.