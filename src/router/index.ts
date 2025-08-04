import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Users from "../views/Users.vue";
import Stores from "../views/Stores.vue";
import Kridi from "../views/Kridi.vue";
import Analytics from "../views/Analytics.vue";
import ServiceTest from "../views/ServiceTest.vue";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    redirect: "/",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { requiresAuth: true },
  },
  {
    path: "/stores",
    name: "Stores",
    component: Stores,
    meta: { requiresAuth: true },
  },
  {
    path: "/kridi",
    name: "Kridi",
    component: Kridi,
    meta: { requiresAuth: true },
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: Analytics,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { requiresAuth: true },
  },
  {
    path: "/service-test",
    name: "ServiceTest",
    component: ServiceTest,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("auth_token");
  const isAuthenticated = !!token;

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  }
  // If user is authenticated and trying to access login page
  else if (to.name === "Login" && isAuthenticated) {
    next("/");
  }
  // Otherwise, allow navigation
  else {
    next();
  }
});

export default router;
