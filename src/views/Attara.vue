<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Attara Management</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Manage meat products and inventory</p>
        </div>
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Add Attara Item
        </button>
      </div>

      <!-- Attara Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">892</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">In Stock</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">756</p>
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
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">45</p>
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
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Out of Stock</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white">91</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search products..."
              class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              v-model="selectedCategory"
              class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              <option value="beef">Beef</option>
              <option value="lamb">Lamb</option>
              <option value="chicken">Chicken</option>
              <option value="fish">Fish</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grade</label>
            <select
              v-model="selectedGrade"
              class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="">All Grades</option>
              <option value="premium">Premium</option>
              <option value="standard">Standard</option>
              <option value="economy">Economy</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock Status</label>
            <select
              v-model="selectedStockStatus"
              class="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="">All Stock</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          <div class="flex items-end">
            <button @click="resetFilters" class="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Attara Items Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Grade</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price/kg</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                      <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.description }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getCategoryBadgeClass(item.category)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ item.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getGradeBadgeClass(item.grade)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ item.grade }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${{ item.pricePerKg }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ item.stock }} kg</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStockStatusBadgeClass(item.stockStatus)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ item.stockStatus.replace('-', ' ') }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">Edit</button>
                  <button class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">View</button>
                  <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center text-sm text-gray-700 dark:text-gray-300">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredItems.length) }} of {{ filteredItems.length }} items
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
            :disabled="currentPage * itemsPerPage >= filteredItems.length"
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
const selectedCategory = ref('')
const selectedGrade = ref('')
const selectedStockStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const items = ref([
  { id: 1, name: 'Premium Beef Ribeye', description: 'Fresh ribeye steak', category: 'beef', grade: 'premium', pricePerKg: 45.99, stock: 120, stockStatus: 'in-stock' },
  { id: 2, name: 'Lamb Shoulder', description: 'Tender lamb shoulder cut', category: 'lamb', grade: 'standard', pricePerKg: 38.50, stock: 85, stockStatus: 'in-stock' },
  { id: 3, name: 'Organic Chicken Breast', description: 'Free-range chicken breast', category: 'chicken', grade: 'premium', pricePerKg: 22.75, stock: 15, stockStatus: 'low-stock' },
  { id: 4, name: 'Fresh Salmon Fillet', description: 'Atlantic salmon fillet', category: 'fish', grade: 'premium', pricePerKg: 55.00, stock: 0, stockStatus: 'out-of-stock' },
  { id: 5, name: 'Ground Beef', description: 'Lean ground beef', category: 'beef', grade: 'standard', pricePerKg: 28.99, stock: 200, stockStatus: 'in-stock' },
  { id: 6, name: 'Lamb Chops', description: 'Premium lamb chops', category: 'lamb', grade: 'premium', pricePerKg: 52.00, stock: 65, stockStatus: 'in-stock' },
  { id: 7, name: 'Chicken Thighs', description: 'Bone-in chicken thighs', category: 'chicken', grade: 'economy', pricePerKg: 15.50, stock: 8, stockStatus: 'low-stock' },
  { id: 8, name: 'Tuna Steaks', description: 'Fresh tuna steaks', category: 'fish', grade: 'premium', pricePerKg: 68.00, stock: 25, stockStatus: 'in-stock' },
])

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchesSearch = !searchTerm.value || 
      item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    
    const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value
    const matchesGrade = !selectedGrade.value || item.grade === selectedGrade.value
    const matchesStockStatus = !selectedStockStatus.value || item.stockStatus === selectedStockStatus.value
    
    return matchesSearch && matchesCategory && matchesGrade && matchesStockStatus
  })
})

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'beef':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'lamb':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case 'chicken':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'fish':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
}

const getGradeBadgeClass = (grade: string) => {
  switch (grade) {
    case 'premium':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'standard':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'economy':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
}

const getStockStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'in-stock':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'low-stock':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'out-of-stock':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
}

const resetFilters = () => {
  searchTerm.value = ''
  selectedCategory.value = ''
  selectedGrade.value = ''
  selectedStockStatus.value = ''
  currentPage.value = 1
}
</script>