<template>
    <div>
      <!-- Mobile menu button -->
      <button
        @click="toggleSidebar"
        class="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-inset focus:ring-white"
        aria-label="Toggle sidebar"
      >
        <MenuIcon v-if="!isOpen" class="h-6 w-6" />
        <XIcon v-else class="h-6 w-6" />
      </button>
     
  
      <!-- Sidebar -->
      <div v-if="isOpen"
        :class="[isOpen || isDesktop ? 'translate-x-0' : '-translate-x-full', 'fixed top-0 left-0 z-10 w-64 h-screen transition-transform duration-300 ease-in-out bg-gray-800 overflow-y-auto']"
      >
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between h-16 px-4 bg-gray-900">
            <h2 class="text-white text-2xl font-semibold">Menu</h2>
            <button
              @click="toggleSidebar"
              class="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Close sidebar"
            >
              <XIcon class="h-6 w-6" />
            </button>
          </div>
          <nav class="flex-1 px-2 py-4 space-y-2">
            <RouterLink
              v-for="(item, index) in menuItems"
              :key="index"
              :to="item.href"
              class="flex items-center px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              <component :is="item.icon" class="h-6 w-6 mr-3" />
              {{ item.name }}
            </RouterLink>
          </nav>
          <!-- Desktop toggle button -->
          <div class="lg:block px-4 py-4">
            <button
              @click="toggleSidebar"
              class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <ChevronLeftIcon v-if="isOpen" class="h-5 w-5 mr-2" />
              <ChevronRightIcon v-else class="h-5 w-5 mr-2" />
              {{ isOpen ? 'Collapse Sidebar' : 'Expand Sidebar' }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- Overlay for mobile -->
      <div
        v-if="isOpen"
        @click="closeSidebar"
        class="lg:hidden fixed inset-0 z-5 bg-black bg-opacity-50 transition-opacity"
      >
    
    </div>
      <div style="background-color: #1f2937;" class="px-4 py-2" >
        <button @click="toggleSidebar"
         class="flex items-center justify-center   text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
            <ChevronRightIcon/>
        </button>
      </div>
    </div>
    
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import {RouterLink} from "vue-router"
  import { MenuIcon, XIcon, HomeIcon, CreditCardIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    }
  })
  

  
  const isOpen = ref(props.isOpen)
  const isDesktop = ref(window.innerWidth >= 1024) // lg breakpoint
  
  const menuItems = [
    { name: 'Overview', href: '/', icon: HomeIcon },
    { name: 'My Bank', href: 'about', icon: CreditCardIcon },
  ]
  
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value
    
  }
  
  const closeSidebar = () => {
    isOpen.value = false
  }
  
  const handleResize = () => {
    isDesktop.value = window.innerWidth >= 1024
  }
  
  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
  </script>