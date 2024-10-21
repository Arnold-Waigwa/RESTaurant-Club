import React from "react";
import "./Statistics.css";
//this is going to show the [most common cuisine near you] [number of restaurants near you] [highest rating]

const Statistics = () => {
  return (
    <div className="statistics-container">
      <div className="statistic">Most Common Cuisine Near You</div>
      <div className="statistic">Number of restaurants near you</div>
      <div className="statistic">Highest rating</div>
    </div>
  );
};

export default Statistics;
