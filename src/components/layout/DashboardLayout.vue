<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Mobile sidebar overlay -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-40 lg:hidden" 
      @click="sidebarOpen = false"
    >
      <div class="fixed inset-0 bg-black opacity-50"></div>
    </div>

    <!-- Desktop & Mobile Layout -->
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <div :class="[
        'fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]">
        <DashboardSidebar @close="sidebarOpen = false" />
      </div>
      
      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <DashboardHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
        
        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-4 lg:p-6">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DashboardSidebar from './DashboardSidebar.vue'
import DashboardHeader from './DashboardHeader.vue'

const sidebarOpen = ref(false)

// Close sidebar on escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    sidebarOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>