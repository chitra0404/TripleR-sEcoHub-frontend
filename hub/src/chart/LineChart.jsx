import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
import {Chart, Filler} from 'chart.js';

Chart.register(Filler);

export const options = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 16 // Increase the font size for labels
        }
      }
    },
    title: {
      display: false,
      text: "Chart.js Line Chart"
    }
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 14 // Increase the font size for x-axis labels
        }
      }
    },
    y: {
      ticks: {
        font: {
          size: 14 // Increase the font size for y-axis labels
        }
      }
    }
  },
  elements: {
    line: {
      borderWidth: 5,
    
    }
  },
  // Set the background color to a dark shade
 
};

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const data = {
  labels,
  datasets: [
    {
      label: "New Consumers",
      data: [30, 20, 15, 10, 25, 8],
      fill: true,
      borderColor: "rgba(0, 0, 255, 1)", // Blue color for the line
      backgroundColor: "rgba(0, 0, 255, 0.2)", // Blue color with transparency for fill
      tension: 0.4,
      
    }
  ]
};

function LineChart() {
  return (
    <div style={{ width: '100%', height: '300px' }}> {/* Adjust the height as needed */}
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChart;