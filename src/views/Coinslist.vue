<template>
    <div class="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">CoinList</h1>
        
        <!-- Stock Selection and Date Range -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div class="flex flex-wrap items-center justify-between mb-4">
            <div class="w-full sm:w-auto mb-4 sm:mb-0">
              <!-- <label for="stockSelect" class="block text-sm font-medium text-gray-700 mb-1">Select Stock</label>
              <select
                id="stockSelect"
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>Apple (AAPL)</option>
                <option>Microsoft (MSFT)</option>
                <option>Google (GOOGL)</option>
              </select> -->
            </div>
            <div class="w-full sm:w-auto">
              <!-- <label for="dateRange" class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                id="dateRange"
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>1 Year</option>
              </select> -->
            </div>
          </div>
          
          <!-- Hardcoded Chart Data -->
          <div class="h-80 sm:h-96">
            <Line
              :data="chartData"
              :options="chartOptions"
            />
          </div>
        </div>
        
        <PortfolioCard/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref ,onMounted} from 'vue';
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
  import PortfolioCard from "../components/PortfolioCard.vue";
  
  // Registering Chart.js components
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);
  
  // Hardcoded chart data
  const chartData = ref({
    labels: [],
    datasets: [
      {
        label: 'Stock Price',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        data: [], // Hardcoded stock prices
        fill:true,
      }
    ]
  });
  
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)'
        },
        beginAtZero: false
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  });

  function getLastSevenFormattedDates() {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    }

    return dates;
}

const updateChart=()=>{
    const days=20
    const labels = Array.from({ length: days }, (_, i) => 
    new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString()
  )
   const stockdata= Array.from({ length: days }, () => Math.floor(Math.random() * 100) + 150) 
  chartData.value={
    labels,
    datasets: [
      {
        label: 'Stock Price',
        data: stockdata,
      }
    ]
  }
}

onMounted(() => {
  updateChart()
});

  </script>
  