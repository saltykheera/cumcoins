<template>
    <div class="min-h-screen bg-gray-900 text-white">

  
      <!-- Hero Section -->
      <section class="py-20 text-center">
        <div class="container mx-auto px-4">
          <h2 class="text-5xl font-extrabold mb-4">Real-Time Crypto Tracking</h2>
          <p class="text-xl text-gray-400 ">Stay updated with the latest cryptocurrency prices and trends</p>
          <p class="text-x text-gray-400 mb-6">we cum so you can orgasam</p>
          <button  @click="router.push('/dashboard')" class="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-colors">
            Get Started
          </button>
        </div>
      </section>
  
      <!-- Live Ticker -->
      <div class="bg-gray-800 py-4 overflow-hidden">
        <div class="flex animate-marquee whitespace-nowrap">
          <div v-for="coin in topCoins" :key="coin.id" class="mx-4">
            <span class="font-semibold">{{ coin.name }}</span>
            <span :class="coin.change >= 0 ? 'text-green-500' : 'text-red-500'">
              ${{ coin.price.toFixed(2) }} ({{ coin.change >= 0 ? '+' : '' }}{{ coin.change.toFixed(2) }}%)
            </span>
          </div>
        </div>
      </div>
  
      <!-- Main Feature Section -->
      <section class="py-20">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 class="text-3xl font-bold mb-4">Track in Real-Time</h3>
              <p class="text-gray-400 mb-6">
                Our advanced algorithms provide up-to-the-second price updates, ensuring you never miss a beat in the fast-paced world of cryptocurrency.
              </p>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-green-500 mr-2" />
                  <span>Live price updates</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-green-500 mr-2" />
                  <span>Customizable alerts</span>
                </li>
                <li class="flex items-center">
                  <Check class="h-5 w-5 text-green-500 mr-2" />
                  <span>Historical data analysis</span>
                </li>
              </ul>
            </div>
            <div class="bg-gray-800 p-6 rounded-lg shadow-xl">
               <LineChart/>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Call-to-Action Section -->
      <section class="bg-gray-800 py-20">
        <div class="container mx-auto px-4 text-center">
          <h3 class="text-3xl font-bold mb-4">Ready to Start Tracking?</h3>
          <p class="text-xl text-gray-400 mb-8">Join thousands of traders who trust CumCoins for their crypto insights</p>
          <button  @click="router.push('/signup')" class="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-colors">
            Sign Up Now
          </button>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="bg-gray-900 py-8">
        <div class="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2024 CumCoins. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import {useRouter} from 'vue-router'
  import { Coins, Check } from 'lucide-vue-next'
 import LineChart from '../components/LineChart.vue'
  

const router=useRouter()


  const topCoins = ref([
    { id: 1, name: 'Bitcoin', price: 50000, change: 2.5 },
    { id: 2, name: 'Ethereum', price: 3000, change: -1.2 },
    { id: 3, name: 'Dogecoin', price: 0.25, change: 5.7 },
    { id: 4, name: 'Ripple', price: 1.5, change: 0.8 },
    { id: 5, name: 'Cardano', price: 2.1, change: -0.5 },
  ])
  </script>
  
  <style scoped>
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
  </style>