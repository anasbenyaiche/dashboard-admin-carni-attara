<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Vehicle Management</h1>
        <p class="mt-1 text-sm text-gray-600">Manage all vehicles in the fleet</p>
      </div>
      <button @click="showAddModal = true" class="btn-primary">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add Vehicle
      </button>
    </div>

    <!-- Filters and Search -->
    <div class="card">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search vehicles..."
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
        <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
          <option value="out-of-service">Out of Service</option>
        </select>
        <select v-model="typeFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
          <option value="">All Types</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="hatchback">Hatchback</option>
          <option value="luxury">Luxury</option>
        </select>
        <select v-model="sortBy" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
          <option value="make">Sort by Make</option>
          <option value="year">Sort by Year</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>
    </div>

    <!-- Vehicles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="vehicle in filteredVehicles" :key="vehicle.id" class="card">
        <img :src="vehicle.image" :alt="vehicle.name" class="w-full h-48 object-cover rounded-lg mb-4">
        <div class="space-y-2">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold text-gray-900">{{ vehicle.make }} {{ vehicle.model }}</h3>
            <span :class="getStatusClass(vehicle.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
              {{ vehicle.status }}
            </span>
          </div>
          <p class="text-sm text-gray-600">{{ vehicle.year }} • {{ vehicle.type }}</p>
          <p class="text-sm text-gray-600">License: {{ vehicle.licensePlate }}</p>
          <div class="flex justify-between items-center pt-2">
            <span class="text-lg font-bold text-primary-600">${{ vehicle.pricePerDay }}/day</span>
            <div class="flex space-x-2">
              <button @click="editVehicle(vehicle)" class="text-sm text-primary-600 hover:text-primary-900">
                Edit
              </button>
              <button @click="deleteVehicle(vehicle)" class="text-sm text-red-600 hover:text-red-900">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Vehicle Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle' }}</h3>
          <form @submit.prevent="saveVehicle" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Make</label>
                <input
                  v-model="vehicleForm.make"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Model</label>
                <input
                  v-model="vehicleForm.model"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Year</label>
                <input
                  v-model="vehicleForm.year"
                  type="number"
                  min="1990"
                  max="2024"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Type</label>
                <select
                  v-model="vehicleForm.type"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">License Plate</label>
              <input
                v-model="vehicleForm.licensePlate"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Price per Day ($)</label>
              <input
                v-model="vehicleForm.pricePerDay"
                type="number"
                min="1"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <select
                v-model="vehicleForm.status"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="maintenance">Maintenance</option>
                <option value="out-of-service">Out of Service</option>
              </select>
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button @click="closeModal" type="button" class="btn-secondary">Cancel</button>
              <button type="submit" class="btn-primary">{{ editingVehicle ? 'Update' : 'Create' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const sortBy = ref('make')
const showAddModal = ref(false)
const editingVehicle = ref(null)

const vehicleForm = ref({
  make: '',
  model: '',
  year: new Date().getFullYear(),
  type: 'sedan',
  licensePlate: '',
  pricePerDay: 50,
  status: 'available'
})

// Mock vehicles data
const vehicles = ref([
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    type: 'sedan',
    licensePlate: 'ABC123',
    pricePerDay: 45,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    make: 'Honda',
    model: 'CR-V',
    year: 2023,
    type: 'suv',
    licensePlate: 'XYZ789',
    pricePerDay: 65,
    status: 'rented',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    type: 'luxury',
    licensePlate: 'BMW001',
    pricePerDay: 120,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    make: 'Ford',
    model: 'Focus',
    year: 2021,
    type: 'hatchback',
    licensePlate: 'FOR456',
    pricePerDay: 35,
    status: 'maintenance',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    make: 'Mercedes',
    model: 'E-Class',
    year: 2023,
    type: 'luxury',
    licensePlate: 'MER999',
    pricePerDay: 150,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    make: 'Nissan',
    model: 'Rogue',
    year: 2022,
    type: 'suv',
    licensePlate: 'NIS555',
    pricePerDay: 55,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
  }
])

const filteredVehicles = computed(() => {
  let filtered = vehicles.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(vehicle => 
      vehicle.make.toLowerCase().includes(query) ||
      vehicle.model.toLowerCase().includes(query) ||
      vehicle.licensePlate.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(vehicle => vehicle.status === statusFilter.value)
  }

  if (typeFilter.value) {
    filtered = filtered.filter(vehicle => vehicle.type === typeFilter.value)
  }

  // Sort vehicles
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'year':
        return b.year - a.year
      case 'price':
        return a.pricePerDay - b.pricePerDay
      default:
        return a.make.localeCompare(b.make)
    }
  })

  return filtered
})

const getStatusClass = (status) => {
  const classes = {
    'available': 'bg-green-100 text-green-800',
    'rented': 'bg-blue-100 text-blue-800',
    'maintenance': 'bg-yellow-100 text-yellow-800',
    'out-of-service': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const editVehicle = (vehicle) => {
  editingVehicle.value = vehicle
  vehicleForm.value = { ...vehicle }
  showAddModal.value = true
}

const deleteVehicle = (vehicle) => {
  if (confirm(`Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`)) {
    const index = vehicles.value.findIndex(v => v.id === vehicle.id)
    if (index > -1) {
      vehicles.value.splice(index, 1)
    }
  }
}

const saveVehicle = () => {
  if (editingVehicle.value) {
    // Update existing vehicle
    const index = vehicles.value.findIndex(v => v.id === editingVehicle.value.id)
    if (index > -1) {
      vehicles.value[index] = { 
        ...vehicleForm.value, 
        id: editingVehicle.value.id,
        image: editingVehicle.value.image 
      }
    }
  } else {
    // Add new vehicle
    const newVehicle = {
      ...vehicleForm.value,
      id: Date.now(),
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop'
    }
    vehicles.value.push(newVehicle)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingVehicle.value = null
  vehicleForm.value = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'sedan',
    licensePlate: '',
    pricePerDay: 50,
    status: 'available'
  }
}
</script>