import React from "react";

const Hero = () => {
  const getCity = async () => {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=65c865e3b4b04babac177ed0a366368c&include=minutely`
    );
  };
  return (
    <div>
      <div>
        <h1>Restaurants Near Me</h1>
      </div>
      <div>
        <input type="text" placeholder="search for restaurants..." id="" />
      </div>
      <div className="restaurants-display-container"></div>
    </div>
  );
};

export default Hero;
