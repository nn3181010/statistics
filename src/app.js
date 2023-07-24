// server.js
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON body
app.use(express.json());

// API to initialize the database with seed data
app.get("/api/initializeDatabase", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    // You can now initialize your database with the data from the response
    // Replace the next line with your database initialization logic
    const seedData = response.data;
    res.json({
      message: "Database initialized with seed data",
      data: seedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error initializing database", error: error.message });
  }
});

// API for statistics
app.get("/api/statistics/:month", (req, res) => {
  // Your logic to calculate statistics based on the month goes here
  // You can access the selected month from req.params.month
  // Replace the next lines with your logic
  const month = req.params.month;
  const totalSaleAmount = 0;
  const totalSoldItems = 0;
  const totalNotSoldItems = 0;

  res.json({ month, totalSaleAmount, totalSoldItems, totalNotSoldItems });
});

// API for bar chart
app.get("/api/barChart/:month", (req, res) => {
  // Your logic to generate bar chart data based on the month goes here
  // You can access the selected month from req.params.month
  // Replace the next lines with your logic
  const month = req.params.month;
  const barChartData = [
    { range: "0-100", count: 0 },
    { range: "101-200", count: 0 },
    // Add other ranges and counts here
  ];

  res.json({ month, barChartData });
});

// API for pie chart
app.get("/api/pieChart/:month", (req, res) => {
  // Your logic to generate pie chart data based on the month goes here
  // You can access the selected month from req.params.month
  // Replace the next lines with your logic
  const month = req.params.month;
  const pieChartData = [
    { category: "X category", count: 0 },
    { category: "Y category", count: 0 },
    // Add other categories and counts here
  ];

  res.json({ month, pieChartData });
});

// API to fetch data from all three APIs and combine the response
app.get("/api/combinedResponse/:month", async (req, res) => {
  try {
    const month = req.params.month;
    const statisticsResponse = await axios.get(`/api/statistics/${month}`);
    const barChartResponse = await axios.get(`/api/barChart/${month}`);
    const pieChartResponse = await axios.get(`/api/pieChart/${month}`);

    const combinedResponse = {
      month,
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data,
    };

    res.json(combinedResponse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
