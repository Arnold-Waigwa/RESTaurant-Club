import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Statistics from "./components/Statistics";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Call the API immediately on mounting to display temperature of current city
  useEffect(() => {
    const callAPI = async () => {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=Raleigh&country=US&key=65c865e3b4b04babac177ed0a366368c&include=minutely`
      );
      const json = await response.json();
      setWeatherData(json.data); // The weather data is in json.data
      setFilteredResults(json.data); // Initialize filtered results
    };
    callAPI().catch(console.error);
  }, []);

  const setSearchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      // Filter weather data based on multiple attributes
      const filteredData = weatherData.filter((item) => {
        return (
          item.city_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.temp.toString().includes(searchValue) ||
          item.weather.description
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      });
      setFilteredResults(filteredData);
    } else {
      // Reset filtered results when the search input is empty
      setFilteredResults(weatherData);
    }
  };

  return (
    <>
      <Statistics />
      <Navbar />
      <div>
        <div>
          <h1>My City Weather</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="search attribute..."
            onChange={(inputString) => setSearchItems(inputString.target.value)}
          />
        </div>
        <div>
          <ul>
            {filteredResults.length > 0 ? (
              filteredResults.map((weather) => (
                <li key={weather.city_name}>
                  <p>City: {weather.city_name}</p>
                  <p>Temperature: {weather.temp}°C</p>
                  <p>Weather: {weather.weather.description}</p>
                  <p>Wind Speed: {weather.wind_spd} m/s</p>
                  <p>Sunrise: {weather.sunrise}</p>
                  <p>Sunset: {weather.sunset}</p>
                  {/* Display weather icon */}
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
                    alt={weather.weather.description}
                  />
                </li>
              ))
            ) : (
              <p>No data available</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
