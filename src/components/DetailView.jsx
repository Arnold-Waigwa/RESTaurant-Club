import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailView = () => {
  const { cityName } = useParams(); // Extract the city name from the URL
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/current?city=${cityName}&country=US&key=65c865e3b4b04babac177ed0a366368c`
        );
        const json = await response.json();
        setCityData(json.data[0]);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };
    fetchCityData();
  }, [cityName]);

  if (!cityData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Weather Details for {cityData.city_name}</h2>
      <p>Temperature: {cityData.temp}°C</p>
      <p>Weather: {cityData.weather.description}</p>
      <p>Wind Speed: {cityData.wind_spd} m/s</p>
      <p>Humidity: {cityData.rh}%</p>
      <img
        src={`https://www.weatherbit.io/static/img/icons/${cityData.weather.icon}.png`}
        alt={cityData.weather.description}
      />
    </div>
  );
};

export default DetailView;
