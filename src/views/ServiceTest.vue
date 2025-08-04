<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">
        Service Testing Dashboard
      </h1>

      <!-- Service Status Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            API Connection
          </h3>
          <div class="flex items-center">
            <div
              :class="
                apiStatus === 'connected'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              "
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ apiStatus === "connected" ? "Connected" : "Disconnected" }}
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-2">{{ apiMessage }}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            Dashboard Service
          </h3>
          <div class="flex items-center">
            <div
              :class="
                dashboardStatus === 'working'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              "
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ dashboardStatus === "working" ? "Working" : "Fallback Mode" }}
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-2">{{ dashboardMessage }}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            Services Loaded
          </h3>
          <div class="space-y-2">
            <div
              v-for="service in servicesList"
              :key="service.name"
              class="flex items-center justify-between"
            >
              <span class="text-sm text-gray-700">{{ service.name }}</span>
              <div
                :class="
                  service.loaded
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                "
                class="px-2 py-1 rounded text-xs font-medium"
              >
                {{ service.loaded ? "OK" : "Error" }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Test Dashboard Data -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Dashboard Data Test
        </h3>
        <button
          @click="testDashboardData"
          :disabled="testing"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md mb-4"
        >
          {{ testing ? "Testing..." : "Test Dashboard Data" }}
        </button>

        <div v-if="dashboardTestResult" class="mt-4">
          <h4 class="font-medium text-gray-900 mb-2">Test Result:</h4>
          <pre class="bg-gray-100 p-4 rounded-md text-sm overflow-auto">{{
            JSON.stringify(dashboardTestResult, null, 2)
          }}</pre>
        </div>
      </div>

      <!-- Console Logs -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Console Logs</h3>
        <div
          class="bg-black text-green-400 p-4 rounded-md font-mono text-sm h-64 overflow-auto"
        >
          <div v-for="(log, index) in consoleLogs" :key="index" class="mb-1">
            <span class="text-gray-500">[{{ log.timestamp }}]</span>
            <span
              :class="
                log.type === 'error'
                  ? 'text-red-400'
                  : log.type === 'warn'
                  ? 'text-yellow-400'
                  : 'text-green-400'
              "
            >
              {{ log.message }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { dashboardService } from "@/services";

const apiStatus = ref("checking");
const apiMessage = ref("Checking connection...");
const dashboardStatus = ref("checking");
const dashboardMessage = ref("Checking service...");
const testing = ref(false);
const dashboardTestResult = ref(null);
const consoleLogs = ref([]);

const servicesList = ref([
  { name: "API Service", loaded: false },
  { name: "Dashboard Service", loaded: false },
  { name: "Auth Service", loaded: false },
  { name: "User Service", loaded: false },
  { name: "Store Service", loaded: false },
  { name: "Client Service", loaded: false },
  { name: "Kridi Service", loaded: false },
]);

const addLog = (message: string, type: "info" | "warn" | "error" = "info") => {
  consoleLogs.value.push({
    timestamp: new Date().toLocaleTimeString(),
    message,
    type,
  });

  // Keep only last 50 logs
  if (consoleLogs.value.length > 50) {
    consoleLogs.value = consoleLogs.value.slice(-50);
  }
};

const checkServices = async () => {
  addLog("Starting service checks...");

  // Check if services are imported correctly
  try {
    if (dashboardService) {
      servicesList.value[1].loaded = true;
      addLog("✓ Dashboard Service loaded");
      dashboardStatus.value = "working";
      dashboardMessage.value = "Service methods available";
    }
  } catch (error) {
    addLog(`✗ Dashboard Service error: ${error.message}`, "error");
    dashboardStatus.value = "error";
    dashboardMessage.value = "Service loading failed";
  }

  // Test API connection
  try {
    await dashboardService.getSystemHealth();
    apiStatus.value = "connected";
    apiMessage.value = "Backend API is reachable";
    addLog("✓ API connection successful");
  } catch (error) {
    apiStatus.value = "disconnected";
    apiMessage.value = "Backend API not available (will use fallback data)";
    addLog(`⚠ API connection failed: ${error.message}`, "warn");
  }
};

const testDashboardData = async () => {
  testing.value = true;
  dashboardTestResult.value = null;
  addLog("Testing dashboard data retrieval...");

  try {
    const data = await dashboardService.getDashboardData();
    dashboardTestResult.value = data;
    addLog("✓ Dashboard data retrieved successfully");
  } catch (error) {
    dashboardTestResult.value = { error: error.message };
    addLog(`✗ Dashboard data test failed: ${error.message}`, "error");
  } finally {
    testing.value = false;
  }
};

onMounted(() => {
  addLog("Service testing component mounted");
  checkServices();
});
</script>
