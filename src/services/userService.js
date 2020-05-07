import http from "./httpService";
import { url } from "../config.json";

const teacherApiEndpoint = url + "/teacher/auth/register";
const studentApiEndpoint = url + "/student/auth/register";

export function registerTeacher(teacher) {
  return http.post(teacherApiEndpoint, teacher);
}

export function registerStudent(student) {
  return http.post(studentApiEndpoint, student); ////https://edukloud.herokuapp.com/api
}
