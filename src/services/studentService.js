import http from "./httpService";
import { url } from "../config.json";

const studentProfile = url + "/teacher/student";
const studentProfileUpdate = url + "/student/profile";
const studentCourse = url + "/teacher/course";
const studentMark = url + "/teacher/post-mark";
const studentAccountConfirmation = url + "/student/auth";
const studentBirthday = url + "/student/birthday";
const studentChat = url + "/student/message";
const discussion = url + "/discussion";

export function getStudent(id) {
  return http.get(studentProfile + "/reg/" + id);
}

export function completeProfile(profile) {
  return http.put(studentProfileUpdate + "/me/", profile);
}

export function getCourses(id) {
  return http.get(studentCourse + "/student/" + id);
}

export function getMarks(id) {
  return http.get(studentMark + "/" + id);
}

export function getMark(id) {
  return http.get(studentMark + "/mark/" + id);
}

export function removeMark(id) {
  return http.delete(studentMark + "/" + id);
}

export function confirmAccount(confirmationInfo) {
  return http.post(
    studentAccountConfirmation + "/confirm-account",
    confirmationInfo
  );
}

export function resetPassword(username) {
  return http.post(studentAccountConfirmation + "/reset-password", username);
}

export function getStudentBirthday() {
  return http.get(studentBirthday);
}

export function sendMessage(message) {
  return http.post(studentChat, message);
}

export function getMessages() {
  return http.get(studentChat);
}

export function getDiscussions(classe) {
  return http.get(discussion + "/teacher/" + classe);
}

export function saveDiscussions(classe, message) {
  return http.post(discussion + "/teacher/" + classe, message);
}
