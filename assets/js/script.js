//When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history

//When a user views the current weather conditions for a city they are presented with the city's name, the date, an icon representation of the weather conditions, the temperature, the humidity, and the wind speed

//When a user views the current weather conditions for a city they are presented with the city's name, the date, an icon representation of the weather conditions, the temperature, the humidity, and the wind speed


//When a user click on a city in the search history they are again presented with current and future conditions for that city


// Application uses the OpenWeather API to retrieve weather data.

var APICall = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

//Application uses localStorage to store persistent data.