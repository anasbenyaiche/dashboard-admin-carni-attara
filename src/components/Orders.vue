<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Order Management</h1>
        <p class="mt-1 text-sm text-gray-600">Track and manage all rental orders</p>
      </div>
      <div class="flex space-x-3">
        <button @click="exportOrders" class="btn-secondary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Export
        </button>
        <button @click="showAddModal = true" class="btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          New Order
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card">
        <div class="flex items-center">
          <div class="p-2 bg-blue-500 bg-opacity-75 rounded-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Orders</p>
            <p class="text-2xl font-semibold text-gray-900">{{ orderStats.total }}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="flex items-center">
          <div class="p-2 bg-green-500 bg-opacity-75 rounded-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Completed</p>
            <p class="text-2xl font-semibold text-gray-900">{{ orderStats.completed }}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-500 bg-opacity-75 rounded-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-2xl font-semibold text-gray-900">{{ orderStats.pending }}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="flex items-center">
          <div class="p-2 bg-purple-500 bg-opacity-75 rounded-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Revenue</p>
            <p class="text-2xl font-semibold text-gray-900">${{ orderStats.revenue.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="card">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search orders by ID, customer, or vehicle..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
        </div>
        <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          v-model="dateFilter"
          type="date"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
      </div>
    </div>

    <!-- Orders Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in filteredOrders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                #{{ order.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="order.customer.avatar" :alt="order.customer.name" class="w-8 h-8 rounded-full">
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ order.customer.name }}</div>
                    <div class="text-sm text-gray-500">{{ order.customer.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ order.vehicle.make }} {{ order.vehicle.model }}</div>
                <div class="text-sm text-gray-500">{{ order.vehicle.licensePlate }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.startDate }} to {{ order.endDate }}
                <div class="text-xs text-gray-400">{{ order.duration }} days</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${{ order.total }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(order.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="viewOrder(order)" class="text-primary-600 hover:text-primary-900 mr-3">
                  View
                </button>
                <button @click="updateStatus(order)" class="text-green-600 hover:text-green-900 mr-3">
                  Update
                </button>
                <button @click="cancelOrder(order)" class="text-red-600 hover:text-red-900">
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Order Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Create New Order</h3>
          <form @submit.prevent="saveOrder" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer Email</label>
              <input
                v-model="orderForm.customerEmail"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Vehicle License Plate</label>
              <input
                v-model="orderForm.vehiclePlate"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  v-model="orderForm.startDate"
                  type="date"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  v-model="orderForm.endDate"
                  type="date"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Daily Rate ($)</label>
              <input
                v-model="orderForm.dailyRate"
                type="number"
                min="1"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button @click="closeModal" type="button" class="btn-secondary">Cancel</button>
              <button type="submit" class="btn-primary">Create Order</button>
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
const dateFilter = ref('')
const showAddModal = ref(false)

const orderForm = ref({
  customerEmail: '',
  vehiclePlate: '',
  startDate: '',
  endDate: '',
  dailyRate: 50
})

// Mock orders data
const orders = ref([
  {
    id: '001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff'
    },
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      licensePlate: 'ABC123'
    },
    startDate: '2024-01-15',
    endDate: '2024-01-20',
    duration: 5,
    total: 225,
    status: 'completed'
  },
  {
    id: '002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff'
    },
    vehicle: {
      make: 'Honda',
      model: 'CR-V',
      licensePlate: 'XYZ789'
    },
    startDate: '2024-01-20',
    endDate: '2024-01-25',
    duration: 5,
    total: 325,
    status: 'active'
  },
  {
    id: '003',
    customer: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=f59e0b&color=fff'
    },
    vehicle: {
      make: 'BMW',
      model: '3 Series',
      licensePlate: 'BMW001'
    },
    startDate: '2024-01-25',
    endDate: '2024-01-30',
    duration: 5,
    total: 600,
    status: 'pending'
  },
  {
    id: '004',
    customer: {
      name: 'Alice Brown',
      email: 'alice@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Alice+Brown&background=8b5cf6&color=fff'
    },
    vehicle: {
      make: 'Mercedes',
      model: 'E-Class',
      licensePlate: 'MER999'
    },
    startDate: '2024-02-01',
    endDate: '2024-02-07',
    duration: 6,
    total: 900,
    status: 'confirmed'
  }
])

const orderStats = computed(() => {
  const total = orders.value.length
  const completed = orders.value.filter(o => o.status === 'completed').length
  const pending = orders.value.filter(o => o.status === 'pending').length
  const revenue = orders.value
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.total, 0)

  return { total, completed, pending, revenue }
})

const filteredOrders = computed(() => {
  let filtered = orders.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order => 
      order.id.includes(query) ||
      order.customer.name.toLowerCase().includes(query) ||
      order.customer.email.toLowerCase().includes(query) ||
      order.vehicle.make.toLowerCase().includes(query) ||
      order.vehicle.model.toLowerCase().includes(query) ||
      order.vehicle.licensePlate.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(order => order.status === statusFilter.value)
  }

  if (dateFilter.value) {
    filtered = filtered.filter(order => 
      order.startDate <= dateFilter.value && order.endDate >= dateFilter.value
    )
  }

  return filtered
})

const getStatusClass = (status) => {
  const classes = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'active': 'bg-green-100 text-green-800',
    'completed': 'bg-gray-100 text-gray-800',
    'cancelled': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const viewOrder = (order) => {
  alert(`Viewing order #${order.id} details`)
}

const updateStatus = (order) => {
  const statuses = ['pending', 'confirmed', 'active', 'completed']
  const currentIndex = statuses.indexOf(order.status)
  if (currentIndex < statuses.length - 1) {
    order.status = statuses[currentIndex + 1]
  }
}

const cancelOrder = (order) => {
  if (confirm(`Are you sure you want to cancel order #${order.id}?`)) {
    order.status = 'cancelled'
  }
}

const exportOrders = () => {
  alert('Exporting orders to CSV...')
}

const saveOrder = () => {
  const newOrder = {
    id: String(orders.value.length + 1).padStart(3, '0'),
    customer: {
      name: 'New Customer',
      email: orderForm.value.customerEmail,
      avatar: `https://ui-avatars.com/api/?name=New+Customer&background=3b82f6&color=fff`
    },
    vehicle: {
      make: 'Unknown',
      model: 'Vehicle',
      licensePlate: orderForm.value.vehiclePlate
    },
    startDate: orderForm.value.startDate,
    endDate: orderForm.value.endDate,
    duration: Math.ceil((new Date(orderForm.value.endDate) - new Date(orderForm.value.startDate)) / (1000 * 60 * 60 * 24)),
    total: Math.ceil((new Date(orderForm.value.endDate) - new Date(orderForm.value.startDate)) / (1000 * 60 * 60 * 24)) * orderForm.value.dailyRate,
    status: 'pending'
  }
  orders.value.push(newOrder)
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  orderForm.value = {
    customerEmail: '',
    vehiclePlate: '',
    startDate: '',
    endDate: '',
    dailyRate: 50
  }
}
</script>