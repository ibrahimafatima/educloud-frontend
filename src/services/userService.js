import http from "./httpService";

const teacherApiEndpoint = "/teacher/auth/register";
const studentApiEndpoint = "/student/auth/register";

export function registerTeacher(teacher) {
  return http.post(teacherApiEndpoint, teacher);
}

export function registerStudent(student) {
  return http.post(studentApiEndpoint, student); ////https://edukloud.herokuapp.com/api
}
