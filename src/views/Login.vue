<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div>
        <div
          class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100"
        >
          <svg
            class="h-8 w-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Attara Carni Admin
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Sign in to your dashboard
        </p>
      </div>

      <!-- Error Message -->
      <div
        v-if="error"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"
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

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md"
      >
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          {{ successMessage }}
        </div>
      </div>

      <!-- Login Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': emailError }"
              placeholder="Email address"
            />
            <p v-if="emailError" class="mt-1 text-sm text-red-600">
              {{ emailError }}
            </p>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': passwordError }"
              placeholder="Password"
            />
            <p v-if="passwordError" class="mt-1 text-sm text-red-600">
              {{ passwordError }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                v-if="!loading"
                class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <div
                v-else
                class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
              ></div>
            </span>
            {{ loading ? "Signing in..." : "Sign in" }}
          </button>
        </div>

        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 class="text-sm font-medium text-blue-900 mb-2">
            Demo Credentials:
          </h3>
          <div class="text-sm text-blue-800 space-y-1">
            <p><strong>Email:</strong> admin@attaracarni.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
          <button
            type="button"
            @click="fillDemoCredentials"
            class="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Click to fill demo credentials
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/services";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { login: setAuth } = useAuth();

// Form data
const form = ref({
  email: "",
  password: "",
  rememberMe: false,
});

// State
const loading = ref(false);
const error = ref("");
const successMessage = ref("");

// Computed validation
const emailError = computed(() => {
  if (!form.value.email) return "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailPattern.test(form.value.email)
    ? "Please enter a valid email address"
    : "";
});

const passwordError = computed(() => {
  if (!form.value.password) return "";
  return form.value.password.length < 6
    ? "Password must be at least 6 characters"
    : "";
});

// Methods
const fillDemoCredentials = () => {
  form.value.email = "admin@attaracarni.com";
  form.value.password = "admin123";
};

const handleLogin = async () => {
  // Clear previous messages
  error.value = "";
  successMessage.value = "";

  // Validate form
  if (emailError.value || passwordError.value) {
    error.value = "Please fix the errors above";
    return;
  }

  if (!form.value.email || !form.value.password) {
    error.value = "Please fill in all required fields";
    return;
  }

  loading.value = true;

  try {
    // Attempt login with backend
    const response = await authService.login({
      email: form.value.email,
      password: form.value.password,
      rememberMe: form.value.rememberMe,
    });

    if (response.data && response.data.success) {
      successMessage.value = "Login successful! Redirecting...";

      // Use auth composable to set authentication state
      setAuth(response.data.token, response.data.user);

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  } catch (err: any) {
    console.error("Login error:", err);

    // Handle demo login (when backend is not available)
    if (
      form.value.email === "admin@attaracarni.com" &&
      form.value.password === "admin123"
    ) {
      successMessage.value = "Demo login successful! Redirecting...";

      // Create demo auth data
      const demoToken = "demo-token-" + Date.now();
      const demoUser = {
        id: "demo-user",
        name: "Demo Admin",
        email: "admin@attaracarni.com",
        role: "admin",
      };

      // Use auth composable to set authentication state
      setAuth(demoToken, demoUser);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      error.value =
        err.message || "Login failed. Please check your credentials.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
