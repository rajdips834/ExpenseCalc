import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ titles, data, ...props }) => {
  const chartData = {
    labels: titles,
    datasets: [
      {
        label: "Financial Overview",
        data: data,
        backgroundColor: [
          "#40005d",
          "#A892EE",
          "#FFC0CB",
          "#FF6347",
          "#4CAF50",
        ], // Add more colors as needed
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div className="piechart__container">
      <div>
        {titles.map((title, index) => (
          <span key={index}>
            {title}
            {index < titles.length - 1 && " vs "}{" "}
            {/* Add "vs" if it's not the last title */}
          </span>
        ))}
      </div>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
