<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const route = useRoute();
const { isAuthenticated, logout } = useAuth();
const sidebarOpen = ref(false);

// Check if current route is login page
const isLoginPage = computed(() => route.name === "Login");

// Show sidebar only when authenticated and not on login page
const showSidebar = computed(() => isAuthenticated.value && !isLoginPage.value);

// Handle logout
const handleLogout = () => {
  logout();
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar - only show when authenticated and not on login page -->
    <div
      v-if="showSidebar"
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
      :class="
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      "
    >
      <div class="flex items-center justify-center h-16 bg-blue-600">
        <h1 class="text-xl font-bold text-white">Attara Carni Admin</h1>
      </div>

      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <router-link
            to="/"
            class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            active-class="bg-blue-50 text-blue-600 border-r-4 border-blue-600"
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
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
              />
            </svg>
            Dashboard
          </router-link>

          <router-link
            to="/users"
            class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            active-class="bg-blue-50 text-blue-600 border-r-4 border-blue-600"
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            Users
          </router-link>

          <router-link
            to="/stores"
            class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            active-class="bg-blue-50 text-blue-600 border-r-4 border-blue-600"
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
            Stores
          </router-link>

          <router-link
            to="/kridi"
            class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            active-class="bg-blue-50 text-blue-600 border-r-4 border-blue-600"
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
            Kridi
          </router-link>

          <router-link
            to="/analytics"
            class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
            active-class="bg-blue-50 text-blue-600 border-r-4 border-blue-600"
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
            Analytics
          </router-link>
        </div>
      </nav>
    </div>

    <!-- Main Content - conditional layout based on authentication -->
    <div v-if="showSidebar" class="lg:ml-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-6 py-4">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div class="flex items-center space-x-4">
            <div class="relative">
              <button class="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-5 5-5-5h5z"
                  />
                </svg>
              </button>
            </div>

            <div class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <span class="text-sm font-medium text-white">A</span>
              </div>
              <span class="text-sm font-medium text-gray-700">Admin User</span>

              <!-- Logout Button -->
              <button
                @click="handleLogout"
                class="ml-4 p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                title="Logout"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>

    <!-- Login Layout - full screen when not authenticated -->
    <div v-else>
      <router-view />
    </div>

    <!-- Mobile sidebar overlay -->
    <div
      v-if="showSidebar && sidebarOpen"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
      @click="sidebarOpen = false"
    ></div>
  </div>
</template>

<style scoped>
/* Tailwind classes are applied directly in template */
</style>
