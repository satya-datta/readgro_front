"use client";
import { useEffect, useState } from "react";
import earningsimage from "@/assets/images/icons8-cash-48.png";
import CounterDashboard from "@/components/shared/dashboards/CounterDashboard";
import HeadingDashboard from "@/components/shared/headings/HeadingDashboard";
import axios from "axios";
import { useUserContext } from "@/contexts/UserContext";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Custom gradient for the bar chart
const createGradient = (ctx, area, color1, color2) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
};

const readgroLogo = require("@/assets/images/rg.png");

const CounterStudent = () => {
  const { user } = useUserContext();

  const [earnings, setEarnings] = useState({
    todayEarnings: 0,
    last7DaysEarnings: 0,
    last30DaysEarnings: 0,
    overallEarnings: 0,
  });

  const [barChartData, setBarChartData] = useState({
    labels: ['Today', 'Last 7 Days', 'Last 30 Days', 'Total'],
    datasets: []
  });

  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Cumulative Earnings (₹)',
        data: [0],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgb(99, 102, 241)',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });

  const [loadedImageUrl, setLoadedImageUrl] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to generate Y-axis configuration
  const getYAxisConfig = (maxValue) => {
    const baseMax = 2000; // Base maximum value (2K)
    const step = 500;     // Step size (500)

    if (maxValue <= baseMax) {
      // If max value is 2K or less, use 0-2K with 500 increments
      return {
        min: 0,
        max: baseMax,
        ticks: {
          stepSize: step,
          callback: (value) => `₹${value}`,
          font: { size: 12, weight: '500' }
        },
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      };
    } else {
      // For values > 2K, calculate appropriate scale
      const scaleFactor = Math.ceil(maxValue / baseMax);
      const scaledMax = baseMax * scaleFactor;
      const scaledStep = step * scaleFactor;

      return {
        min: 0,
        max: scaledMax,
        ticks: {
          stepSize: scaledStep,
          callback: (value) => `₹${value}`,
          font: { size: 12, weight: '500' }
        },
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      };
    }
  };

  // Chart options
  const getChartOptions = (maxValue) => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.parsed.y.toLocaleString()}`
        },
        displayColors: false,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: { size: 14, weight: '600' },
        bodyFont: { size: 16, weight: '600' },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: getYAxisConfig(maxValue),
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, weight: '500' } }
      }
    },
    maintainAspectRatio: false
  });

  // Initialize chart options with default max value
  const [barChartOptions, setBarChartOptions] = useState(getChartOptions(2000));
  const [lineChartOptions, setLineChartOptions] = useState({
    ...getChartOptions(2000),
    elements: {
      line: { borderWidth: 3 },
      point: { radius: 4, hoverRadius: 6, hoverBorderWidth: 2 }
    }
  });

  useEffect(() => {
    const fetchEarnings = async () => {
      if (!user?.userId) return;

      try {
        const earningsRes = await axios.get(`http://localhost:5000/earnings/${user.userId}`);
        const earningsData = earningsRes.data;

        setEarnings(earningsData);

        // Prepare bar chart data
        const barData = [
          earningsData.todayEarnings,
          earningsData.last7DaysEarnings,
          earningsData.last30DaysEarnings,
          earningsData.overallEarnings
        ];

        // Create bar chart dataset with gradient
        const barChartCtx = document.createElement('canvas').getContext('2d');
        const barGradient = createGradient(
          barChartCtx,
          { height: 400 },
          'rgba(79, 70, 229, 0.9)',
          'rgba(99, 102, 241, 0.6)'
        );

        // Get max value for scaling
        const maxEarnings = Math.max(...barData, 2000); // Ensure minimum range of 2000

        setBarChartOptions(getChartOptions(maxEarnings));
        setLineChartOptions({
          ...getChartOptions(maxEarnings),
          elements: {
            line: { borderWidth: 3 },
            point: { radius: 4, hoverRadius: 6, hoverBorderWidth: 2 }
          }
        });

        setBarChartData({
          labels: ['Today', 'Last 7 Days', 'Last 30 Days', 'Total'],
          datasets: [{
            label: 'Earnings (₹)',
            data: barData,
            backgroundColor: barGradient,
            borderRadius: 8,
            borderSkipped: false,
            barThickness: 40,
            maxBarThickness: 50,
          }]
        });

        // Prepare line chart data (cumulative earnings)
        const lineLabels = ['Start', 'Current'];

        // Only show start (0) and current total earnings
        const weeklyGrowth = [0, earningsData.overallEarnings];

        setLineChartData({
          labels: lineLabels,
          datasets: [{
            ...lineChartData.datasets[0],
            data: weeklyGrowth,
          }]
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching earnings:", error);
        setIsLoading(false);
      }
    };

    const fetchUserDetails = async () => {
      if (!user?.userId) return;

      try {
        const response = await fetch(
          `http://localhost:5000/getuser_details/${user.userId}`
        );
        const data = await response.json();
        if (data?.user?.avatar) {
          const img = new window.Image();
          img.src = data.user.avatar;
          img.onload = () => setLoadedImageUrl(data.user.avatar);
          img.onerror = () => setLoadedImageUrl(null);
        }

        // Fetch package details
        if (user?.package_id) {
          fetch(
            `http://localhost:5000/getpackage/${user.package_id}`
          )
            .then((res) => res.json())
            .then((packageData) => {
              if (packageData) {
                setPackageDetails(packageData);
              } else {
                setError("Package details not found");
              }
            })
            .catch(() => setError("Error fetching package details"));
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        setLoadedImageUrl(null);
      }
    };

    fetchEarnings();
    fetchUserDetails();

    const interval = setInterval(fetchEarnings, 10000);
    return () => clearInterval(interval);
  }, [user?.userId]);

  const counts = [
    {
      name: "Today’s Earnings",
      image: earningsimage,
      data: earnings.todayEarnings,
      symbol: "₹",
    },
    {
      name: "Last 7 Days Earnings",
      image: earningsimage,
      data: earnings.last7DaysEarnings,
      symbol: "₹",
    },
    {
      name: "Last 30 Days Earnings",
      image: earningsimage,
      data: earnings.last30DaysEarnings,
      symbol: "₹",
    },
    {
      name: "Total Earnings",
      image: earningsimage,
      data: earnings.overallEarnings,
      symbol: "₹",
    },
  ];

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `₹${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '₹' + value;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-0 w-full">
      <HeadingDashboard>Dashboard</HeadingDashboard>

      {/* Profile Card */}
      {loadedImageUrl && (
        <div className="mb-6">
          {/* Mobile View */}
          <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-md p-4 md:hidden max-w-[300px] mx-auto">
            <img
              src={loadedImageUrl}
              alt="User Profile"
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="text-center mt-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {user?.name}
              </h2>
              <p className="text-sm text-blue-600 font-medium">
                {packageDetails?.package_name || "Loading..."}
              </p>
            </div>
          </div>

          {/* Desktop/Laptop View */}
          <div className="hidden md:flex bg-gray-100 rounded-lg shadow-md p-4 items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-6">
              <img
                src={loadedImageUrl}
                alt="User Profile"
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {user?.name}
                </h2>
                <p className="text-md text-blue-600 font-medium mt-1">
                  {packageDetails?.package_name || "Loading..."}
                </p>
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{earnings.overallEarnings.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <Image
              src={readgroLogo}
              alt="Readgro Logo"
              width={50}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart - Earnings Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Earnings Overview</h2>
          <div className="h-80">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <Bar data={barChartData} options={barChartOptions} />
            )}
          </div>
        </div>

        {/* Line Chart - Earnings Growth */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Earnings Growth</h2>
          <div className="h-80">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <Line data={lineChartData} options={lineChartOptions} />
            )}
          </div>
        </div>
      </div>

      {/* Earnings Summary Cards */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Earnings Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {counts.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-indigo-500"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.name}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {item.symbol}{item.data.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-indigo-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={24}
                    height={24}
                    className="text-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterStudent;
