<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="email"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                v-model="password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock v-if="!isLoading" class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                <Loader v-else class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 animate-spin" aria-hidden="true" />
              </span>
              {{ isLoading ? 'Logging in...' : 'Log in' }}
            </button>
          </div>
        </form>
        <p class="mt-2 text-center text-sm text-gray-600">
          Don't have an account?
          <router-link
            to="/signup"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </router-link>
        </p>
        <p v-if="errorMessage" class="mt-2 text-center text-sm text-red-600">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
  import { Lock, Loader } from 'lucide-vue-next'
  
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const isLoading = ref(false)
  const router = useRouter()
  
  const handleLogin = async () => {
    if (isLoading.value) return
  
    isLoading.value = true
    errorMessage.value = ''
  
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email.value, password.value)
      router.push('/dashboard') // Redirect to dashboard after successful login
    } catch (error) {
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }

 

  </script>