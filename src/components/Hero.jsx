import { useEffect, useState } from "react";
import "./Hero.css";
import TemperatureChart from "./TemperatureChart";

import { Link } from "react-router-dom";

function Hero() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    totalItems: 0,
    avgTemp: 0,
    maxTemp: 0,
  });

  // Array of cities to fetch data for
  const cities = ["Raleigh", "New York", "Los Angeles", "Chicago", "Miami"];

  // Fetch data with useEffect for multiple cities
  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = [];

        // Fetch weather data for each city in the array
        for (const city of cities) {
          const response = await fetch(
            `https://api.weatherbit.io/v2.0/current?city=${city}&country=US&key=65c865e3b4b04babac177ed0a366368c&include=minutely`
          );
          const json = await response.json();
          allData = [...allData, ...json.data]; // Combine city data into a single array
        }

        setData(allData);
        setFilteredData(allData); // Initial filtered data is the full dataset
        calculateSummaryStats(allData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Calculate summary statistics
  const calculateSummaryStats = (data) => {
    const totalItems = data.length;
    const avgTemp = data.reduce((acc, item) => acc + item.temp, 0) / totalItems;
    const maxTemp = Math.max(...data.map((item) => item.temp));
    setSummaryStats({ totalItems, avgTemp, maxTemp });
  };

  // Search data based on city name or weather description
  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filtered = data.filter(
        (item) =>
          item.city_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.weather.description
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset if search is cleared
    }
  };

  // Filter by multiple criteria
  const filterDataByCriteria = (criteria) => {
    const filtered = data.filter((item) => item.temp > criteria.minTemp);
    setFilteredData(filtered);
  };

  return (
    <center>
      <div className="App">
        <h1>Weather Data Dashboard</h1>
        {/* Summary Statistics */}
        <div className="summary">
          <h2>Summary Statistics</h2>
          <p>Total items: {summaryStats.totalItems}</p>
          <p>Average Temperature: {summaryStats.avgTemp.toFixed(2)}°C</p>
          <p>Max Temperature: {summaryStats.maxTemp}°C</p>
        </div>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search by city or weather..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div>
          <button onClick={() => filterDataByCriteria({ minTemp: 20 })}>
            Filter: Temp &gt; 20°C
          </button>
          <button onClick={() => filterDataByCriteria({ minTemp: 30 })}>
            Filter: Temp &gt; 30°C
          </button>
        </div>

        {/* List of Data */}
        <div className="data-list">
          <ul>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <li key={item.city_name}>
                  <p>City: {item.city_name}</p>
                  <p>Temperature: {item.temp}°C</p>
                  <p>Weather: {item.weather.description}</p>
                  <Link to={`/about/${item.city_name}`}>
                    <button>View Details</button>
                  </Link>
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`}
                    alt={item.weather.description}
                  />
                </li>
              ))
            ) : (
              <p>No results found</p>
            )}
          </ul>
        </div>
        <TemperatureChart data={data} />
      </div>
    </center>
  );
}

export default Hero;
