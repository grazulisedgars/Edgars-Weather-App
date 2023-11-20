//When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history

//When a user views the current weather conditions for a city they are presented with the city's name, the date, an icon representation of the weather conditions, the temperature, the humidity, and the wind speed

//When a user views the current weather conditions for a city they are presented with the city's name, the date, an icon representation of the weather conditions, the temperature, the humidity, and the wind speed


//When a user click on a city in the search history they are again presented with current and future conditions for that city


// Application uses the OpenWeather API to retrieve weather data.

var APIKey = ""

// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + APIKey;

$("#search-button").on("click", function(event) {
    event.preventDefault()
    var city = $("#search-input").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(queryURL);
        console.log(data);
    });
    
});
//Application uses localStorage to store persistent data.