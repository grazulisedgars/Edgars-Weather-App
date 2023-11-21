var APIKey = "c4899c41a207a3b65b7a9158b5b9858a"

// Function for current weather data 
function fetchWeatherData(city) {
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
            'width': '40px',
            'height': '40px'  
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
}

// Function for forecast data
function fetchForecastData (city) {
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
        
        var forecastHeading = $("<h3>").text("5-Day Forecast: ");
        
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
            $("#forecast-heading").prepend(forecastHeading);
            $("#forecast-container").append(forecastBox)
        }
    });
}

// This is an event listener for search button 
$("#search-button").on("click", function(event) {
    event.preventDefault();
    $("#today").empty();
    $("#forecast-container").empty();
    $("#forecast-heading").empty();

    // Add the 'with-border' class to #today
    $("#today").addClass("with-border");

    var city = $("#search-input").val().trim();

    // Save the city to local storage (ASK BCs Learning Assistant helped me with placement of this function call).
    saveToLocalStorage(city);

     // Call the fetchWeatherData function
     fetchWeatherData(city);
     fetchForecastData(city);
});


// Function that stores to Local Storage 

function saveToLocalStorage (city) {
    var searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];

    if(!searches.includes(city)) {
        searches.push(city);

        localStorage.setItem("weatherSearches", JSON.stringify(searches));

        createCityButton(city);
    }
};

// Function that creates history buttons
function createCityButton(city) {

    var button = $("<button>")
    .addClass("btn btn-secondary btn-sm mb-1 search-history-button")
    .text(city);

    button.on("click", function (){
        $("#today").empty();
        $("#forecast-container").empty();
        $("#forecast-heading").empty();
        fetchWeatherData(city);
        fetchForecastData(city);
    })

     // Append the button to the history div
     $("#history").append(button);

};