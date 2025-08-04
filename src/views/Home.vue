<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="flex items-center space-x-3">
        <div
          class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"
        ></div>
        <span class="text-gray-600">Loading dashboard data...</span>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-if="error"
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
    >
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        {{ error }}
      </div>
    </div>

    <!-- Dashboard Content -->
    <div v-if="!loading">
      <!-- Dashboard Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p class="text-gray-600">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div class="text-sm text-gray-500">
          {{ currentDate }}
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Users Card -->
        <div
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Users</p>
              <p class="text-3xl font-bold text-gray-900">
                {{ stats.totalUsers.toLocaleString() }}
              </p>
              <p class="text-sm text-green-600 flex items-center mt-2">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                +12% from last month
              </p>
            </div>
            <div
              class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Stores Card -->
        <div
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Active Stores</p>
              <p class="text-3xl font-bold text-gray-900">
                {{ stats.totalStores.toLocaleString() }}
              </p>
              <p class="text-sm text-green-600 flex items-center mt-2">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                +8% from last month
              </p>
            </div>
            <div
              class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Attara Metrics Card -->
        <div
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Attara Metrics</p>
              <p class="text-3xl font-bold text-gray-900">
                {{ stats.attaraMetrics.toLocaleString() }}
              </p>
              <p class="text-sm text-yellow-600 flex items-center mt-2">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                -2% from last month
              </p>
            </div>
            <div
              class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Kridi Metrics Card -->
        <div
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Kridi Metrics</p>
              <p class="text-3xl font-bold text-gray-900">
                {{ stats.kridiMetrics.toLocaleString() }}
              </p>
              <p class="text-sm text-green-600 flex items-center mt-2">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                +15% from last month
              </p>
            </div>
            <div
              class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue Overview -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-900">Revenue Overview</h2>
          <div class="flex space-x-2">
            <button
              class="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md"
            >
              7D
            </button>
            <button
              class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
            >
              30D
            </button>
            <button
              class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
            >
              90D
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <!-- Chart Placeholder -->
            <div
              class="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
            >
              <div class="text-center">
                <svg
                  class="w-12 h-12 text-gray-400 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p class="text-gray-500 text-sm">
                  Chart.js Integration Coming Soon
                </p>
                <p class="text-gray-400 text-xs mt-1">
                  Revenue trends and analytics will be displayed here
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <p class="text-2xl font-bold text-blue-600">
                ${{ stats.totalRevenue.toLocaleString() }}
              </p>
              <p class="text-sm text-blue-600">Total Revenue</p>
            </div>
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <p class="text-2xl font-bold text-green-600">
                ${{ stats.monthlyRevenue.toLocaleString() }}
              </p>
              <p class="text-sm text-green-600">This Month</p>
            </div>
            <div class="text-center p-4 bg-yellow-50 rounded-lg">
              <p class="text-2xl font-bold text-yellow-600">
                ${{ stats.dailyRevenue.toLocaleString() }}
              </p>
              <p class="text-sm text-yellow-600">Today</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions & Recent Transactions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div class="space-y-3">
            <button
              class="w-full flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New User
            </button>

            <button
              class="w-full flex items-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Create Store
            </button>

            <button
              class="w-full flex items-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              View Analytics
            </button>

            <button
              class="w-full flex items-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </button>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div
          class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h2>
            <button
              class="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-2 text-sm font-medium text-gray-600">
                    Transaction ID
                  </th>
                  <th class="text-left py-2 text-sm font-medium text-gray-600">
                    Customer
                  </th>
                  <th class="text-left py-2 text-sm font-medium text-gray-600">
                    Store
                  </th>
                  <th class="text-left py-2 text-sm font-medium text-gray-600">
                    Amount
                  </th>
                  <th class="text-left py-2 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th class="text-left py-2 text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="transaction in recentTransactions"
                  :key="transaction.id"
                  class="hover:bg-gray-50"
                >
                  <td class="py-3 text-sm font-medium text-blue-600">
                    #{{ transaction.id }}
                  </td>
                  <td class="py-3 text-sm text-gray-900">
                    {{ transaction.customer }}
                  </td>
                  <td class="py-3 text-sm text-gray-600">
                    {{ transaction.store }}
                  </td>
                  <td class="py-3 text-sm font-medium text-gray-900">
                    ${{ transaction.amount }}
                  </td>
                  <td class="py-3">
                    <span
                      :class="getStatusColor(transaction.status)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ transaction.status }}
                    </span>
                  </td>
                  <td class="py-3">
                    <button
                      class="text-blue-600 hover:text-blue-700 text-sm font-medium mr-3"
                    >
                      View
                    </button>
                    <button
                      class="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Process
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- End of dashboard content -->
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { dashboardService } from "@/services";

// Loading states
const loading = ref(false);
const error = ref<string | null>(null);

// Reactive data
const stats = ref({
  totalUsers: 0,
  totalStores: 0,
  attaraMetrics: 0,
  kridiMetrics: 0,
  totalRevenue: 0,
  monthlyRevenue: 0,
  dailyRevenue: 0,
});

const recentTransactions = ref([]);

// Computed properties
const currentDate = computed(() => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Methods
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const loadDashboardData = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Fetch dashboard data using the correct method
    const dashboardData = await dashboardService.getDashboardData();

    // Update stats with real data
    stats.value = {
      totalUsers: dashboardData.stats.totalUsers || 0,
      totalStores: dashboardData.stats.totalStores || 0,
      attaraMetrics: dashboardData.stats.attaraMetrics || 0,
      kridiMetrics: dashboardData.stats.kridiMetrics || 0,
      totalRevenue: dashboardData.stats.totalRevenue || 0,
      monthlyRevenue: dashboardData.stats.monthlyRevenue || 0,
      dailyRevenue: dashboardData.stats.dailyRevenue || 0,
    };

    // Update recent transactions from dashboard data
    const transactions = Array.isArray(dashboardData.recentTransactions)
      ? dashboardData.recentTransactions
      : [];

    recentTransactions.value = transactions.map((transaction: any) => ({
      id: transaction._id || transaction.id || `tx-${Date.now()}`,
      customer:
        transaction.clientName || transaction.customer || "Unknown Customer",
      store: transaction.storeName || "Main Store",
      amount: formatAmount(transaction.amount || 0),
      status: transaction.status || transaction.paymentStatus || "Pending",
    }));
  } catch (err) {
    console.error("Error loading dashboard data:", err);
    error.value = "Failed to load dashboard data. Using default values.";

    // Set fallback data if API fails
    stats.value = {
      totalUsers: 12540,
      totalStores: 487,
      attaraMetrics: 8932,
      kridiMetrics: 15678,
      totalRevenue: 284750,
      monthlyRevenue: 45620,
      dailyRevenue: 2840,
    };

    recentTransactions.value = [
      {
        id: "10234",
        customer: "Ahmad Hassan",
        store: "Attara Store 1",
        amount: "$125.50",
        status: "Completed",
      },
      {
        id: "10235",
        customer: "Sarah Ali",
        store: "Carni Market",
        amount: "$89.25",
        status: "Processing",
      },
      {
        id: "10236",
        customer: "Mohammed Khan",
        store: "Kridi Center",
        amount: "$256.00",
        status: "Pending",
      },
    ];
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  loadDashboardData();
});
</script>
