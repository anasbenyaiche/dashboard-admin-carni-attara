<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Store Management</h1>
        <p class="text-gray-600">
          Manage Attara and Carni stores across all locations
        </p>
      </div>
      <div class="flex items-center space-x-3">
        <button
          @click="refreshStores"
          class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
          :disabled="loading"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Refresh</span>
        </button>
        <button
          @click="exportStores"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Export</span>
        </button>
        <button
          @click="showAddStoreModal = true"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add Store</span>
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
    >
      <div class="flex">
        <svg
          class="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="ml-3">
          <p class="text-sm text-yellow-800">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Search Stores</label
          >
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, location, owner..."
              class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <svg
              class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Brand Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Brand</label
          >
          <select
            v-model="selectedBrand"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Brands</option>
            <option value="Attara">Attara</option>
            <option value="Carni">Carni</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status</label
          >
          <select
            v-model="selectedStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="closed">Closed</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>{{ filteredStores.length }} stores found</span>
        <button
          v-if="searchQuery || selectedBrand || selectedStatus"
          @click="clearFilters"
          class="text-blue-600 hover:text-blue-800"
        >
          Clear filters
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
      ></div>
      <p class="text-gray-600">Loading stores...</p>
    </div>

    <!-- Stores Table -->
    <div
      v-else
      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <!-- Table Header -->
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 class="text-lg font-medium text-gray-900">Store Directory</h3>
        <p class="text-sm text-gray-600">
          Complete list of all Attara and Carni store locations
        </p>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Store Information
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Owner Details
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Brand & Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Performance
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="store in paginatedStores"
              :key="store.id"
              class="hover:bg-gray-50"
            >
              <!-- Store Information -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12">
                    <div
                      v-if="store.logo"
                      class="h-12 w-12 rounded-lg bg-cover bg-center border border-gray-200"
                      :style="{ backgroundImage: `url(${store.logo})` }"
                    ></div>
                    <div
                      v-else
                      class="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center"
                    >
                      <span class="text-white font-bold text-lg">
                        {{ getStoreInitials(store.name) }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ store.name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ store.code }}</div>
                    <div class="text-xs text-gray-400">
                      {{ store.description }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Owner Details -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  <div class="font-medium">{{ store.owner.name }}</div>
                  <div class="text-gray-500">{{ store.owner.email }}</div>
                  <div class="text-gray-400">{{ store.owner.phone }}</div>
                  <div class="text-xs text-gray-400 mt-1">
                    Owner since {{ formatDate(store.owner.joinedAt) }}
                  </div>
                </div>
              </td>

              <!-- Location -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  <div class="font-medium">{{ store.location.city }}</div>
                  <div class="text-gray-500">{{ store.location.address }}</div>
                  <div class="text-gray-400">{{ store.location.country }}</div>
                  <div class="text-xs text-gray-400 mt-1">
                    {{ store.location.zipCode }}
                  </div>
                </div>
              </td>

              <!-- Brand & Type -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="space-y-1">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getBrandColor(store.brand)"
                  >
                    {{ store.brand }}
                  </span>
                  <div class="text-xs text-gray-500">{{ store.type }}</div>
                  <div class="text-xs text-gray-400">
                    {{ store.size }} sq ft
                  </div>
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="space-y-1">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusColor(store.status)"
                  >
                    {{ store.status }}
                  </span>
                  <div class="text-xs text-gray-500">
                    {{ store.openingHours }}
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ store.employeeCount }} employees
                  </div>
                </div>
              </td>

              <!-- Performance -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  <div class="font-medium">
                    ${{ formatNumber(store.monthlyRevenue) }}
                  </div>
                  <div class="text-gray-500">
                    {{ store.monthlyOrders }} orders
                  </div>
                  <div class="flex items-center mt-1">
                    <span class="text-xs text-gray-400">Rating:</span>
                    <div class="flex items-center ml-1">
                      <span class="text-yellow-400">★</span>
                      <span class="text-xs text-gray-600 ml-1">{{
                        store.rating
                      }}</span>
                    </div>
                  </div>
                </div>
              </td>

              <!-- Actions -->
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex items-center justify-end space-x-2">
                  <!-- View Details -->
                  <button
                    @click="viewStore(store)"
                    class="text-blue-600 hover:text-blue-900 p-1 rounded"
                    title="View Details"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>

                  <!-- Edit -->
                  <button
                    @click="editStore(store)"
                    class="text-green-600 hover:text-green-900 p-1 rounded"
                    title="Edit Store"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>

                  <!-- Toggle Status -->
                  <button
                    @click="toggleStoreStatus(store)"
                    :class="
                      store.status === 'active'
                        ? 'text-yellow-600 hover:text-yellow-900'
                        : 'text-green-600 hover:text-green-900'
                    "
                    class="p-1 rounded"
                    :title="
                      store.status === 'active'
                        ? 'Deactivate Store'
                        : 'Activate Store'
                    "
                  >
                    <svg
                      v-if="store.status === 'active'"
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 9V6a4 4 0 118 0v3M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                  </button>

                  <!-- Delete -->
                  <button
                    @click="deleteStore(store)"
                    class="text-red-600 hover:text-red-900 p-1 rounded"
                    title="Delete Store"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredStores.length === 0" class="text-center py-12">
        <svg
          class="w-16 h-16 text-gray-400 mx-auto mb-4"
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
        <h3 class="text-lg font-medium text-gray-900 mb-2">No stores found</h3>
        <p class="text-gray-500 mb-4">
          {{
            searchQuery || selectedBrand || selectedStatus
              ? "Try adjusting your filters"
              : "Get started by adding your first store"
          }}
        </p>
        <button
          v-if="!searchQuery && !selectedBrand && !selectedStatus"
          @click="showAddStoreModal = true"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add First Store
        </button>
      </div>

      <!-- Pagination -->
      <div
        v-if="filteredStores.length > pageSize"
        class="px-6 py-4 border-t border-gray-200 bg-gray-50"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (currentPage - 1) * pageSize + 1 }} to
            {{ Math.min(currentPage * pageSize, filteredStores.length) }} of
            {{ filteredStores.length }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="px-3 py-1 text-sm bg-green-600 text-white rounded">
              {{ currentPage }}
            </span>
            <button
              @click="currentPage++"
              :disabled="currentPage >= totalPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Store Details Modal -->
    <div v-if="showStoreModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="showStoreModal = false"
        ></div>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Store Details</h3>
              <button
                @click="showStoreModal = false"
                class="text-gray-400 hover:text-gray-600"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div v-if="selectedStore" class="space-y-6">
              <!-- Store Info Grid -->
              <div class="grid grid-cols-2 gap-6">
                <!-- Basic Information -->
                <div class="space-y-4">
                  <h4 class="text-sm font-medium text-gray-900 border-b pb-2">
                    Basic Information
                  </h4>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Store Name</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.name }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Store Code</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.code }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Brand</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.brand }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Type</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.type }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Size</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.size }} sq ft
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Status</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.status }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Owner Information -->
                <div class="space-y-4">
                  <h4 class="text-sm font-medium text-gray-900 border-b pb-2">
                    Owner Information
                  </h4>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Owner Name</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.owner.name }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Email</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.owner.email }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Phone</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.owner.phone }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Joined Date</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ formatDate(selectedStore.owner.joinedAt) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Location & Performance -->
              <div class="grid grid-cols-2 gap-6">
                <!-- Location Details -->
                <div class="space-y-4">
                  <h4 class="text-sm font-medium text-gray-900 border-b pb-2">
                    Location Details
                  </h4>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Address</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.location.address }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >City</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.location.city }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Country</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.location.country }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Zip Code</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.location.zipCode }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Performance Metrics -->
                <div class="space-y-4">
                  <h4 class="text-sm font-medium text-gray-900 border-b pb-2">
                    Performance Metrics
                  </h4>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Monthly Revenue</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        ${{ formatNumber(selectedStore.monthlyRevenue) }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Monthly Orders</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.monthlyOrders }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Employee Count</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.employeeCount }}
                      </p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Rating</label
                      >
                      <p class="mt-1 text-sm text-gray-900">
                        {{ selectedStore.rating }} ★
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional Details -->
              <div>
                <h4
                  class="text-sm font-medium text-gray-900 border-b pb-2 mb-4"
                >
                  Additional Details
                </h4>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Opening Hours</label
                    >
                    <p class="mt-1 text-sm text-gray-900">
                      {{ selectedStore.openingHours }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Description</label
                    >
                    <p class="mt-1 text-sm text-gray-900">
                      {{ selectedStore.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { storeService } from "@/services";

// State
const loading = ref(false);
const error = ref("");
const stores = ref([]);
const searchQuery = ref("");
const selectedBrand = ref("");
const selectedStatus = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const showStoreModal = ref(false);
const showAddStoreModal = ref(false);
const selectedStore = ref(null);

// Mock data (will be replaced with real API data)
const mockStores = [
  {
    id: "1",
    name: "Attara Downtown",
    code: "ATT-DT-001",
    description: "Premium flagship store in downtown area",
    brand: "Attara",
    type: "Flagship",
    status: "active",
    size: 2500,
    rating: 4.8,
    monthlyRevenue: 125000,
    monthlyOrders: 450,
    employeeCount: 15,
    openingHours: "9:00 AM - 10:00 PM",
    logo: null,
    owner: {
      name: "Sarah Johnson",
      email: "sarah.johnson@attara.com",
      phone: "+1 (555) 123-4567",
      joinedAt: "2023-01-15T10:00:00Z",
    },
    location: {
      address: "123 Main Street, Suite 100",
      city: "New York",
      country: "United States",
      zipCode: "10001",
    },
    createdAt: "2023-01-20T08:00:00Z",
  },
  {
    id: "2",
    name: "Carni Mall Plaza",
    code: "CAR-MP-002",
    description: "Large retail space in shopping mall",
    brand: "Carni",
    type: "Mall Store",
    status: "active",
    size: 1800,
    rating: 4.5,
    monthlyRevenue: 89000,
    monthlyOrders: 320,
    employeeCount: 12,
    openingHours: "10:00 AM - 9:00 PM",
    logo: null,
    owner: {
      name: "Michael Rodriguez",
      email: "michael.rodriguez@carni.com",
      phone: "+1 (555) 234-5678",
      joinedAt: "2023-03-10T14:00:00Z",
    },
    location: {
      address: "456 Shopping Center Blvd",
      city: "Los Angeles",
      country: "United States",
      zipCode: "90210",
    },
    createdAt: "2023-03-15T12:00:00Z",
  },
  {
    id: "3",
    name: "Attara Express",
    code: "ATT-EX-003",
    description: "Quick service location for busy professionals",
    brand: "Attara",
    type: "Express",
    status: "active",
    size: 800,
    rating: 4.3,
    monthlyRevenue: 45000,
    monthlyOrders: 180,
    employeeCount: 6,
    openingHours: "7:00 AM - 7:00 PM",
    logo: null,
    owner: {
      name: "Emma Chen",
      email: "emma.chen@attara.com",
      phone: "+1 (555) 345-6789",
      joinedAt: "2023-05-20T09:00:00Z",
    },
    location: {
      address: "789 Business District Ave",
      city: "Chicago",
      country: "United States",
      zipCode: "60601",
    },
    createdAt: "2023-05-25T11:00:00Z",
  },
  {
    id: "4",
    name: "Carni Riverside",
    code: "CAR-RV-004",
    description: "Scenic location with outdoor seating",
    brand: "Carni",
    type: "Casual Dining",
    status: "maintenance",
    size: 3200,
    rating: 4.7,
    monthlyRevenue: 156000,
    monthlyOrders: 520,
    employeeCount: 22,
    openingHours: "Temporarily Closed",
    logo: null,
    owner: {
      name: "David Thompson",
      email: "david.thompson@carni.com",
      phone: "+1 (555) 456-7890",
      joinedAt: "2022-08-12T16:00:00Z",
    },
    location: {
      address: "321 Riverside Drive",
      city: "Miami",
      country: "United States",
      zipCode: "33101",
    },
    createdAt: "2022-08-20T10:00:00Z",
  },
  {
    id: "5",
    name: "Attara Suburban",
    code: "ATT-SB-005",
    description: "Family-friendly location in residential area",
    brand: "Attara",
    type: "Family Store",
    status: "inactive",
    size: 2000,
    rating: 4.1,
    monthlyRevenue: 67000,
    monthlyOrders: 240,
    employeeCount: 10,
    openingHours: "Closed for Renovation",
    logo: null,
    owner: {
      name: "Lisa Williams",
      email: "lisa.williams@attara.com",
      phone: "+1 (555) 567-8901",
      joinedAt: "2023-07-05T13:00:00Z",
    },
    location: {
      address: "654 Suburban Lane",
      city: "Phoenix",
      country: "United States",
      zipCode: "85001",
    },
    createdAt: "2023-07-10T15:00:00Z",
  },
];

// Computed
const filteredStores = computed(() => {
  let filtered = stores.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (store) =>
        store.name.toLowerCase().includes(query) ||
        store.code.toLowerCase().includes(query) ||
        store.location.city.toLowerCase().includes(query) ||
        store.owner.name.toLowerCase().includes(query) ||
        store.brand.toLowerCase().includes(query)
    );
  }

  // Brand filter
  if (selectedBrand.value) {
    filtered = filtered.filter((store) => store.brand === selectedBrand.value);
  }

  // Status filter
  if (selectedStatus.value) {
    filtered = filtered.filter(
      (store) => store.status === selectedStatus.value
    );
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredStores.value.length / pageSize.value)
);

const paginatedStores = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredStores.value.slice(start, end);
});

