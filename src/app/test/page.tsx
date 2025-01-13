// pages/dashboard.tsx
"use client"
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Example Data
  const habits = [
    { id: 1, name: "Morning Jog", streak: 15, completion: 95 },
    { id: 2, name: "Read a Book", streak: 7, completion: 80 },
    { id: 3, name: "Drink Water", streak: 30, completion: 100 },
  ];

  const [chartData] = useState({
    labels: Array.from({ length: 7 }, (_, i) =>
      dayjs().subtract(6 - i, "day").format("ddd") // Last 7 days
    ),
    datasets: habits.map((habit, idx) => ({
      label: habit.name,
      data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10) + 1), // Random frequency data
      backgroundColor: `rgba(${50 * idx}, ${100 + idx * 40}, 200, 0.7)`,
      borderColor: `rgba(${50 * idx}, ${100 + idx * 40}, 200, 1)`,
      borderWidth: 1,
    })),
  });

  const [chartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Habit Frequency Over the Last Week",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Frequency",
        },
      },
      x: {
        title: {
          display: true,
          text: "Days",
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
          <p className="text-gray-600">Welcome back! Track your habits consistently.</p>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Habits</h2>
            <p className="text-3xl font-bold">{habits.length}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Longest Streak</h2>
            <p className="text-3xl font-bold">30 days</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Average Completion</h2>
            <p className="text-3xl font-bold">91%</p>
          </div>
        </div>

        {/* Frequency Chart */}
        <div className="mb-6 bg-gray-50 p-6 rounded-lg shadow-md">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Habit Tracker Table */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Habit Tracker</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Habit</th>
                <th className="border border-gray-300 px-4 py-2">Streak</th>
                <th className="border border-gray-300 px-4 py-2">Completion</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{habit.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{habit.streak} days</td>
                  <td className="border border-gray-300 px-4 py-2">{habit.completion}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Insights Section */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-900 mb-2">Insights</h2>
          <p className="text-blue-800">
            You've been consistent with <strong>Drink Water</strong>. Great job maintaining a streak of 30 days!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

