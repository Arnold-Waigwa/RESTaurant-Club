import React from "react";

const Hero = () => {
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
