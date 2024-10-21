import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Statistics from "./components/Statistics";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [restaurants, setRestaurants] = useState([]);

  // call the api immediately on mounting to display some nearby restaurants
  useEffect(() => {
    //fetch the api data showing restaurants near you
    const callAPI = async () => {
      const response = await fetch(
        "https://api.spoonacular.com/food/restaurants/search?lat=42.2440&lng=84.7452&distance=10&apiKey=93d7411874554113b7bff3fdecea3965"
      );
      const json = await response.json();
      setRestaurants(json.restaurants);
    };
    callAPI().catch(console.error);
  }, []);

  return (
    <>
      <Statistics />
      <Navbar />
      <div>
        <div>
          <h1>Restaurants Near Me</h1>
        </div>
        <div>
          <input type="text" placeholder="search for restaurants..." id="" />
        </div>
        <div>
          <ul>
            {restaurants.length > 0
              ? restaurants.map((restaurant) => (
                  <li key={restaurant.name}>{restaurant.name}</li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
