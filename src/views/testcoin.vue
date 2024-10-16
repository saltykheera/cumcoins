<template>
  <div class="min-h-screen bg-gray-900 text-white p-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Crypto Price Tracker</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div v-for="coin in coins" :key="coin.id" class="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 class="text-xl font-semibold mb-2">{{ coin.name }}</h2>
          <p class="text-2xl font-bold">{{ formatPrice(coin.current_price) }}</p>
        </div>
      </div>

      <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
        <div class="p-4">
          <div class="flex flex-wrap gap-4 mb-4">
            <select v-model="selectedCoin" @change="fetchData" class="bg-gray-700 text-white rounded px-3 py-2">
              <option v-for="coin in coins" :key="coin.id" :value="coin.id">{{ coin.name }}</option>
            </select>
            <select v-model="selectedDays" @change="fetchData" class="bg-gray-700 text-white rounded px-3 py-2">
              <option v-for="day in [3, 7, 10, 30]" :key="day" :value="day">{{ day }} days</option>
            </select>
          </div>
          <div class="h-64 md:h-80">
            <Line v-if="chartReady" :data="chartData" :options="chartOptions" />
            <div v-else class="flex items-center justify-center h-full">
              <p class="text-gray-400">Loading chart data...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const coins = ref([]);
const selectedCoin = ref('bitcoin');
const selectedDays = ref(7);
const chartReady = ref(false);

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Price (INR)',
      backgroundColor: '#F7931A',
      borderColor: '#F7931A',
      data: [],
    }
  ]
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    y: {
      beginAtZero: false,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
        callback: function(value) {
          return '₹' + value.toLocaleString();
        }
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += '₹' + context.parsed.y.toLocaleString();
          }
          return label;
        }
      }
    }
  }
});

const extractData = (data) => {
  const pricearr = [];
  const timearr = [];
  
  data.prices.forEach(item => {
    const formattedTime = new Date(item[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    timearr.push(formattedTime);
    pricearr.push(item[1]);
  });
  
  return { pricearr, timearr };
};

const fetchData = async () => {
  chartReady.value = false;
  const options = {
    method: 'GET',
    url: `https://api.coingecko.com/api/v3/coins/${selectedCoin.value}/market_chart`,
    params: { vs_currency: 'inr', days: selectedDays.value },
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-XW11Jn6WGDBZ5K81ZuYDMFuU' }
  };

  try {
    const response = await axios.request(options);
    const apidata = response.data;
    const { pricearr, timearr } = extractData(apidata);
    
    chartData.value = {
      labels: timearr,
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: pricearr,
          label: `${selectedCoin.value.charAt(0).toUpperCase() + selectedCoin.value.slice(1)} Price (INR)`
        }
      ]
    };
    
    chartReady.value = true;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchCoins = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'inr',
        order: 'market_cap_desc',
        per_page: 4,
        page: 1,
        sparkline: false
      },
      headers: { 'x-cg-demo-api-key': 'CG-XW11Jn6WGDBZ5K81ZuYDMFuU' }
    });
    coins.value = response.data;
  } catch (error) {
    console.error('Error fetching coins:', error);
  }
};

const formatPrice = (price) => {
  return '₹' + price.toLocaleString('en-IN', { maximumFractionDigits: 2 });
};

onMounted(() => {
  fetchCoins();
  fetchData();
});

watch([selectedCoin, selectedDays], () => {
  fetchData();
});
</script>