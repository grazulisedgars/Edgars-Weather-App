# Edgars-Weather-App

## Description

Edgars Weather App provides users with real-time weather insights and forecasts. The application utilizes JavaScript codebase to ensure a seamless and immersive user experience. Here's a brief summary of the key features:

The application employs the `loadStoredCities` function to retrieve and display past weather searches as buttons upon page initialization.

The `fetchWeatherData` function leverages the OpenWeatherMap API to dynamically fetch and display current weather details for a chosen city. This information is elegantly presented in the "today" section.

The `fetchForecastData` function unveils a 5-day forecast, intelligently using both the OpenWeatherMap API and geocoding. The forecasted data is presented in a visually appealing manner in the "forecast-container."

The search button (`#search-button`) triggers a sequence of events, including the clearing of previous weather insights, storage of the chosen city in local storage (`saveToLocalStorage`), and invocation of functions (`fetchWeatherData` and `fetchForecastData`) to uncover fresh weather mysteries.

The `saveToLocalStorage` function ensures the preservation of each city explored in local storage, updating the search history and creating corresponding buttons through `createCityButton`.

Crafted by the `createCityButton` function, history buttons allow users to traverse back in time, summoning weather and forecast data for their respective cities and adding interactivity to the application.

## How to Use It

For the purposes of this assignment I've left my API key in the code. The API Key is free. I know that it is not a good practice to reveal your keys, but as it's free I've left it in. 

## Link 
https://grazulisedgars.github.io/Edgars-Weather-App/

## Screenshot 
![Alt text](<assets/img/Screenshot 2023-11-21 at 22.31.42.png>)

## Licence 
MIT
