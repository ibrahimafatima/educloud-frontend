import http from "./httpService";
import { url } from "../config.json";

const adminAddTerm = url + "/term";
const adminAddClasse = url + "/classe";
const adminAddLevel = url + "/level";
const adminAddClassEndpoint = url + "/add/class";
const adminAddTeacherEndpoint = url + "/admin/teacher";
const adminStudentEndpoint = url + "/teacher/student";
const adminPaymentEndpoint = url + "/admin/payment";
const adminEventEndpoint = url + "/admin/event";
const adminExamEndpoint = url + "/schedule/exams";
const adminBookEndpoint = url + "/books";
const adminAccountConfirmation = url + "/admin/auth";

export function addClass(classe) {
  if (classe._id) {
    const body = { ...classe };
    delete body._id;
    return http.put(adminAddClassEndpoint + "/" + classe._id, body);
  }
  return http.post(adminAddClassEndpoint, classe);
}

export function getTerms() {
  return http.get(adminAddTerm);
}

export function getCls() {
  return http.get(adminAddClasse);
}

export function getLevel() {
  return http.get(adminAddLevel);
}

export function getClasses() {
  return http.get(adminAddClassEndpoint);
}

export function getClass(id) {
  return http.get(adminAddClassEndpoint + "/" + id);
}

export function addTeacher(teacher) {
  if (teacher._id) {
    const body = { ...teacher };
    delete body._id;
    return http.put(adminAddTeacherEndpoint + "/" + teacher._id, body);
  }
  return http.post(adminAddTeacherEndpoint, teacher);
}

export function getTeacher(id) {
  return http.get(adminAddTeacherEndpoint + "/" + id);
}

export function getATeacher(id) {
  return http.get(adminAddTeacherEndpoint + "/teacher/" + id);
}

export function getStudent(id) {
  return http.get(adminStudentEndpoint + "/reg/" + id);
}

export function getTeachers() {
  return http.get(adminAddTeacherEndpoint);
}

export function removeClass(id) {
  return http.delete(adminAddClassEndpoint + "/" + id);
}

export function removeTeacher(id) {
  return http.delete(adminAddTeacherEndpoint + "/" + id);
}

export function getStudents() {
  return http.get(adminStudentEndpoint);
}

export function payFee(paymentDetails) {
  return http.post(adminPaymentEndpoint, paymentDetails);
}

export function getPayment(id) {
  return http.get(adminPaymentEndpoint + "/" + id);
}

export function getPaymentDetails(id) {
  return http.get(adminPaymentEndpoint + "/info/" + id);
}

export function updatePaymentYear() {
  return http.put(adminPaymentEndpoint + "/next-year");
}

export function addToNoticeBoard(notice) {
  if (notice._id) {
    const body = { ...notice };
    delete body._id;
    return http.put(adminEventEndpoint + "/" + notice._id, body);
  }
  return http.post(adminEventEndpoint, notice);
}

export function getNoticeBoard() {
  return http.get(adminEventEndpoint);
}

export function getANotice(id) {
  return http.get(adminEventEndpoint + "/" + id);
}

export function removeNotice(id) {
  return http.delete(adminEventEndpoint + "/" + id);
}

export function getAllExam() {
  return http.get(adminExamEndpoint + "/admin");
}

export function addBook(book) {
  if (book._id) {
    const body = { ...book };
    delete body._id;
    return http.put(adminBookEndpoint + "/" + book._id, body);
  }
  return http.post(adminBookEndpoint, book);
}

export function getBooks() {
  return http.get(adminBookEndpoint);
}

export function removeBook(id) {
  return http.delete(adminBookEndpoint + "/" + id);
}

export function getBook(id) {
  return http.get(adminBookEndpoint + "/" + id);
}

export function confirmAccount(confirmationInfo) {
  return http.post(
    adminAccountConfirmation + "/confirm-account",
    confirmationInfo
  );
}

export function resetPassword(username) {
  return http.post(adminAccountConfirmation + "/reset-password", username);
}
