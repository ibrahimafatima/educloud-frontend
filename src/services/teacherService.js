import http from "../services/httpService";
import auth from "./authService";

const teacherStudentApiEndpoint = "/students";
const teacherCourseApiEndpoint = "/courses";
const teacherExamApiEndpoint = "/exams";
const teacherTimetableEndpoint = "/timetable";
const teacherProfileEndpoint = "/teacher/update";
const teacherPostMarkEndpoint = "/post-mark";
const adminEndpoint = "/admin/auth";
const teacherAssignment = "/assignments";
const teacherDetails = "/teachers";

export function addStudent(student) {
  if (student._id) {
    const body = { ...student };
    delete body._id;
    return http.put(teacherStudentApiEndpoint + "/update/" + student._id, body);
  }
  return http.post(teacherStudentApiEndpoint, student);
}

export function getStudents() {
  return http.get(teacherStudentApiEndpoint);
}

export function addCourse(subject) {
  if (subject._id) {
    const body = { ...subject };
    delete body._id;
    return http.put(teacherCourseApiEndpoint + "/update/" + subject._id, body);
  }
  return http.post(teacherCourseApiEndpoint, subject);
}

export function getCourses() {
  if (auth.getCurrentUser().isTeacher)
    return http.get(teacherCourseApiEndpoint);
  if (auth.getCurrentUser().isAdmin)
    return http.get(teacherCourseApiEndpoint + "/admin");
}

export function getCourse(id) {
  return http.get(teacherCourseApiEndpoint + "/registrationID/" + id);
}

export function updateProfilePicture(pic) {
  return http.post(teacherDetails + "/upload", pic);
}

export function getCourseByID(id) {
  return http.get(teacherCourseApiEndpoint + "/byID/" + id);
}

export function removeStudent(id) {
  return http.delete(teacherStudentApiEndpoint + "/delete/" + id);
}

export function getStudent(clas) {
  return http.get(teacherStudentApiEndpoint + "/classname/" + clas);
}

export function moveTerm(body) {
  return http.put(teacherStudentApiEndpoint + "/next-term", body);
}

export function updateYearMark() {
  return http.put(teacherPostMarkEndpoint + "/next-year");
}

export function updateYearAssignment() {
  return http.put(teacherAssignment + "/next-year");
}

export function moveYear(yearInfo) {
  return http.put(teacherStudentApiEndpoint + "/next-year", yearInfo);
}

export function getOneStudent(id) {
  return http.get(teacherStudentApiEndpoint + "/ID/" + id);
}

export function scheduleExam(exam) {
  if (exam._id) {
    const body = { ...exam };
    delete body._id;
    return http.put(teacherExamApiEndpoint + "/update/" + exam._id, body);
  }
  return http.post(teacherExamApiEndpoint, exam);
}

export function getExams() {
  if (auth.getCurrentUser().isAdmin)
    return http.get(teacherExamApiEndpoint + "/admin");
  if (auth.getCurrentUser().isTeacher)
    return http.get(teacherExamApiEndpoint + "/teachers");
  if (auth.getCurrentUser().isStudent)
    return http.get(teacherExamApiEndpoint + "/students");
}

export function getExam(id) {
  return http.get(teacherExamApiEndpoint + "/get/" + id);
}

export function getSchoolExams() {
  return http.get(teacherExamApiEndpoint + "/all-exams");
}

export function removeExam(id) {
  return http.delete(teacherExamApiEndpoint + "/delete/" + id);
}

export function removeSubject(id) {
  return http.delete(teacherCourseApiEndpoint + "/delete/" + id);
}

export function addTimetable(timetable) {
  if (timetable._id) {
    const body = { ...timetable };
    delete body._id;
    return http.put(
      teacherTimetableEndpoint + "/update/" + timetable._id,
      body
    );
  }
  return http.post(teacherTimetableEndpoint, timetable);
}

export function getTimetable() {
  if (auth.getCurrentUser().isAdmin)
    return http.get(teacherTimetableEndpoint + "/admin");
  if (auth.getCurrentUser().isTeacher)
    return http.get(teacherTimetableEndpoint + "/teacher");
  if (auth.getCurrentUser().isStudent)
    return http.get(teacherTimetableEndpoint + "/student");
}

export function getATimetable(id) {
  return http.get(teacherTimetableEndpoint + "/timetable/" + id);
}

export function removeTimetable(id) {
  return http.delete(teacherTimetableEndpoint + "/delete/" + id);
}

export function completeProfile(profile) {
  return http.put(teacherProfileEndpoint + "/me", profile);
}

export function updateExamStatus(exam) {
  return http.put(teacherExamApiEndpoint + "/status/" + exam._id, exam);
}

export function getUser(id) {
  if (auth.getCurrentUser().isAdmin) return http.get(adminEndpoint + "/" + id);
}

export function postMark(reg_num, mark) {
  return http.post(teacherPostMarkEndpoint + "/" + reg_num, mark);
}

export function postAssignment(assignment) {
  return http.post(teacherAssignment, assignment);
}

export function getTeacherAssignment() {
  return http.get(teacherAssignment + "/teacher");
}

export function uploadHomework(homeworkFile) {
  return http.post(teacherAssignment + "/upload", homeworkFile);
}

export function getStudentAssignment(id) {
  return http.get(teacherAssignment + "/student");
}

export function getAllStudentAssignment() {
  return http.get(teacherAssignment);
}

export function removeAssignment(id) {
  return http.delete(teacherAssignment + "/delete/" + id);
}
