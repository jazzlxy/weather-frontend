import React from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import { useState, useEffect } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({}); // 1. Stores API response
  const [queryLocation, setQueryLocation] = useState(""); // 2. Stores search input text

  const handleSearch = (e) => {
    setQueryLocation(e.target.value);
  }; // Updates state as user type (doesn't fetch)

  const loadData = async () => {
    // Build URL with current city
    let url = `${import.meta.env.VITE_BASE_URL}${
      import.meta.env.VITE_WEATHER_ENDPOINT
    }?city=${
      queryLocation || `${import.meta.env.VITE_DEFAULT_QUERY_LOCATION}`
    }`;
    console.log("queryurl", url);
    // Send request to my Express backend
    let datares = await fetch(url);
    // Convert response to JSON, fetch() returhns response object not JSON
    let weatherdataraw = await datares.json();
    console.log("weatherdataraw", weatherdataraw);
    // Update React state with weather data
    setWeatherData(weatherdataraw);
    //console.log("happy");
  };
  // console.log("env", import.meta.env);

  useEffect(() => {
    loadData(); // loads deafult city weather on page load
  }, []); // Empty [] = run once

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loadData(); // Fetch data when pressed Enter key
      setQueryLocation(""); // Set
    }
  };

  return (
    <div className="weather box-border w-[400px] md:w-[600px] p-4 md:p-10 rounded-xl m-0">
      <div className="search-bar w-[300px] md:w-[500px] mx-auto my-3 md:my-5 gap-2 md:gap-3">
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          value={queryLocation}
        />
        <img src={search_icon} alt="" className="search-icon" />
      </div>
      {/* Current Weather */}
      <div className="current-weather-card w-[300px] md:w-[500px] p-4 md:p-8 mx-auto my-3 md:my-5 gap-4 md:gap-12 rounded-[20px]">
        <div className="current-weather-top">
          <div className="weather-info">
            <p className="temperature text-2xl md:text-5xl m-0">
              {weatherData.temperature}&deg;C
            </p>
            <p className="location text-xs md:text-lg md:mt-2">
              {weatherData.city}
            </p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
            alt=""
            className="weather-icon w-12 md:w-22 h-auto"
          />
        </div>
        <div className="hourly-forecast">
          {weatherData && "hourly" in weatherData ? (
            weatherData.hourly.map((hourlyItem) => (
              <div className="hourly-item md:gap-1">
                <p className="hourly-temp text-xs md:text-lg font-bold m-0">
                  {hourlyItem.temperature}&deg;C
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
                  alt=""
                  className="hourly-icon w-6 md:w-12"
                />
                <p className="hourly-time text-xs md:text-lg m-0">
                  {hourlyItem.time}
                </p>
              </div>
            ))
          ) : (
            // 3 bouncing dots
            <div className="flex gap-2 items-end">
              <div className="w-4 h-4 bg-gradient-to-tr from-rose-400 to-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-gradient-to-tr from-indigo-400 to-rose-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-4 h-4 bg-gradient-to-tr from-rose-400 to-indigo-500 rounded-full animate-bounce delay-200"></div>
              <p>Loading Current Weather data...</p>
            </div>
          )}
        </div>
      </div>
      {/* 5 Day Forecast */}
      <div className="multiple-forecast-card w-[300px] md:w-[500px] p-4 md:p-8 mx-auto my-3 md:my-5 gap-3 md:gap-5 rounded-[20px]">
        {weatherData && "daily" in weatherData ? (
          weatherData.daily.map((dailyItem) => (
            <div className="forecast-row px-0 py-3 md:py-5 gap-4 md:gap-12">
              <p className="forecast-date w-[50px] md:w-[80px] text-xs md:text-lg font-semibold m-0">
                {dailyItem.day}
              </p>
              <p className="forecast-humidity w-[60px] md:w-[60px] text-xs md:text-lg font-semibold m-0">
                {dailyItem.humidity}%💧
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
                alt=""
                className="forecast-icon w-6 md:w-12 h-auto"
              />
              <p className="forecast-temp w-[80px] md:w-[100px] text-xs md:text-lg font-semibold m-0">
                {dailyItem.temp_min}&deg;C / {dailyItem.temp_max}&deg;C
              </p>
            </div>
          ))
        ) : (
          <div className="flex gap-2 items-end">
            <div className="w-4 h-4 bg-gradient-to-tr from-indigo-400 to-rose-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-gradient-to-tr from-rose-400 to-indigo-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-4 h-4 bg-gradient-to-tr from-indigo-400 to-rose-500 rounded-full animate-bounce delay-200"></div>
            <p>Loading 5 Day Forecast data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
