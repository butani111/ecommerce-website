import React from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Doughnut, Line } from "react-chartjs-2";

const Dashboard = () => {
  const lineState = {
    labels: ["Initila Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(200,70,50)"],
        data: [0, 4000],
      },
    ],
  };
  const doughnutState = {
    labels: ["Our of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#35014F"],
        hoverBackgroundColor: ["#485000", "#680064"],
        data: [2, 10],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-container">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboard-summary">
          <div>
            <p>
              Total Amount <br /> ₹2000
            </p>
          </div>
          <div className="dashboard-summary-box">
            <Link to="/admin/products">
              <p>Product</p>
              <p>50</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>5</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>3</p>
            </Link>
          </div>
        </div>

        <div className="dashboard-line-chart">
          <Line data={lineState} />
        </div>
        <div className="dashboard-doughnut-chart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
