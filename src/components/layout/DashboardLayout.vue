<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
    <!-- Sidebar -->
    <DashboardSidebar />
    
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <DashboardHeader />
      
      <!-- Page Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DashboardSidebar from './DashboardSidebar.vue'
import DashboardHeader from './DashboardHeader.vue'
</script>