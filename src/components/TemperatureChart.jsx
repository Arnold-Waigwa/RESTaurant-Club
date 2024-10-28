// TemperatureChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TemperatureChart = ({ data }) => {
  // Prepare data to only include city and temperature values
  const chartData = data.map((item) => ({
    city: item.city_name,
    temp: item.temp,
  }));

  return (
    <div className="chart-container">
      <h3>Temperature Comparison Across Cities</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
