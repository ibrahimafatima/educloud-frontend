import http from "./httpService";

const studentProfile = "/teacher/student";
const studentProfileUpdate = "/student/profile";
const studentCourse = "/teacher/course";
const studentMark = "/teacher/post-mark";
const studentAccountConfirmation = "/student/auth";
const studentBirthday = "/student/birthday";
const studentChat = "/student/message";
const discussion = "/discussion";
const newsfeed = "/newsfeed";
const comment = "/comment";
const like = "/like";

export function getFirstNewsfeed() {
  return http.get(newsfeed + "/first-news");
}

export function getMiddleNewsfeed() {
  return http.get(newsfeed + "/middle-news");
}

export function getAllNewsfeed() {
  return http.get(newsfeed + "/all-news");
}

export function addNews(newsInfo) {
  return http.post(newsfeed, newsInfo);
}

export function postLike(postId) {
  return http.post(like + "/post/" + postId);
}

export function getPostLike(postId) {
  return http.get(like + "/post/" + postId);
}

export function getLikedPost(postId) {
  return http.get(like + "/liked-post/" + postId);
}

export function addComment(newComment) {
  return http.post(comment, newComment);
}

export function getComments(id) {
  return http.get(comment + "/all-comment/" + id);
}

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
  return http.get(studentMark + "/get/" + id);
}

export function getMark(id) {
  return http.get(studentMark + "/mark/" + id);
}

export function removeMark(id) {
  return http.delete(studentMark + "/delete/" + id);
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
