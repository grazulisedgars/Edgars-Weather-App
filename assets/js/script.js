//When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history

//When a user views the current weather conditions for a city they are presented with the city's name, the date, an icon representation of the weather conditions, the temperature, the humidity, and the wind speed

//When a user views the current weather conditions for a city they are presented with the city's name, the date, an icon representation of the weather conditions, the temperature, the humidity, and the wind speed


//When a user click on a city in the search history they are again presented with current and future conditions for that city


// Application uses the OpenWeather API to retrieve weather data.

var APIKey = "c4899c41a207a3b65b7a9158b5b9858a"

//Next step I should show #today data properly and style it

// This function below is getting current weather data
$("#search-button").on("click", function(event) {
    event.preventDefault();
    $("#today").empty();

    // Add the 'with-border' class to #today
    $("#today").addClass("with-border");

    var city = $("#search-input").val().trim();

    // Save the city to local storage (ASK BCs Learning Assistant helped me with placement of this function call).
    saveToLocalStorage(city);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        // Day data
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

function saveToLocalStorage (city) {
    var searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];

    if(!searches.includes(city)) {
        searches.push(city);

        localStorage.setItem("weatherSearches", JSON.stringify(searches));

        createCityButton(city);
    }
};

function createCityButton(city) {

    var button = $("<button>")
    .addClass("custom-class")
    .text(city);

     // Append the button to the history div
     $("#history").append(button);

};

//This function below is getting forecast data
$("#search-button"). on("click", function (event) {
    event.preventDefault();
    $("#forecast-container").empty();

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

        //Loop through forecast data (every 8 data points for a new day)
        for (var i =0; i < forecastData.list.length; i+=8) {
            // Date
            var forecastDay = forecastData.list[i].dt_txt.split(' ')[0];
            var formattedDate = dayjs(forecastDay).format("DD/MM/YYYY");
            var dayElement = $("<p>").text(formattedDate);
            // Icon
            var forecastIcon = forecastData.list[i].weather[0].icon;
            var forecastIconURL = "https://openweathermap.org/img/wn/" + forecastIcon + ".png";
            var forecastWeatherIcon = $("<img>").attr("src", forecastIconURL).attr("alt", "Weather Icon");
            
            // Temp
            var forecastCelsiusTemp = forecastData.list[i].main.temp - 273.15;
            var forecastTempEl = $("<p>").text("Temp: " + forecastCelsiusTemp.toFixed(2) + " °C");
            // Wind
            var forecastWindSpeed = forecastData.list[i].wind.speed;
            var forecastWindEl = $("<p>").text("Wind: " + forecastWindSpeed + " KPH");
            //Humidity
            var forecastHumidity = forecastData.list[i].main.humidity;
            var forecastHumidityEl = $("<p>").text("Humidity: " + forecastHumidity + "%");
            
            var forecastBox =$("<div>").addClass("forecast-box");
           forecastBox.append(dayElement).append(forecastWeatherIcon).append(forecastTempEl).append(forecastWindEl).append(forecastHumidityEl);
           $("#forecast-container").append(forecastBox);
        }
        });
});



//Application uses localStorage to store persistent data.

// The search history of cities should show bellow search bar 


$("#history").on("click", "#search-button" ) // create a function and add the function inside parathesis 
// Might need a function where is target or current.target clicked shows the data

// Once clicked on the search history cities the weather data should be retrieved.