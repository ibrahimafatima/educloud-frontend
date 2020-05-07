import http from "../services/httpService";
import { url } from "../config.json";
import jwtDecode from "jwt-decode";

const adminApiEndpoint = url + "/admin/auth/login";
const teacherApiEndpoint = url + "/teacher/auth/login";
const studentApiEndpoint = url + "/student/auth/login";

export function adminLogin(admin) {
  return http.post(adminApiEndpoint, admin);
}

export function teacherLogin(teacher) {
  return http.post(teacherApiEndpoint, teacher);
}

export function studentLogin(registration_number, password) {
  return http.post(studentApiEndpoint, { registration_number, password });
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
