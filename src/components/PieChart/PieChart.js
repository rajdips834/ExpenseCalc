import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChart.css";
ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = ({ income, expenses }) => {
  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Financial Overview",
        data: [income, expenses],
        backgroundColor: ["#40005d", "#A892EE"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="piechart__container">
      <h2>Income vs Expenses</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
