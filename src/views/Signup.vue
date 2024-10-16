<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
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
                @blur="validateEmail"
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
                autocomplete="new-password"
                required
                v-model="password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label for="confirm-password" class="sr-only">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autocomplete="new-password"
                required
                v-model="confirmPassword"
                @blur="validatePasswords"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign up
            </button>
          </div>
        </form>
        <p class="mt-2 text-center text-sm text-gray-600">
          Already have an account?
          <router-link
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </router-link>
        </p>
        <p v-if="errorMessage" class="mt-2 text-center text-sm text-red-600">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import app from '../firebase'
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
  
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const errorMessage = ref('')
  const router = useRouter()
  
  const isEmailValid = ref(true)
  const arePasswordsMatching = ref(true)
  
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    isEmailValid.value = emailRegex.test(email.value)
    if (!isEmailValid.value) {
      errorMessage.value = 'Please enter a valid email address.'
    } else {
      errorMessage.value = ''
    }
  }
  
  const validatePasswords = () => {
    arePasswordsMatching.value = password.value === confirmPassword.value
    if (!arePasswordsMatching.value) {
      errorMessage.value = 'Passwords do not match.'
    } else {
      errorMessage.value = ''
    }
  }
  
  const isFormValid = computed(() => {
    return isEmailValid.value && arePasswordsMatching.value && email.value && password.value && confirmPassword.value
  })
  
  const handleSignup = async () => {
    if (!isFormValid.value) {
      return
    }
  
    try {
      const auth = getAuth()
      await createUserWithEmailAndPassword(auth, email.value, password.value)
      router.push('/dashboard') // Redirect to dashboard after successful signup
    } catch (error) {
      errorMessage.value = error.message
    }
  }
  </script>