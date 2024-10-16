<template>
  <div class="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div class="flex flex-wrap items-center justify-between mb-4">
          <div class="w-full sm:w-auto mb-4 sm:mb-0">
            <label for="stockSelect" class="block text-sm font-medium text-gray-700 mb-1">Select Stock</label>
            <select
              id="stockSelect"
              v-model="selectedStock"
              @change="updateChart"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option v-for="stock in stocks" :key="stock" :value="stock">{{ stock }}</option>
            </select>
          </div>
          <div class="w-full sm:w-auto">
            <label for="dateRange" class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              id="dateRange"
              v-model="selectedDateRange"
              @change="updateChart"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="6M">6 Months</option>
              <option value="1Y">1 Year</option>
            </select>
          </div>
        </div>
        
        <div class="h-80 sm:h-96">
          <Line
            v-if="chartData.datasets[0].data.length > 0"
            :data="chartData"
            :options="chartOptions"
          />
        </div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(value, key) in portfolioStats" :key="key" class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">{{ key }}</h3>
          <p class="text-2xl font-bold text-indigo-600">{{ value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const stocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN']
const selectedStock = ref('AAPL')
const selectedDateRange = ref('1M')

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Stock Price',
      data: [],
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      fill: true,
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: false,
    },
  },
})

const portfolioStats = ref({
  'Total Value': '$0',
  'Daily Change': '0%',
  'Top Performer': '-',
  'Worst Performer': '-',
})

const generateMockData = (days) => {
  const data = []
  let price = Math.random() * 100 + 100
  for (let i = 0; i < days; i++) {
    price += (Math.random() - 0.5) * 5
    data.push(parseFloat(price.toFixed(2)))
  }
  return data
}

const updateChart = () => {
  const days = {
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
  }[selectedDateRange.value]

  const mockData = generateMockData(days)
  const labels = Array.from({ length: days }, (_, i) => 
    new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString()
  )

  chartData.value = {
    labels,
    datasets: [
      {
        ...chartData.value.datasets[0],
        data: mockData,
        label: `${selectedStock.value} Stock Price`,
      },
    ],
  }

  // Update portfolio stats
  const lastPrice = mockData[mockData.length - 1]
  const prevPrice = mockData[mockData.length - 2]
  const dailyChange = ((lastPrice - prevPrice) / prevPrice * 100).toFixed(2)

  portfolioStats.value = {
    'Total Value': `$${(lastPrice * 100).toFixed(2)}`,
    'Daily Change': `${dailyChange}%`,
    'Top Performer': stocks[Math.floor(Math.random() * stocks.length)],
    'Worst Performer': stocks[Math.floor(Math.random() * stocks.length)],
  }
}

onMounted(() => {
  updateChart()
})

watch([selectedStock, selectedDateRange], () => {
  updateChart()
})
</script>