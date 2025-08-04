<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          About Attara Carni Admin
        </h1>
        <p class="text-gray-600">
          Administrative dashboard for managing Attara, Carni, and Kridi
          platforms
        </p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div class="max-w-3xl mx-auto text-center">
        <div
          class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Modern Admin Dashboard
        </h2>
        <p class="text-gray-600 mb-8 leading-relaxed">
          This is a comprehensive administrative dashboard built with Vue 3,
          TypeScript, and Tailwind CSS. It provides a clean, professional
          interface for managing users, stores, orders, and analytics across the
          Attara, Carni, and Kridi platforms.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div class="bg-blue-50 p-6 rounded-lg">
            <h3 class="font-semibold text-blue-900 mb-2">
              🎨 Modern UI Design
            </h3>
            <p class="text-blue-700 text-sm">
              Clean, professional interface using Tailwind CSS with responsive
              design that works seamlessly on all devices.
            </p>
          </div>

          <div class="bg-green-50 p-6 rounded-lg">
            <h3 class="font-semibold text-green-900 mb-2">
              📊 Dashboard Overview
            </h3>
            <p class="text-green-700 text-sm">
              Real-time statistics, recent orders table, and interactive quick
              actions for efficient management.
            </p>
          </div>

          <div class="bg-purple-50 p-6 rounded-lg">
            <h3 class="font-semibold text-purple-900 mb-2">
              ⚡ Built with Vue 3
            </h3>
            <p class="text-purple-700 text-sm">
              Leverages the latest Vue 3 features with TypeScript for type
              safety and better development experience.
            </p>
          </div>

          <div class="bg-yellow-50 p-6 rounded-lg">
            <h3 class="font-semibold text-yellow-900 mb-2">
              🔧 Extensible Architecture
            </h3>
            <p class="text-yellow-700 text-sm">
              Modular design ready for Chart.js integration and additional
              features as your business grows.
            </p>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200">
          <p class="text-sm text-gray-500">
            Built with ❤️ using Vue 3, TypeScript, Tailwind CSS, and Vite
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// About page - no additional logic needed
</script>
