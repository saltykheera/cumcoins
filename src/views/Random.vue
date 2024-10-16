<template>
    <div class="container mx-auto p-4 space-y-4" v-if="randomArray.length>0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Card for API Fetch Number -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold mb-2 text-gray-800">API Fetch: Number</h2>
          <p class="text-3xl font-semibold text-blue-600">{{ randomNumber }}</p>
        </div>
  
        <!-- Card for Random Numbers History -->
        <div class="bg-white rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-1">
          <h2 class="text-xl font-bold mb-2 text-gray-800">Random Numbers History</h2>
          <div class="overflow-x-auto">
            <p class="text-sm text-gray-600">{{ randomArray.join(', ') }}</p>
          </div>
        </div>
  
        <!-- Card for Graph -->
        <div class="bg-white rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-3">
        <div class="">
           
        </div>
          <h2 class="text-xl font-bold mb-2 text-gray-800">Random Number Graph</h2>
          <div class="h-64 sm:h-80 md:h-96">
            <Line :data="chartData" :options="chartOptions" />
          </div>
        </div>
      </div>
    </div>
    <!-- loading animation -->
    <div v-else class="container mx-auto p-4 space-y-4">
        <div class="flex justify-center items-center min-h-screen">
            <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
         </div>
    </div>
  </template>
  <script setup>
  import { ref, shallowRef, computed, onMounted } from 'vue';
  import { io } from 'socket.io-client';
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);
  
  const randomNumber = ref(null);
  const randomArray = ref([]);
  
  const MAX_DATA_POINTS = 50 // Number of values on x-axis
  
  const chartData = computed(() => ({
    labels: randomArray.value.map((_, index) => `Day ${index + 1}`).slice(-MAX_DATA_POINTS),
    datasets: [{
      label: 'Random Numbers',
      data: randomArray.value.slice(-MAX_DATA_POINTS),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: true,
    }]
  }));
  
  const chartOptions = shallowRef({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Random Number'
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  });
  
  onMounted(() => {
    const socket = io('https://data.gdscnsut.com');
    
    socket.on('random_number', (data) => {
      randomNumber.value = data.number;
      randomArray.value.push(data.number);
      
    });
  });
  </script>


<style scoped>
.loader {
  border-top-color: #3490dc;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>