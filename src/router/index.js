import { createRouter, createWebHistory } from 'vue-router';
import app from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Ensure correct imports

import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: '/home',
      name: 'home',
      component:()=>import('../views/Home.vue')
      
    },
    {
      path: '/',
      name: 'home',
      component:()=>import('../views/Home.vue')
      
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/coinslist',
      name: 'coinslist',
      component: () => import('../views/testcoin.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/random',
      name: 'random',
      component: () => import('../views/Random.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/testcoin.vue')
    },
  ]
});

const auth = getAuth(app); // Get the auth instance here

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, proceed to the route
        next();
      } else {
        // User is not logged in, redirect to login
        next({ path: '/login' });
      }
    });
  } else {
    // If the route does not require auth, proceed as normal
    next();
  }
});

export default router;
