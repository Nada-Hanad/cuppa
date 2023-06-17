import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January"];

let data = {
  labels,
  datasets: [
    {
      data: [66],
      label: "Applied",
      borderColor: "rgb(109, 253, 181)",
      backgroundColor: "rgb(109, 253, 181,0.5)",
      borderWidth: 2,
    },
    {
      data: [40],
      label: "Accepted",
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgb(75, 192, 192,0.5)",
      borderWidth: 2,
    },
    {
      data: [20],
      label: "Pending",
      borderColor: "rgb(255, 205, 86)",
      backgroundColor: "rgb(255, 205, 86,0.5)",
      borderWidth: 2,
    },
    {
      data: [6],
      label: "Rejected",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgb(255, 99, 132,0.5)",
      borderWidth: 2,
    },
  ],
};

export default function BarChart({ chartData }) {
  if (chartData != undefined) {
    data = chartData;
  }

  return <Bar data={data} />;
}
