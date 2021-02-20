import http from "../services/httpService";
import jwtDecode from "jwt-decode";

const login = "/auth/login";
const register = "/auth/register";
const confirm = "/auth/confirm-account";
const resetPassword = "/auth/reset-password";

export function authLogin(user) {
  return http.post(login, user);
}

export function authRegistration(user) {
  return http.post(register, user);
}

export function authConfirmAccount(user) {
  return http.post(confirm, user);
}

export function authPasswordReset(user) {
  return http.post(resetPassword, user);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export default {
  getCurrentUser,
};
