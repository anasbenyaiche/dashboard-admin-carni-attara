// Export all services from a single entry point
export { authService } from "./authService";
export { userService } from "./userService";
export { storeService } from "./storeService";
export { clientService } from "./clientService";
export { kridiService } from "./kridiService";
export { dashboardService } from "./dashboardService";

// Export the base API instance
export { default as api } from "./api";

// Constants for API usage
export const API_ENDPOINTS = {
  AUTH: "/auth",
  USERS: "/users",
  STORES: "/stores",
  CLIENTS: "/clients",
  KRIDI: "/kridi",
  HEALTH: "/health",
};

export const USER_ROLES = {
  ADMIN: "admin",
  ATTARA: "attara",
  WORKER: "worker",
  CLIENT: "client",
};

export const KRIDI_TYPES = {
  DEBT: "debt",
  PAYMENT: "payment",
};

export const KRIDI_STATUS = {
  UNPAID: "unpaid",
  PARTIAL: "partial",
  PAID: "paid",
};