// Methods
const getStoreInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getBrandColor = (brand: string) => {
  const colors = {
    Attara: "bg-blue-100 text-blue-800",
    Carni: "bg-green-100 text-green-800",
  };
  return colors[brand] || "bg-gray-100 text-gray-800";
};

const getStatusColor = (status: string) => {
  const colors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-yellow-100 text-yellow-800",
    closed: "bg-red-100 text-red-800",
    maintenance: "bg-orange-100 text-orange-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatNumber = (number: number) => {
  return number.toLocaleString("en-US");
};

const loadStores = async () => {
  try {
    loading.value = true;
    error.value = "";

    // Try to load from API
    const response = await storeService.getStore();
    // Handle different response structures
    if (response.data && response.data.stores) {
      stores.value = response.data.stores;
    } else if (response.data && Array.isArray(response.data)) {
      stores.value = response.data;
    } else if (Array.isArray(response)) {
      stores.value = response;
    } else {
      // Fallback to mock data
      stores.value = mockStores;
    }
  } catch (err) {
    console.error("Error loading stores:", err);
    // Use mock data when API is not available
    stores.value = mockStores;
    error.value = "Using demo data. Connect to backend for real store data.";
  } finally {
    loading.value = false;
  }
};

const refreshStores = () => {
  loadStores();
};

