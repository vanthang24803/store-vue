import { _http } from "@/lib/api";
import { generateColors } from "@/lib/color";
import { Chart } from "chart.js/auto";

const fetchTotalRevenue = async () => {
  const response = await _http.get(`/api/order/statistical?Status=Success`);

  return response.data;
};

const fetchTotalProducts = async () => {
  const response = await _http.get(`/api/product/total`);

  return response.data;
};

const fetchDonutChart = async (chart) => {
  try {
    const response = await _http.get(`/api/order/chart`);

    if (response.status === 200) {
      const data = response.data;
      const chartData = {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Monthly Sales",
            data: Object.values(data),
            backgroundColor: generateColors(Object.keys(data).length),
            borderColor: "rgba(255, 255, 255, 1)",
            borderWidth: 1,
          },
        ],
      };

      if (chart.value) {
        chart.value.destroy();
      }
      chart.value = new Chart(document.getElementById("donutChart"), {
        type: "doughnut",
        data: chartData,
        options: {
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchBarChart = async (chart) => {
  try {
    const response = await _http.get(`/api/order/chart`);

    if (response.status === 200) {
      const data = response.data;
      const chartData = {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Monthly Sales",
            data: Object.values(data),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
              "rgba(208, 203, 207, 0.2)",
              "rgba(211, 203, 207, 0.2)",
              "rgba(220, 203, 207, 0.2)",
              "rgba(216, 203, 207, 0.2)",
              "rgba(242, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 0.5,
          },
        ],
      };

      if (chart.value) {
        chart.value.destroy();
      }
      chart.value = new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: chartData,
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchCustomer = async (select) => {
  try {
    console.log(select.value)
    const response = await _http.get(
      `/api/order/selling?Time=${
        select.value.charAt(0).toUpperCase() + select.value.slice(1)
      }`
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchTotalProducts,
  fetchTotalRevenue,
  fetchDonutChart,
  fetchBarChart,
  fetchCustomer
};
