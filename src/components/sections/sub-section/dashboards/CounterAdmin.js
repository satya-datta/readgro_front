"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import counter2 from "@/assets/images/counter/counter__2.png";
import counter3 from "@/assets/images/counter/counter__3.png";
import counter4 from "@/assets/images/counter/counter__4.png";
import CounterDashboard from "@/components/shared/dashboards/CounterDashboard";
import HeadingDashboard from "@/components/shared/headings/HeadingDashboard";

const CounterAdmin = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalPackages: 0,
    razorpayBalance: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "https://readgro-backend-new.onrender.com/getadmindashboard"
        ); // Backend API
        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const counts = [
    {
      name: "Users",
      image: counter2,
      data: dashboardData.totalUsers,
      symbol: "",
    },
    {
      name: "Active Courses",
      image: counter2,
      data: dashboardData.totalCourses,
      symbol: "+",
    },
    {
      name: "No of Packages",
      image: counter3,
      data: dashboardData.totalPackages,
      symbol: "",
    },
    {
      name: "Admin Bank Account",
      image: counter4,
      data: dashboardData.razorpayBalance,
      symbol: "₹",
    },
  ];

  return (
    <CounterDashboard counts={counts}>
      <HeadingDashboard>Dashboard</HeadingDashboard>
    </CounterDashboard>
  );
};

export default CounterAdmin;
