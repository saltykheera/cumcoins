<template>
    <header class="bg-gray-800 shadow-lg">
      <div class="container mx-auto px-4 py-6 flex justify-between items-center">
        <div class="flex items-center">
          <Coins class="h-8 w-8 text-yellow-400 mr-2" />
          <RouterLink to="/" class="text-2xl font-bold text-white">CumCoins</RouterLink>
        </div>
        <nav class="hidden md:block">
          <ul class="flex space-x-4">
            <li><RouterLink to="/dashboard" class="text-white hover:text-yellow-400 transition-colors">Dashboard</RouterLink></li>
            <li><RouterLink to="/coinslist" class="text-white hover:text-yellow-400 transition-colors">Coins</RouterLink></li>
            <li><RouterLink to="/random" class="text-white hover:text-yellow-400 transition-colors">GDSC-Api</RouterLink></li>
          </ul>
        </nav>
        <div class="hidden md:flex items-center space-x-4">
          <div v-if="!authstatus" class="space-x-2">
            <RouterLink to="/login" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors">
              Login
            </RouterLink>
            <RouterLink to="/signup" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Sign Up
            </RouterLink>
          </div>
          <div v-else class="flex space-x-2" >
            <div class="flex items-center space-x-2 px-3 py-2 bg-gray-700 rounded-full text-sm">
              <SquareUserRound class="w-4 h-4 text-gray-300" />
              <span class="text-gray-300 font-medium truncate max-w-[150px]">{{ userEmail }}</span>
            </div>
            <button @click="signOutUser" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
              Logout
            </button>
          </div>
        </div>
        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="text-white hover:text-yellow-400 focus:outline-none">
            <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden bg-gray-700">
          <nav class="px-2 pt-2 pb-3 space-y-1">
            <RouterLink to="/dashboard" class="block px-3 py-2 text-white hover:text-yellow-400 hover:bg-gray-600 rounded-md">Dashboard</RouterLink>
            <RouterLink to="/coinslist" class="block px-3 py-2 text-white hover:text-yellow-400 hover:bg-gray-600 rounded-md">CoinList</RouterLink>
            <RouterLink to="/random" class="block px-3 py-2 text-white hover:text-yellow-400 hover:bg-gray-600 rounded-md">GDSC-API</RouterLink>
            <div v-if="authstatus">
              <button  @click="signOutUser" class="w-full mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
                Logout
              </button>
            </div>
            <div v-else-if="!authstatus">
              <RouterLink to="/login" class="block mt-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-center transition-colors">
                Login
              </RouterLink>
              <RouterLink to="/signup" class="block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-center transition-colors">
                Sign Up
              </RouterLink>
            </div>
          </nav>
        </div>
      </Transition>
    </header>
  </template>

  <script setup>
  import { ref ,onMounted } from 'vue'
  import { RouterLink , useRouter } from 'vue-router';
  import { SquareUserRound ,Coins} from 'lucide-vue-next';
  import app from '../firebase';
  const Router = useRouter();
  import { getAuth, onAuthStateChanged ,signOut} from "firebase/auth";
  const auth = getAuth(app);
  const authstatus=ref(false)
  const userEmail=ref('')
  const checkAuth=()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in.");
        console.log(user.email);
        userEmail.value=user.email;
        authstatus.value=true
        console.log(authstatus.value)
      } else {
        authstatus.value=false;
        console.log("User is signed out.");
        
      }
    });
  }
  onMounted(()=>{
    checkAuth()
  })
 const signOutUser= async ()=>{
    try {
    await signOut(auth);
    Router.push('/login')
    console.log('User signed out successfully.');
    authstatus.value = false;
  } catch (error) {
    
    console.error('Sign-out error:', error);
  }
 }

  const isMobileMenuOpen = ref(false)
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }
  </script>