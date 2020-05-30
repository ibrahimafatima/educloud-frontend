import http from "./httpService";

const adminAddTerm = "/term";
const adminAddClasse = "/classe";
const adminAddLevel = "/level";
const adminAddClassEndpoint = "/add/class";
const adminAddTeacherEndpoint = "/admin/teacher";
const adminStudentEndpoint = "/teacher/student";
const adminPaymentEndpoint = "/admin/payment";
const adminEventEndpoint = "/admin/event";
const adminExamEndpoint = "/schedule/exams";
const adminBookEndpoint = "/books";
const adminAccountConfirmation = "/admin/auth";

export function addClass(classe) {
  if (classe._id) {
    const body = { ...classe };
    delete body._id;
    return http.put(adminAddClassEndpoint + "/update/" + classe._id, body);
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
  return http.get(adminAddClassEndpoint + "/get/" + id);
}

export function addTeacher(teacher) {
  if (teacher._id) {
    const body = { ...teacher };
    delete body._id;
    return http.put(adminAddTeacherEndpoint + "/update/" + teacher._id, body);
  }
  return http.post(adminAddTeacherEndpoint, teacher);
}

export function getTeacher(id) {
  return http.get(adminAddTeacherEndpoint + "/get/" + id);
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
  return http.delete(adminAddClassEndpoint + "/delete/" + id);
}

export function removeTeacher(id) {
  return http.delete(adminAddTeacherEndpoint + "/delete/" + id);
}

export function getStudents() {
  return http.get(adminStudentEndpoint);
}

export function payFee(paymentDetails) {
  return http.post(adminPaymentEndpoint, paymentDetails);
}

export function getPayment(id) {
  return http.get(adminPaymentEndpoint + "/get/" + id);
}

export function getPaymentDetails(id) {
  return http.get(adminPaymentEndpoint + "/info/" + id);
}

export function updatePaymentYear() {
  return http.put(adminPaymentEndpoint + "/next-year");
}

export function updateExamYear() {
  return http.put(adminExamEndpoint + "/next-year");
}

export function addToNoticeBoard(notice) {
  if (notice._id) {
    const body = { ...notice };
    delete body._id;
    return http.put(adminEventEndpoint + "/update/" + notice._id, body);
  }
  return http.post(adminEventEndpoint, notice);
}

export function getNoticeBoard() {
  return http.get(adminEventEndpoint);
}

export function getSchoolsEvent() {
  return http.get(adminEventEndpoint + "/all-events");
}

export function getANotice(id) {
  return http.get(adminEventEndpoint + "/get/" + id);
}

export function removeNotice(id) {
  return http.delete(adminEventEndpoint + "/delete/" + id);
}

export function getAllExam() {
  return http.get(adminExamEndpoint + "/admin");
}

export function addBook(book) {
  if (book._id) {
    const body = { ...book };
    delete body._id;
    return http.put(adminBookEndpoint + "/update/" + book._id, body);
  }
  return http.post(adminBookEndpoint, book);
}

export function getBooks() {
  return http.get(adminBookEndpoint);
}

export function removeBook(id) {
  return http.delete(adminBookEndpoint + "/delete/" + id);
}

export function getBook(id) {
  return http.get(adminBookEndpoint + "/get/" + id);
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
