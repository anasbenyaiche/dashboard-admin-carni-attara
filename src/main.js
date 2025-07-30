import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import components for routing
import Dashboard from './components/Dashboard.vue'
import Users from './components/Users.vue'
import Vehicles from './components/Vehicles.vue'
import Orders from './components/Orders.vue'
import Settings from './components/Settings.vue'

// Define routes
const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: Users },
  { path: '/vehicles', name: 'Vehicles', component: Vehicles },
  { path: '/orders', name: 'Orders', component: Orders },
  { path: '/settings', name: 'Settings', component: Settings },
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
