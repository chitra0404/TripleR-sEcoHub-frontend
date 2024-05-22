import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
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

export const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart adapts to the parent container
    plugins: {
        legend: {
            position: "top"
        },
        title: {
            display: false,
            text: "Chart.js Bar Chart"
        }
    }
};

const labels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

export const data = {
    labels,
    datasets: [
        {
            label: "Pickups",
            data: [65, 40, 60, 30, 20, 50],
            backgroundColor: "rgba(54,185,204,1)",
            barPercentage: 0.9
        }
    ]
};

function BarChart() {
    return (
        <div style={{ width: '100%', height: '200px' }}> {/* Adjust the height as needed */}
            <Bar options={options} data={data} />
        </div>
    );
}

export default BarChart;
