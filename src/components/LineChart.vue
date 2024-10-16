<template>
    <div class="w-full max-w-4xl mx-auto p-4">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="p-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Coins</h2>
          <div class="h-64 md:h-80">
            <Line
              :data="chartData"
              :options="chartOptions"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  
  const chartData = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Bitcoin',
        backgroundColor: '#F7931A',
        borderColor: '#F7931A',
        data: [40, 39, 10, 40, 39, 80, 40]
      },
      {
        label: 'Etherium',
        backgroundColor: '#444971',
        borderColor: ' #444971',
        data: [60, 55, 32, 10, 2, 12, 53]
      }
    ]
  })
  
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  })
  </script>