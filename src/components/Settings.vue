<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="mt-1 text-sm text-gray-600">Manage your application settings and preferences</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Settings Navigation -->
      <div class="lg:col-span-1">
        <div class="card">
          <nav class="space-y-1">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              ]"
            >
              <component :is="tab.icon" class="w-5 h-5 mr-3" />
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-2">
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
          <form @submit.prevent="saveSettings" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Application Name</label>
              <input
                v-model="settings.general.appName"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                v-model="settings.general.companyName"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                v-model="settings.general.contactEmail"
                type="email"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Time Zone</label>
              <select
                v-model="settings.general.timezone"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
            <div class="flex items-center">
              <input
                v-model="settings.general.maintenanceMode"
                id="maintenance"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              >
              <label for="maintenance" class="ml-2 block text-sm text-gray-900">
                Enable Maintenance Mode
              </label>
            </div>
            <button type="submit" class="btn-primary">Save Changes</button>
          </form>
        </div>

        <!-- Notifications Settings -->
        <div v-if="activeTab === 'notifications'" class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
          <form @submit.prevent="saveSettings" class="space-y-4">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-gray-900">Email Notifications</label>
                  <p class="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <input
                  v-model="settings.notifications.email"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                >
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-gray-900">SMS Notifications</label>
                  <p class="text-sm text-gray-500">Receive notifications via SMS</p>
                </div>
                <input
                  v-model="settings.notifications.sms"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                >
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-gray-900">Push Notifications</label>
                  <p class="text-sm text-gray-500">Receive push notifications in browser</p>
                </div>
                <input
                  v-model="settings.notifications.push"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                >
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-gray-900">Order Updates</label>
                  <p class="text-sm text-gray-500">Get notified about order status changes</p>
                </div>
                <input
                  v-model="settings.notifications.orderUpdates"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                >
              </div>
            </div>
            <button type="submit" class="btn-primary">Save Changes</button>
          </form>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
          <form @submit.prevent="saveSettings" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">New Password</label>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div class="flex items-center">
              <input
                v-model="settings.security.twoFactorAuth"
                id="2fa"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              >
              <label for="2fa" class="ml-2 block text-sm text-gray-900">
                Enable Two-Factor Authentication
              </label>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
              <input
                v-model="settings.security.sessionTimeout"
                type="number"
                min="5"
                max="1440"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <button type="submit" class="btn-primary">Update Security Settings</button>
          </form>
        </div>

        <!-- Billing Settings -->
        <div v-if="activeTab === 'billing'" class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Billing Settings</h3>
          <form @submit.prevent="saveSettings" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Default Currency</label>
              <select
                v-model="settings.billing.currency"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
              <input
                v-model="settings.billing.taxRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Payment Terms (days)</label>
              <input
                v-model="settings.billing.paymentTerms"
                type="number"
                min="1"
                max="90"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
            </div>
            <div class="flex items-center">
              <input
                v-model="settings.billing.autoInvoicing"
                id="auto-invoice"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              >
              <label for="auto-invoice" class="ml-2 block text-sm text-gray-900">
                Enable Automatic Invoicing
              </label>
            </div>
            <button type="submit" class="btn-primary">Save Billing Settings</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'

const activeTab = ref('general')

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Tab configuration
const tabs = ref([
  {
    id: 'general',
    name: 'General',
    icon: markRaw({
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
        </path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>`
    })
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: markRaw({
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
        </path>
      </svg>`
    })
  },
  {
    id: 'security',
    name: 'Security',
    icon: markRaw({
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
        </path>
      </svg>`
    })
  },
  {
    id: 'billing',
    name: 'Billing',
    icon: markRaw({
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z">
        </path>
      </svg>`
    })
  }
])

// Settings data
const settings = ref({
  general: {
    appName: 'Carni Attara Admin',
    companyName: 'Carni Attara Car Rental',
    contactEmail: 'admin@carniattara.com',
    timezone: 'UTC',
    maintenanceMode: false
  },
  notifications: {
    email: true,
    sms: false,
    push: true,
    orderUpdates: true
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 60
  },
  billing: {
    currency: 'USD',
    taxRate: 8.5,
    paymentTerms: 30,
    autoInvoicing: true
  }
})

const saveSettings = () => {
  // Here you would typically make an API call to save the settings
  alert('Settings saved successfully!')
}
</script>