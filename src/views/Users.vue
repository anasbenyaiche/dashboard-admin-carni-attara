<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
        <p class="text-gray-600">Manage users, roles, and permissions</p>
      </div>
      <button
        @click="showAddUserModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Add New User</span>
      </button>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Search Users</label
          >
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, email, or role..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <svg
              class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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

        <!-- Role Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Filter by Role</label
          >
          <select
            v-model="selectedRole"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
            <option value="client">Client</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Filter by Status</label
          >
          <select
            v-model="selectedStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blacklisted">Blacklisted</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="flex items-center space-x-3">
        <div
          class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"
        ></div>
        <span class="text-gray-600">Loading users...</span>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-if="error"
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
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

    <!-- Users Table -->
    <div
      v-if="!loading"
      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">
            Users ({{ filteredUsers.length }})
          </h3>
          <div class="flex items-center space-x-3">
            <button
              @click="refreshUsers"
              class="text-gray-600 hover:text-gray-900 p-1 rounded"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
            <button
              @click="exportUsers"
              class="text-gray-600 hover:text-gray-900 p-1 rounded"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Login
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Permissions
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
              v-for="user in paginatedUsers"
              :key="user.id"
              class="hover:bg-gray-50"
            >
              <!-- User Info -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      v-if="user.avatar"
                      class="h-10 w-10 rounded-full bg-cover bg-center"
                      :style="{ backgroundImage: `url(${user.avatar})` }"
                    ></div>
                    <div
                      v-else
                      class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center"
                    >
                      <span class="text-gray-600 font-medium text-sm">
                        {{ getInitials(user.name) }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                    <div v-if="user.phone" class="text-xs text-gray-400">
                      {{ user.phone }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Role -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getRoleColor(user.role)"
                >
                  {{ user.role }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusColor(user.status)"
                >
                  {{ user.status }}
                </span>
              </td>

              <!-- Created Date -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.createdAt) }}
              </td>

              <!-- Last Login -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.lastLogin ? formatDate(user.lastLogin) : "Never" }}
              </td>

              <!-- Permissions -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="permission in user.permissions?.slice(0, 2)"
                    :key="permission"
                    class="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                  >
                    {{ permission }}
                  </span>
                  <span
                    v-if="user.permissions?.length > 2"
                    class="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                  >
                    +{{ user.permissions.length - 2 }}
                  </span>
                </div>
              </td>

              <!-- Actions -->
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex items-center justify-end space-x-2">
                  <!-- View Details -->
                  <button
                    @click="viewUser(user)"
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
                    @click="editUser(user)"
                    class="text-green-600 hover:text-green-900 p-1 rounded"
                    title="Edit User"
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

                  <!-- Blacklist/Unblacklist -->
                  <button
                    @click="toggleBlacklist(user)"
                    :class="
                      user.status === 'blacklisted'
                        ? 'text-green-600 hover:text-green-900'
                        : 'text-red-600 hover:text-red-900'
                    "
                    class="p-1 rounded"
                    :title="
                      user.status === 'blacklisted'
                        ? 'Remove from Blacklist'
                        : 'Add to Blacklist'
                    "
                  >
                    <svg
                      v-if="user.status === 'blacklisted'"
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                      />
                    </svg>
                  </button>

                  <!-- Delete -->
                  <button
                    @click="deleteUser(user)"
                    class="text-red-600 hover:text-red-900 p-1 rounded"
                    title="Delete User"
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
      <div v-if="filteredUsers.length === 0" class="text-center py-12">
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3>
        <p class="text-gray-500 mb-4">
          {{
            searchQuery || selectedRole || selectedStatus
              ? "Try adjusting your filters"
              : "Get started by adding your first user"
          }}
        </p>
        <button
          v-if="!searchQuery && !selectedRole && !selectedStatus"
          @click="showAddUserModal = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add First User
        </button>
      </div>

      <!-- Pagination -->
      <div
        v-if="filteredUsers.length > pageSize"
        class="px-6 py-4 border-t border-gray-200 bg-gray-50"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (currentPage - 1) * pageSize + 1 }} to
            {{ Math.min(currentPage * pageSize, filteredUsers.length) }} of
            {{ filteredUsers.length }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="px-3 py-1 text-sm bg-blue-600 text-white rounded">
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

    <!-- User Details Modal -->
    <div v-if="showUserModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="showUserModal = false"
        ></div>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">User Details</h3>
              <button
                @click="showUserModal = false"
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

            <div v-if="selectedUser" class="space-y-4">
              <!-- User Info -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Name</label
                  >
                  <p class="mt-1 text-sm text-gray-900">
                    {{ selectedUser.name }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Email</label
                  >
                  <p class="mt-1 text-sm text-gray-900">
                    {{ selectedUser.email }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Phone</label
                  >
                  <p class="mt-1 text-sm text-gray-900">
                    {{ selectedUser.phone || "N/A" }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Role</label
                  >
                  <p class="mt-1 text-sm text-gray-900">
                    {{ selectedUser.role }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Status</label
                  >
                  <p class="mt-1 text-sm text-gray-900">
                    {{ selectedUser.status }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700"
                    >Created</label
                  >
                  <p class="mt-1 text-sm text-gray-900">
                    {{ formatDate(selectedUser.createdAt) }}
                  </p>
                </div>
              </div>

              <!-- Permissions -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Permissions</label
                >
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="permission in selectedUser.permissions"
                    :key="permission"
                    class="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                  >
                    {{ permission }}
                  </span>
                </div>
              </div>

              <!-- Additional Details -->
              <div v-if="selectedUser.address">
                <label class="block text-sm font-medium text-gray-700"
                  >Address</label
                >
                <p class="mt-1 text-sm text-gray-900">
                  {{ selectedUser.address }}
                </p>
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
import { userService } from "@/services";

// State
const loading = ref(false);
const error = ref("");
const users = ref([]);
const searchQuery = ref("");
const selectedRole = ref("");
const selectedStatus = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const showUserModal = ref(false);
const showAddUserModal = ref(false);
const selectedUser = ref(null);

// Mock data (will be replaced with real API data)
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    lastLogin: "2024-08-01T09:30:00Z",
    permissions: ["read", "write", "delete", "manage_users"],
    avatar: null,
    address: "123 Main St, City, Country",
  },
  {
    id: "2",
    name: "Sarah Manager",
    email: "sarah.manager@example.com",
    phone: "+1234567891",
    role: "manager",
    status: "active",
    createdAt: "2024-02-20T14:00:00Z",
    lastLogin: "2024-07-31T16:45:00Z",
    permissions: ["read", "write", "manage_stores"],
    avatar: null,
    address: "456 Store Ave, City, Country",
  },
  {
    id: "3",
    name: "Mike Client",
    email: "mike.client@example.com",
    phone: "+1234567892",
    role: "client",
    status: "active",
    createdAt: "2024-03-10T08:00:00Z",
    lastLogin: "2024-07-30T12:00:00Z",
    permissions: ["read", "create_orders"],
    avatar: null,
    address: "789 Client Rd, City, Country",
  },
  {
    id: "4",
    name: "Jane Blacklisted",
    email: "jane.blacklisted@example.com",
    phone: "+1234567893",
    role: "user",
    status: "blacklisted",
    createdAt: "2024-01-05T12:00:00Z",
    lastLogin: "2024-06-15T10:00:00Z",
    permissions: ["read"],
    avatar: null,
    address: "321 Blocked St, City, Country",
  },
  {
    id: "5",
    name: "Robert Inactive",
    email: "robert.inactive@example.com",
    phone: "+1234567894",
    role: "user",
    status: "inactive",
    createdAt: "2024-04-01T15:00:00Z",
    lastLogin: null,
    permissions: ["read"],
    avatar: null,
    address: "654 Inactive Blvd, City, Country",
  },
];

// Computed
const filteredUsers = computed(() => {
  let filtered = users.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
  }

  // Role filter
  if (selectedRole.value) {
    filtered = filtered.filter((user) => user.role === selectedRole.value);
  }

  // Status filter
  if (selectedStatus.value) {
    filtered = filtered.filter((user) => user.status === selectedStatus.value);
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / pageSize.value)
);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredUsers.value.slice(start, end);
});

// Methods
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getRoleColor = (role: string) => {
  const colors = {
    admin: "bg-red-100 text-red-800",
    manager: "bg-blue-100 text-blue-800",
    user: "bg-green-100 text-green-800",
    client: "bg-purple-100 text-purple-800",
  };
  return colors[role] || "bg-gray-100 text-gray-800";
};

const getStatusColor = (status: string) => {
  const colors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-yellow-100 text-yellow-800",
    blacklisted: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const loadUsers = async () => {
  try {
    loading.value = true;
    error.value = "";

    // Try to load from API
    const response = await userService.getUsers();
    // Handle different response structures
    if (response.data && response.data.users) {
      users.value = response.data.users;
    } else if (response.data && Array.isArray(response.data)) {
      users.value = response.data;
    } else if (Array.isArray(response)) {
      users.value = response;
    } else {
      // Fallback to mock data
      users.value = mockUsers;
    }
  } catch (err) {
    console.error("Error loading users:", err);
    // Use mock data when API is not available
    users.value = mockUsers;
    error.value = "Using demo data. Connect to backend for real user data.";
  } finally {
    loading.value = false;
  }
};

const refreshUsers = () => {
  loadUsers();
};

const exportUsers = () => {
  // Will be implemented later with backend
  console.log("Export users functionality will be implemented");
};

const viewUser = (user: any) => {
  selectedUser.value = user;
  showUserModal.value = true;
};

const editUser = (user: any) => {
  // Will be implemented later
  console.log("Edit user:", user);
};

const toggleBlacklist = async (user: any) => {
  try {
    const newStatus = user.status === "blacklisted" ? "active" : "blacklisted";

    // Note: Backend API call will be implemented later
    console.log(
      `${
        newStatus === "blacklisted" ? "Adding to" : "Removing from"
      } blacklist:`,
      user
    );

    // Update local state for demo
    const userIndex = users.value.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users.value[userIndex].status = newStatus;
    }

    // Show success message
    const action = newStatus === "blacklisted" ? "added to" : "removed from";
    console.log(`User ${user.name} ${action} blacklist`);
  } catch (err) {
    console.error("Error updating user status:", err);
    error.value = "Failed to update user status";
  }
};

const deleteUser = (user: any) => {
  if (confirm(`Are you sure you want to delete user "${user.name}"?`)) {
    // Will be implemented later with backend
    console.log("Delete user:", user);
  }
};

// Lifecycle
onMounted(() => {
  loadUsers();
});
</script>
