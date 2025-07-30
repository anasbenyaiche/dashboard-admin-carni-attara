<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Store Management</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Manage stores and their information</p>
        </div>
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Add Store
        </button>
      </div>

      <!-- Store Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Stores</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">45</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.018 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Approval</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">8</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive Stores</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">3</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search stores..."
              class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select
              v-model="selectedStatus"
              class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
            <select
              v-model="selectedLocation"
              class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="">All Locations</option>
              <option value="cairo">Cairo</option>
              <option value="alexandria">Alexandria</option>
              <option value="giza">Giza</option>
            </select>
          </div>
          <div class="flex items-end">
            <button @click="resetFilters" class="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Stores Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="store in filteredStores" :key="store.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ store.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ store.location }}</p>
              </div>
            </div>
            <span :class="getStatusBadgeClass(store.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
              {{ store.status }}
            </span>
          </div>
          
          <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ store.email }}
            </div>
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ store.phone }}
            </div>
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ store.address }}
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Joined: {{ store.joinedDate }}
            </div>
            <div class="flex space-x-2">
              <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                Edit
              </button>
              <button class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium">
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center text-sm text-gray-700 dark:text-gray-300">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredStores.length) }} of {{ filteredStores.length }} stores
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">{{ currentPage }}</span>
          <button
            @click="currentPage++"
            :disabled="currentPage * itemsPerPage >= filteredStores.length"
            class="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import DashboardLayout from '../components/layout/DashboardLayout.vue'

const searchTerm = ref('')
const selectedStatus = ref('')
const selectedLocation = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(6)

const stores = ref([
  {
    id: 1,
    name: 'Carni Market Downtown',
    location: 'Cairo',
    email: 'info@carnidowntown.com',
    phone: '+20 123 456 7890',
    address: '123 Tahrir Square, Cairo',
    status: 'active',
    joinedDate: '2023-06-15'
  },
  {
    id: 2,
    name: 'Fresh Meat Alexandria',
    location: 'Alexandria',
    email: 'contact@freshmeat.com',
    phone: '+20 234 567 8901',
    address: '456 Corniche Road, Alexandria',
    status: 'active',
    joinedDate: '2023-08-22'
  },
  {
    id: 3,
    name: 'Premium Butcher Shop',
    location: 'Giza',
    email: 'hello@premiumbutcher.com',
    phone: '+20 345 678 9012',
    address: '789 Pyramids Road, Giza',
    status: 'pending',
    joinedDate: '2024-01-10'
  },
  {
    id: 4,
    name: 'Halal Meat Center',
    location: 'Cairo',
    email: 'info@halalmeat.com',
    phone: '+20 456 789 0123',
    address: '321 Heliopolis, Cairo',
    status: 'active',
    joinedDate: '2023-09-12'
  },
  {
    id: 5,
    name: 'Quality Meat Shop',
    location: 'Alexandria',
    email: 'quality@meatshop.com',
    phone: '+20 567 890 1234',
    address: '654 Stanley Bridge, Alexandria',
    status: 'inactive',
    joinedDate: '2023-07-18'
  },
  {
    id: 6,
    name: 'Local Butchery',
    location: 'Giza',
    email: 'local@butchery.com',
    phone: '+20 678 901 2345',
    address: '987 Dokki Street, Giza',
    status: 'active',
    joinedDate: '2023-11-05'
  }
])

const filteredStores = computed(() => {
  return stores.value.filter(store => {
    const matchesSearch = !searchTerm.value || 
      store.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      store.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.value.toLowerCase())
    
    const matchesStatus = !selectedStatus.value || store.status === selectedStatus.value
    const matchesLocation = !selectedLocation.value || store.location.toLowerCase() === selectedLocation.value
    
    return matchesSearch && matchesStatus && matchesLocation
  })
})

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'inactive':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
}

const resetFilters = () => {
  searchTerm.value = ''
  selectedStatus.value = ''
  selectedLocation.value = ''
  currentPage.value = 1
}
</script>