const exportStores = () => {
  // Will be implemented later with backend
  console.log("Export stores functionality will be implemented");
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedBrand.value = "";
  selectedStatus.value = "";
  currentPage.value = 1;
};

const viewStore = (store: any) => {
  selectedStore.value = store;
  showStoreModal.value = true;
};

const editStore = (store: any) => {
  // Will be implemented later
  console.log("Edit store:", store);
};

const toggleStoreStatus = async (store: any) => {
  try {
    const newStatus = store.status === "active" ? "inactive" : "active";

    // Note: Backend API call will be implemented later
    console.log(
      `${newStatus === "active" ? "Activating" : "Deactivating"} store:`,
      store
    );

    // Update local state for demo
    const storeIndex = stores.value.findIndex((s) => s.id === store.id);
    if (storeIndex !== -1) {
      stores.value[storeIndex].status = newStatus;
    }

    // Show success message
    const action = newStatus === "active" ? "activated" : "deactivated";
    console.log(`Store ${store.name} ${action}`);
  } catch (err) {
    console.error("Error updating store status:", err);
    error.value = "Failed to update store status";
  }
};

const deleteStore = (store: any) => {
  if (confirm(`Are you sure you want to delete store "${store.name}"?`)) {
    // Will be implemented later with backend
    console.log("Delete store:", store);
  }
};

// Lifecycle
onMounted(() => {
  loadStores();
});
</script>
