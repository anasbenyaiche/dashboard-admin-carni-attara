import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Global auth state
const authToken = ref(localStorage.getItem("auth_token"));
const userData = ref(JSON.parse(localStorage.getItem("user_data") || "null"));

export function useAuth() {
  const router = useRouter();

  // Computed properties
  const isAuthenticated = computed(() => !!authToken.value);
  const user = computed(() => userData.value);

  // Methods
  const login = (token, user) => {
    authToken.value = token;
    userData.value = user;

    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_data", JSON.stringify(user));
  };

  const logout = () => {
    authToken.value = null;
    userData.value = null;

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");

    router.push("/login");
  };

  const checkAuth = () => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user_data");

    if (token && user) {
      authToken.value = token;
      userData.value = JSON.parse(user);
      return true;
    }

    return false;
  };

  return {
    // State
    isAuthenticated,
    user,
    authToken: computed(() => authToken.value),

    // Methods
    login,
    logout,
    checkAuth,
  };
}
